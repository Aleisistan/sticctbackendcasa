/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto/create-users.dto';
import { QueryUsersDto } from './dto/create-users.dto/query-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: QueryUsersDto) {
    // eslint-disable-next-line prefer-const
 let institute = query.institute;
 let sortBy = query.sortBy;
 let orderBy = query.orderBy;
 return this.usersService.findAll(institute, sortBy, orderBy);
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
