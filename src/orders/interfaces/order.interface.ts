/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { User } from "src/users/entities/user.entity";


/* eslint-disable prettier/prettier */
export class Order {
    id: number;
    name: string;
    user: User;//institute: string;
    //contact: string;
    priority: string;
    description: string;
    //user: {nullable:false};
    description2: string;
    isActive: boolean;
    //User: import("e:/TUARI/1er Año/2do Cuatrimestre/Tecnologías Web/git/tecnologias-web/sticctbackendcasa/src/users/entities/user.entity").User;
    //userId: import("e:/TUARI/1er Año/2do Cuatrimestre/Tecnologías Web/git/tecnologias-web/sticctbackendcasa/src/users/entities/user.entity").User;
    UserId: number;
    user_name: string;  // Campo opcional si puede estar nulo
    user_mail: string; // Campo opcional si puede estar nulo
    /*constructor(id: number, name:string,*/ /*institute: string, contact: string,*//* priority: string, description: string){
        this.id = id;
        this.name = name;
        //this.institute = institute;
        //this.contact = contact;
        this.priority = priority;
        this.description = description;
    }*/
}