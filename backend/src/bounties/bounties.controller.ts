import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { BountiesService, UserDto } from './bounties.service';
import { User } from 'src/users/user.entity';
import { CurrentUser } from 'src/users/current-user.decorator';
import { CreateBountyDto } from './dto/create-bounty.dto';

@Controller('bounties')
export class BountiesController {
  constructor(private readonly bountiesService: BountiesService) {}

  @Get()
  async getAll(@Query('planet') planet?: string) {
    if (planet) {
      return this.bountiesService.findByPlanet(planet);
    }
    return this.bountiesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() bounty: CreateBountyDto, @CurrentUser() user: UserDto) {
    return this.bountiesService.create({
      ...bounty,
      user,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/accept')
  async accept(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserDto,
  ) {
    return this.bountiesService.accept(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMyBounties(@CurrentUser() user: User) {
    return this.bountiesService.findMyBounties(user.id);
  }
}
