/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    private id:number;

    @Column()
    private name: string;

    @Column()
    private institute: string;
    
    @Column({nullable:true })//Lo puse asi porque me tiraba el error que estaba vacia
    private mail: string; //CEL MAIL 

    @Column({nullable:true })
    private cel: number;

    @Column({ default: true })
    isActive: boolean;
    
    @OneToMany(type => Order, Order => Order.user)
    orders: Order[];
}