/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Like, Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto/create-users.dto';
import { UpdateUserDto } from './dto/create-users.dto/update-user.dto';
import { User } from './entities/user.entity'; //'./interfaces/user.interface';
@Injectable()
export class UsersService {
    //COMENTADO 14/10
    /*getUserWithOrders(): import("./entities/user.entity").User[] | PromiseLike<import("./entities/user.entity").User[]> {
      throw new Error('Method not implemented.');
    }*/ 
    usersRepository: any;
    ordersRepository: any;
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,   //REVISAR OTRO POSTGRES EN PUERTO 5432
    
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
    ) {}
    async findAll(filters: { institute: string; id: number }, oderField: string =  'institute', oderDirection: 'ASC' | 'DESC' = 'ASC'): Promise<User[]> {// id?: number}, //; sortBy?: string; orderBy?: number }, //ERA FINDALL 14/10
        const whereConditions: any ={}//rderField: string = 'institute', //ORDENO POR INSTITUTE
        //orderDirection: 'ASC' | 'DESC' = 'ASC',
        
     //   ): Promise<User[]> {
       //     const whereConditions: any ={};
        
            if (filters.institute) {
              whereConditions.institute = Like(`%${filters.institute}%`);
            }
        
         if (filters.id) {
              whereConditions.id = filters.id;
            }
              
            return this.userRepository.find({
                where: whereConditions,
                order: {
                   [oderField]: oderDirection, 
                    },
            });
        }
    async findUsersByInstitute(institute: string): Promise<User[]> {
                // Crear la condición de búsqueda por el campo institute usando Like para búsquedas parciales
                const whereCondition = { institute: Like(`%${institute}%`)};
            
                // Buscar los usuarios con la condición
                return this.userRepository.find({
                  where: whereCondition,
                  order: {
                    institute: 'ASC',  // Ordenar los resultados por el campo institute de manera ascendente
                  },
                });          }

    async getUserWithOrders(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({ 
            where: {id},
            relations: ['orders'], 
            loadRelationsIds:true,
        });
        if (!user) {
            throw new NotFoundException('User with ID ${id} not found');
        }
        return user;
    } 
    async getUsersByOrder(id: number): Promise<User[]> {
        
        return this.userRepository 
          .createQueryBuilder('user')
          .leftJoinAndSelect('user.orders', 'order')  // Realiza el LEFT JOIN con la tabla 'user'
          .where('order.id = :orderId', { orderId:id }) // Filtra por userId
          .getMany();
          } 
    async findOne(id: number): Promise<User> {
            return this.userRepository.findOne({ 
                where: {id}, 
                relations:['orders'],
        });
    }     
   
    //COMENTADO 14/10
    // Método para obtener un usuario y contar cuántas órdenes tiene
/*
   async findUserWithOrderCount(userId: number): Promise<{ user: User; orderCount: number }> {
     const user = await this.usersRepository.findOne({
       where: { id: userId },
       relations: ['orders'], // Cargar las órdenes relacionadas
    });
    const orderCount = await this.ordersRepository.count({
      where: { user: { id: userId } },
    });

    return { user, orderCount };
  }
  // Método para obtener todos los usuarios con la cantidad de órdenes
  async findAllUsersWithOrderCount(): Promise<{ user: User; orderCount: number }[]> {
    const users = await this.usersRepository.find({ relations: ['orders'] });
    // Para cada usuario, contar sus órdenes
    return users.map(user => ({
      user,
      orderCount: user.orders.length,
    }));
  }      
    findOne(id:any): Promise<User> {
        return this.userRepository.findOneBy({id});
    }*/    
        /*findOne(id: any) {
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
        const user = await this.userRepository.findOne({ where: {id: id}});
        if (!user){
            throw new NotFoundException('Usuario con ID  ${id} no encontrado');
        }
        await this.orderRepository
        .createQueryBuilder()
        .update(Order)
        .set({
          user_name: user.name,  // Guardar nombre del usuario
          user_mail: user.mail, // Guardar email del usuario
        } as Partial<Order>) //para evitar el error
        .where('user_id = :userId', { id })
        .execute();
        try {
            //await this.ordersRepository.delete({ user: { id: User } });
           await this.userRepository.delete(id);
           } catch (error) {
            throw new Error('error al eliminar usuario: ' + error.message)
           }
          // async deleteUser(userId: number): Promise<void> {
            // Elimina todas las órdenes asociadas al usuario
            
            // Ahora elimina el usuario
            //await this.usersRepository.delete(userId);
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

