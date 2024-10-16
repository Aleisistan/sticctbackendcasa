/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto/create-users.dto';
import { UpdateUserDto } from './dto/create-users.dto/update-user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,   //REVISAR OTRO POSTGRES EN PUERTO 5432
      ) {

    }
    async findAll(): Promise<User[]> {
        return this.userRepository.find({
          order: {
            institute: 'ASC',  // Ordena siempre por prioridad ascendente
          },
        });
      }
    //COMENTADO 15/10 18:40
    /*async findAll(filters: { institute?: string; id?: number; sortBy?: string; orderBy?: number },
        orderField: string = 'institute', //ORDENO POR INSTITUTE
        orderDirection: 'ASC' | 'DESC' = 'ASC',
        
        ): Promise<User[]> {
            const whereConditions: any ={};
        
            if (filters.institute) {
              whereConditions.priority = Like(`%${filters.institute}%`);
            }
        
            if (filters.id) {
              whereConditions.id = Like (`%${filters.id}%`);
            }
                 
            return this.userRepository.find({
                where: whereConditions,
                order: {
                    [orderField]: orderDirection,
                    },
            });
          }*/
    // Método para obtener un usuario y contar cuántas órdenes tiene
  async findUserWithOrderCount(userId: number): Promise<{ user: User; orderCount: number }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['orders'], // Cargar las órdenes relacionadas
    });

    const orderCount = user.orders.length;
      
    return { user, orderCount };
  }

  // Método para obtener todos los usuarios con la cantidad de órdenes
  async findAllUsersWithOrderCount(): Promise<{ user: User; orderCount: number }[]> {
    const users = await this.userRepository.find({ relations: ['orders'] });

    // Para cada usuario, contar sus órdenes
    return users.map(user => ({
      user,
      orderCount: user.orders.length,
    }));
  }      
  async getUsersWithOrders(): Promise<User[]> {
    return await this.userRepository.find({relations: ['order'], loadRelationIds: true});
  }
    findOne(id: number): Promise<User> {
        return this.userRepository.findOne({
            where: {id},
            relations: ['orders'],
        });
    }        /*findOne(id: any) {
    /*findOne(id: any) {
        
        //if(!id)
          //  throw new HttpException('Not Found', HttpStatus.NOT_FOUND);// SE ME CIERRA LA APLICACION ERROR 500 INTERNAL SERVER ERROR
            //throw new HttpException( 'ERROR DE SERVER 500', HttpStatus.INTERNAL_SERVER_ERROR);
        return this.users.find(function(user){
        return user.id == id;
        });
    }*/
    async create(CreateUsersDto: CreateUsersDto): Promise<User> {
        const newUser = this.userRepository.create(CreateUsersDto);
        return await this.userRepository.save(newUser);
    }
    /*
    create(CreateUsersDto: CreateUsersDto) {
        let nextId = this.users[this.users.length-1].id +1;
        let user = new User(nextId, CreateUsersDto.name, CreateUsersDto.institute, CreateUsersDto.mail, CreateUsersDto.cel);
        this.users.push(user);
        return user;
    }*/
    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        await this.userRepository.update(id, updateUserDto);
        return this.userRepository.findOne({where:{id}});
    }
   /*
    update(id: number, updateUserDto: UpdateUserDto): User {
        let user = this.findOne(id);
        user.name = updateUserDto.name;
        user.institute = updateUserDto.institute;
        user.mail = updateUserDto.mail;
        user.cel = updateUserDto.cel
        return user;
    }*/
    async remove(id: number): Promise<void> { //FUNCIONA ESTE
       const user = await this.userRepository.findOne({ where: { id: id}});
       if (!user) {
        throw new NotFoundException('user not found');
       }
       // Actualizar las órdenes para almacenar el nombre del usuario antes de eliminarlo
    await this.ordersRepository.update(
      { user: user },  // Condición: solo las órdenes de este usuario
      { username: user.name }  // Guardamos el nombre del usuario en la columna userName
      );

  // Eliminar el usuario
    await this.userRepository.delete(id);
    }
}
   /*
    remove(id: number)  {
        let user = this.findOne(id);
        if(!user) 
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        let pos = this.users.indexOf(user)
        this.users.splice(pos, 1);
        
      }*/

