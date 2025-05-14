import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { UsersService } from './users.service';
import { Role } from 'src/auth/role.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  @Role('admin')
  async getAllUsers() {
    return this.usersService.findAllWithBounties();
  }
}
