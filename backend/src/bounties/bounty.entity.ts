import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Bounty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  targetName: string;

  @Column()
  planet: string;

  @Column()
  reward: number;

  @Column({ default: 'OPEN' })
  status: 'OPEN' | 'ACCEPTED';

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => User, (user) => user.createdBounties)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.acceptedBounties, { nullable: true })
  acceptedBy: User;
  bounty: Bounty;
}
