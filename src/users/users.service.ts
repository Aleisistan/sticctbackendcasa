import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto/create-users.dto';
@Injectable()
export class UsersService {
   
    private users = [
        {
            "id": 1,
            "name": "Ana",
            "institute": "cct",
            "contact": "ana@gmail.com"
         }
    ]; 
    findAll() {
        return this.users; 
      }
    findOne(id: any) {
        return this.users.find(function(user){
            return user.id == id;
        });
    }
    create(CreateUsersDto: CreateUsersDto) {
        let nextId = this.users[this.users.length-1].id +1;
        let user = {
            "id": nextId,
            ...CreateUsersDto

        };
        this.users.push(user);
        return user;
    }
}
