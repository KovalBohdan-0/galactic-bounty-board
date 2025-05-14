import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bounty } from './bounty.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

export interface UserDto {
  userId: number;
  email: string;
}

@Injectable()
export class BountiesService {
  constructor(
    @InjectRepository(Bounty)
    private bountyRepo: Repository<Bounty>,
    private readonly userService: UsersService,
  ) {}

  async findAll() {
    return this.bountyRepo.find({
      where: { status: 'OPEN' },
      relations: ['createdBy', 'acceptedBy'],
    });
  }

  async findMyBounties(userId: number) {
    return this.bountyRepo.find({
      where: [{ createdBy: { id: userId } }, { acceptedBy: { id: userId } }],
      relations: ['createdBy', 'acceptedBy'],
    });
  }

  async create(data: {
    title: string;
    description: string;
    targetName: string;
    planet: string;
    reward: number;
    user: Partial<UserDto>;
  }) {
    const currentUser = await this.bountyRepo.findOne({
      where: { id: data.user.userId },
      relations: ['createdBy'],
    });

    if (!currentUser) {
      throw new BadRequestException('User not found, please log in again');
    }

    if (data.reward <= 0) {
      throw new BadRequestException('Reward must be a positive number');
    }

    const bounty = this.bountyRepo.create({
      ...data,
      createdBy: currentUser,
    });

    try {
      return await this.bountyRepo.save(bounty);
    } catch (error) {
      console.error('Error saving bounty:', error);
      throw new BadRequestException('Failed to create bounty');
    }
  }

  async accept(bountyId: number, user: UserDto) {
    const bounty = await this.bountyRepo.findOne({
      where: { id: bountyId },
      relations: ['acceptedBy'],
    });
    const currentUser = await this.userService.findById(user.userId);

    if (!bounty) throw new NotFoundException('Bounty not found');
    if (!currentUser) throw new NotFoundException('User not found');
    if (bounty.status === 'ACCEPTED') {
      throw new BadRequestException('Bounty already accepted');
    }

    bounty.status = 'ACCEPTED';
    bounty.acceptedBy = currentUser;

    return this.bountyRepo.save(bounty);
  }

  async findByPlanet(planet: string) {
    return this.bountyRepo.find({
      where: { planet },
      relations: ['createdBy', 'acceptedBy'],
    });
  }
}
