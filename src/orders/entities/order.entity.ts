/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    private id:number;

    @Column({nullable:true })
    private user_id: number;

    @Column()
    private name: string;

   // @Column()
    //private institute: string;//SACAR DE ACA
    
   // @Column()
    //private contact: string;//id usuario

    @Column()
    private priority: string;
    
    @Column()
    private description: string;

    @Column()
    private description2: string;

    @Column({ default: true })
    isActive: boolean;
    
} 