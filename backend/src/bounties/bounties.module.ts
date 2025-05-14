import { Module } from '@nestjs/common';
import { BountiesService } from './bounties.service';
import { BountiesController } from './bounties.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bounty } from './bounty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bounty]), UsersModule],
  providers: [BountiesService],
  controllers: [BountiesController],
  exports: [BountiesService],
})
export class BountiesModule {}
