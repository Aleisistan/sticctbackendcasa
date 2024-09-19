/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './interfaces/order.interface';

@Injectable()
export class OrdersService {
  
    
    private orders = [
        {
            "id": 1,
            "name": "ANA",
            "institute": "CCT",
            "contact": "ana@gmail.com",
            "priority": "High",
            "description": "no enciende la pc"
         },
         {
             "id": 2,
            "name": "Jose",
            "institute": "ISISTAN",
            "contact": "JOSE@gmail.com",
            "priority": "planned",
            "description": "ACTIVAR OFFICE"
         },
         {
            "id": 3,
           "name": "felix",
           "institute": "otros",
           "contact": "felix@gmail.com",
           "priority": "medium",
           "description": "optimizar pc"
        }
    ] ;

    findAll(priority: string, id: number, sortBy: string, oderBy: number)  {
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
    
    }
    
        findOne(id: any) {
            return this.orders.find(function(order){
                return order.id == id;
            });
        }
        create(CreateOrdersDto: CreateOrdersDto) {
            // eslint-disable-next-line prefer-const
            let nextId = this.orders[this.orders.length-1].id +1;
            let order = new Order(nextId, CreateOrdersDto.name, CreateOrdersDto.institute, CreateOrdersDto.contact, CreateOrdersDto.priority, CreateOrdersDto.description);
            this.orders.push(order);
            return order;
        }
        update(id: number, updateOrderDto: UpdateOrderDto): Order {
            const order = this.findOne(id);
            order.name = updateOrderDto.name;
            order.institute = updateOrderDto.institute;
            order.contact = updateOrderDto.contact;
            order.priority = updateOrderDto.priority;
            order.description = updateOrderDto.description;
            return order;
        }
        remove(id: number) {
            const order = this.findOne(id);
            if(!order) 
                throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
            const pos = this.orders.indexOf(order)
            this.orders.splice(pos, 1);
               
          }
    
    }

