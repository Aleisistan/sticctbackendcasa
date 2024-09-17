import { Injectable } from '@nestjs/common';
import { CreateOrdersDto } from './dto/create-orders.dto/create-orders.dto';

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
         }
    ] ;
    findAll() {
        return this.orders;
        }
        findOne(id: any) {
            return this.orders.find(function(order){
                return order.id == id;
            });
        }
        create(CreateOrdersDto: CreateOrdersDto) {
            let nextId = this.orders[this.orders.length-1].id +1;
            let order = {
                "id": nextId,
                ...CreateOrdersDto

            };
            this.orders.push(order);
            return order;
        }
}

