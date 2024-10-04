/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id:number;

   // @Column()
    //userId:number;

    @Column()
    public name: string;

    @Column()
    public institute: string;
    
    @Column({nullable:true })//Lo puse asi porque me tiraba el error que estaba vacia
    public mail: string; //CEL MAIL 

    @Column({nullable:true })
    public cel: number;

    @Column({ default: true })
    public isActive: boolean;
    
    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
    
}