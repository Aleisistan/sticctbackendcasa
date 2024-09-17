import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service'
import { CreateUsersDto } from './dto/create-users.dto/create-users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  findOne(@Param() params) {
    return this.usersService.findOne(params.id)
  }

@Post()
create(@Body() CreateUsersDto: CreateUsersDto){
    return this.usersService.create(CreateUsersDto);
}

}
