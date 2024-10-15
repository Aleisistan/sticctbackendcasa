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
    return this.usersService.findAll({
      institute: '',
      id: 0
    });
} 
  @Get(':institute')
    async findUsersByInstitute(@Param('institute') institute: string) {
      // Llamar al servicio pasándole el 'institute' capturado de la URL
      return this.usersService.findUsersByInstitute(institute);
       // Estableces el filtro 'institute' directamente
        //'institute', // Ordenas por el campo 'institute'
        //'ASC', // Dirección por defecto
      
    }
    
    //COMENTADO 14/10
 
 //COMENTADO 14/10 
/*@Get(':id')
async findOne(@Param('id') id:number): Promise <User> {
const user = await this.usersService.getUserWithOrders(id);
if (!user){
  throw new NotFoundException('User with ID ${id} not found');
}
return user;
}*/
/*@Get(':id')
  async findOne(@Param() params) {
    let user = await this.usersService.findOne(params.id);
    if(user){
      return user;  
    }  else {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }}*/
  @Get('id/:id')
  async getUsers(@Param('id') id: number): Promise<User>{
    return this.usersService.getUserWithOrders(id);
  }

  // Obtener el número de órdenes para un usuario específico
//COMENTADO 14/10
 /*@Get('id')
 async getUserOrderCount(@Param('id') id: number) {
   const result = await this.usersService.findUserWithOrderCount(id);
   return {
     user: result.user,
     orderCount: result.orderCount,
   };
 }*/
//COMENTADO 14/10
 // Obtener todos los usuarios con la cantidad de órdenes
 /*@Get()
 async getAllUsersWithOrderCount() {
   return this.usersService.findAllUsersWithOrderCount();
 }*/
 
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


@Delete(':id') 
remove(@Param('id') id: number)  {
  return this.usersService.remove(id);
}
}
