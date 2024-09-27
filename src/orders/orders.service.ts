/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './interfaces/order.interface';

@Injectable()
export class OrdersService {
  delete(id: number): Promise<import("./entities/order.entity").Order> {
    throw new Error('Method not implemented.');
  }
  
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>
    ) {

    }
    
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
    findAll() {
        return this.orderRepository.find(); //HACER LO MISMO CON LOS OTROS 
    }
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
       async create(any): Promise<Order> {
        return this.orderRepository.create();

       }
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

