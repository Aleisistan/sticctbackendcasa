/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto/create-users.dto';
import { QueryUsersDto } from './dto/create-users.dto/query-users.dto';
import { UpdateUserDto } from './dto/create-users.dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: QueryUsersDto) {
    // eslint-disable-next-line prefer-const
 let institute = query.institute;
 let id = query.id;
 let sortBy = query.sortBy;
 let orderBy = query.orderBy;
 return this.usersService.findAll();
}
  @Get(':id')
  findOne(@Param() params) {
    return this.usersService.findOne(params.id)
  }

@Post()
async create(@Body() CreateUsersDto: CreateUsersDto): Promise<User>{
    await this.usersService.create(CreateUsersDto);
    return;
}

@Put(':id')
update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto):Promise<User>   {
  this.usersService.update(id, updateUserDto);
  return;
 
}


@Delete(':id') //FUNCIONA ESTE
remove(@Param('id') id: number)  {
  return this.usersService.remove(id);
}
}
