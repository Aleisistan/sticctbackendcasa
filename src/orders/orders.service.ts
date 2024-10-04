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
    
    private orders = [
        {
            "id": 1,
            "name": "ANA",
            //"institute": "CCT",
            //"mail": "ana@gmail.com",
            //"cel": 154565958,
            "priority": "High",
            "description": "no enciende la pc"
         },
         {
             "id": 2,
            "name": "Jose",
            //"institute": "ISISTAN",
            //"contact": "JOSE@gmail.com",
            "priority": "planned",
            "description": "ACTIVAR OFFICE"
         },
         {
            "id": 3,
           "name": "felix",
           //"institute": "otros",
           //"contact": "felix@gmail.com",
           "priority": "medium",
           "description": "optimizar pc"
        }
    ] ;
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
            /*if (filters.sortBy) {
                whereConditions.sortBy = Like(`%${filters.sortBy}%`);
            } 
            if (filters.orderBy) {
                whereConditions.oderBy = Like(`%${filters.orderBy}%`);
              }*/
        
            return this.orderRepository.find({
                where: whereConditions,
                order: {
                    [orderField]: orderDirection,
                    },
            });
          }
    async getOrdersWithUsers(): Promise<Order[]> {
            return await this.orderRepository.find(/*{relations: ['user'],
            }*/);
            }
    async getOrdersByUserId(userId: number): Promise<Order[]> {
        //console.log('Obteniendo pedidos para userId:', userId ); ERA PARA VER QUE
          // Inicia el QueryBuilder
         //const orders = await this.orderRepository
         //const query = this.orderRepository
          return await this.orderRepository 
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.user', 'user')  // Realiza el LEFT JOIN con la tabla 'user'
            .where('user.id = :userId', { userId }) // Filtra por userId
            .getMany();
            }

// Imprime el SQL generado por el QueryBuilder
       // if (orders.length === 0) {
         //   throw new NotFoundException('No orders found for user whit ID ${userId}');
           //console.log('Generated SQL query:', query.getSql());
        //return orders;
// Ejecuta la consulta y almacena el resultado
          //  const completeOrders = orders.map(order => ({
            //    ...order,
              //  user: order.user || null,
                //description2: order.description2 || '',
                //isActive: order.isActive || false}));
            
          //      return completeOrders;
// Imprime el resultado de la consulta

          
           
     /*   return await this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.user', 'user')
        .where('user.id = :userId', { userId })
        .getMany();*/
        
    
              
          
        /*let queryOrders = [];
        if(!priority){
            queryOrders = this.orders;
        }
        else {
            queryOrders = this.orders.filter(function(order){
                return order.priority.toLowerCase() == priority.toLowerCase();

        });
        if(!id){
            queryOrders = this.orders;
    
    }
    else {
        queryOrders = this.orders.filter(function(order){
            return order.id == id;
    
    });
    
    
        }
        }
        if(!sortBy) {
            return queryOrders;
        }
        let orderedOrders = queryOrders.sort(function(a, b) {
            let OrdenarA = a[sortBy];
            let OrdenarB = b[sortBy];
            if(OrdenarA < OrdenarB) {
                return -1;
            }
            if(OrdenarA == OrdenarB){
                return 0;
            }
            return 1;
        })*/
       // return this.orderRepository.find(); //HACER LO MISMO CON LOS OTROS 
    //}
    /*findAll(priority: string, id: number, sortBy: string, oderBy: number)  {
        let queryOrders = [];
        if(!priority){
            queryOrders = this.orders;
        }
        else {
            queryOrders = this.orders.filter(function(order){
                return order.priority.toLowerCase() == priority.toLowerCase();

        });
        if(!id){
            queryOrders = this.orders;
    
    }
    else {
        queryOrders = this.orders.filter(function(order){
            return order.id == id;
    
    });
    
    
        }
        }
        if(!sortBy) {
            return queryOrders;
        }
        let orderedOrders = queryOrders.sort(function(a, b) {
            let OrdenarA = a[sortBy];
            let OrdenarB = b[sortBy];
            if(OrdenarA < OrdenarB) {
                return -1;
            }
            if(OrdenarA == OrdenarB){
                return 0;
            }
            return 1;
        })
        return orderedOrders;
    
    }*/
        findOne(id:any): Promise<Order> {
            return this.orderRepository.findOneBy({id});
        }        /*findOne(id: any) {
            return this.orders.find(function(order){//ID:ID PARA LA BASE
                return order.id == id;
            });
        }*/
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
         
   
        /*create(CreateOrdersDto: CreateOrdersDto) {
            // eslint-disable-next-line prefer-const
            let nextId = this.orders[this.orders.length-1].id +1;
            let order = new Order(nextId, CreateOrdersDto.name,*/ /*CreateOrdersDto.institute, CreateOrdersDto.contact,*//* CreateOrdersDto.priority, CreateOrdersDto.description);
            this.orders.push(order);
            return order;
        }*/
       async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
         await this.orderRepository.update(id, updateOrderDto);
         return this.orderRepository.findOne({where:{id}});


       }
        /*update(id: number, updateOrderDto: UpdateOrderDto): Order {
            let order = this.findOne(id);
            order.name = updateOrderDto.name;
           // order.institute = updateOrderDto.institute;
            //order.contact = updateOrderDto.contact;
            order.priority = updateOrderDto.priority;
            order.description = updateOrderDto.description;
            return order;
        }*/
       async remove(id: number): Promise<void> { //"ESTEFUNCIONA"
        await this.orderRepository.delete(id);
       }
        /*remove(id: number) {
            let order = this.findOne(id);
            if(!order) 
                throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
            let pos = this.orders.indexOf(order)
            this.orders.splice(pos, 1);
               
          }*/
    
    }

