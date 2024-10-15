/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    public id:number;
    
    @Column()
    public name: string;

    @Column()
    public priority: string;
    
    @Column()
    public description: string;

    @Column()
    public description2: string;

    @Column({ default: true })
    public isActive?: boolean;
    
    //COMENTADO 14/10 //@ManyToOne(() => User, {onDelete: 'SET NULL'}) 
    @ManyToOne(() => User, {onDelete: 'SET NULL', nullable: true})
    @JoinColumn({name:'id_user'})
    user: User;

    @Column({ nullable: true})
    public user_name: string;
    
    @Column({ nullable: true})
    public user_mail: string;

    
} 