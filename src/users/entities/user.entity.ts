/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    private id:number;

    @Column()
    private name: string;

    @Column()
    private institute: string;
    
    @Column({nullable:true })
    private mail: string; //CEL MAIL 

    @Column({nullable:true })
    private cel: number;

    @Column({ default: true })
    isActive: boolean;
    
}