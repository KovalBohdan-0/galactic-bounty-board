import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [AdminController],
  exports: [UsersService],
})
export class UsersModule {}
