/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { User } from "src/users/entities/user.entity";


/* eslint-disable prettier/prettier */
export class Order {
    id: number;
    name: string;
    user: User;
    priority: string;
    description: string;
    //user: {nullable:false};
    description2: string;
    isActive: boolean;
    username: string | null;
    user_name: string;  // Campo opcional si puede estar nulo
    user_mail: string; // Campo opcional si puede estar nulo
  
}