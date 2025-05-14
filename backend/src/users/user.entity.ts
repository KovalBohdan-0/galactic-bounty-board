import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Bounty } from '../bounties/bounty.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: 'user' | 'admin';

  @OneToMany(() => Bounty, (bounty) => bounty.createdBy)
  createdBounties: Bounty[];

  @OneToMany(() => Bounty, (bounty) => bounty.acceptedBy)
  acceptedBounties: Bounty[];
}
