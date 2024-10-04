/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    public id:number;
    
    //@Column()
    //public userId: number;
    
    @Column()
    public name: string;

    
   // @Column()
    //private institute: string;//SACAR DE ACA
    
   // @Column()
    //private contact: string;//id usuario

    @Column()
    public priority: string;
    
    @Column()
    public description: string;

    @Column()
    public description2: string;

    @Column({ default: true })
    public isActive?: boolean;
    
    @ManyToOne(() => User, (user) => user.orders, { nullable:false})
    user: User;
   
    
   
} 