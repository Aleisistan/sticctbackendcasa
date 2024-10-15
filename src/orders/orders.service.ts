/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Like, Repository } from 'typeorm';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './interfaces/order.interface';

@Injectable()
export class OrdersService {
 
  delete(_id: number): Promise<import("./entities/order.entity").Order> {
    throw new Error('Method not implemented.');
  }
  
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    
    
    
    ) { }
    
    async findAll(filters: { priority?: string; id?: number; sortBy?: string; orderBy?: number },
        orderField: string = 'priority',
        orderDirection: 'ASC' | 'DESC' = 'ASC',
          ): Promise<Order[]> {
            const whereConditions: any ={};
            if (filters.priority) {
              whereConditions.priority = Like(`%${filters.priority}%`);
            }
            if (filters.id) {
              whereConditions.id = Like (`%${filters.id}%`);
            }
            return this.orderRepository.find({
                where: whereConditions,
                order: {
                    [orderField]: orderDirection,
                    },
            });
          }
    async getOrdersWithUsers(): Promise<Order[]> {
            return await this.orderRepository.find({relations: ['user'], loadRelationIds:true 
            });
            }
    async getOrdersByUserId(userId: number): Promise<Order[]> {
        return await this.orderRepository 
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.user', 'user')  // Realiza el LEFT JOIN con la tabla 'user'
            .where('user.id = :userId', { userId }) // Filtra por userId
            .orderBy('order.priority', 'ASC')
            .getMany();
        }
    async findOrdersByPriority(priority: string): Promise<Order[]> {
        return this.orderRepository
          .createQueryBuilder('order')
          .where('LOWER(order.priority) LIKE LOWER(:priority)', { priority: `%${priority}%` }) // Filtro insensible a mayúsculas
          .orderBy('order.priority', 'ASC')  // Ordenar por prioridad ascendente
          .getMany();
          
      //const whereCondition = { priority: Like(`%${priority.toLowerCase()}%`)};
        //return this.orderRepository.find({
         // where: whereCondition,
          //order: { priority: 'ASC',
        //},
      //});
      }
    findOne(id: number): Promise<Order> {
            return this.orderRepository.findOne({ where: {id}, relations:['user']});
        }     
    async create(createOrderDto: CreateOrdersDto): Promise<Order | { error:string }> {
         try {// Busca el usuario en la base de datos utilizando el userId
        const user = await this.userRepository.findOne({ where: { id: createOrderDto.userId } });

        if (!user) {
        throw new NotFoundException(`User with ID ${createOrderDto.userId} not found`);
        }
        // Validar si el nombre proporcionado coincide con el nombre del usuario en la base de datos
        if (user.name !== createOrderDto.name) {
            throw new BadRequestException(`The name provided (${createOrderDto.name}) does not match the user with ID ${createOrderDto.userId}`);
        }
        
     // Crea una nueva instancia de Order y asigna sus propiedades
          const newOrder = new Order();
          newOrder.name = createOrderDto.name;
          newOrder.priority = createOrderDto.priority;
          newOrder.description = createOrderDto.description;
          newOrder.description2 = createOrderDto.description2;
          newOrder.isActive = createOrderDto.isActive;
         // Asigna la relación entre la orden y el usuario
          newOrder.user = user;  // Vincula el usuario a la orden
    // Guarda la nueva orden en la base de datos
          return await this.orderRepository.save(newOrder);
          }    catch (error) {
          console.error('error al crear la orden:', error.message);
          throw error;
          }
   }   // const newOrder = this.orderRepository.create(createOrderDto);
        // return await this.orderRepository.save(newOrder);
         
    async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
         await this.orderRepository.update(id, updateOrderDto);
         return this.orderRepository.findOne({where:{id}});
       }
      
    async remove(id: number): Promise<void> { //"ESTEFUNCIONA"
        await this.orderRepository.delete(id);
       }
  }