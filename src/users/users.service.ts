/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto/create-users.dto';
import { UpdateUserDto } from './dto/create-users.dto/update-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  
    
    private users = [
        {
            "id": 1,
            "name": "Ana",
            "institute": "otros",
            "contact": "ana@gmail.com"
         },
         {
            "id": 2,
            "name": "Juana",
            "institute": "cificen",
            "contact": "juana@gmail.com"
         },
         {
            "id": 3,
            "name": "Laura",
            "institute": "civetan",
            "contact": "laura@gmail.com"
         }
    ]; 
    findAll(institute: string, id: number, sortBy: string, orderBy: string) {
        let queryUsers = []; 
        //FILTRO POR INSTITUTO
        if(!institute){
            queryUsers = this.users;

    }
    else {
        queryUsers = this.users.filter(function(user){
            return user.institute.toLowerCase() == institute.toLowerCase();

    });
}
    if(!id){
        queryUsers = this.users;

}
else {
    queryUsers = this.users.filter(function(user){
        return user.id == id;

});


    }
    if(!sortBy){
        return queryUsers;
    }
    
    let orderedUsers = queryUsers.sort(function(a, b) {
        let OrdenarA = a[sortBy];
        let OrdenarB = b[sortBy];
        if(OrdenarA < OrdenarB) {
            return -1;
        }
        if(OrdenarA == OrdenarB){
            return 0;
        }
        return 1;
    })
    return orderedUsers;

}
 
 
      
    findOne(id: any) {
        
        //if(!id)
          //  throw new HttpException('Not Found', HttpStatus.NOT_FOUND);// SE ME CIERRA LA APLICACION ERROR 500 INTERNAL SERVER ERROR
            //throw new HttpException( 'ERROR DE SERVER 500', HttpStatus.INTERNAL_SERVER_ERROR);
        return this.users.find(function(user){
        return user.id == id;
        });
    }
    create(CreateUsersDto: CreateUsersDto) {
        let nextId = this.users[this.users.length-1].id +1;
        let user = new User(nextId, CreateUsersDto.name, CreateUsersDto.institute, CreateUsersDto.contact);
        this.users.push(user);
        return user;
    }
    update(id: number, updateUserDto: UpdateUserDto): User {
        const user = this.findOne(id);
        user.name = updateUserDto.name;
        user.institute = updateUserDto.institute;
        user.contact = updateUserDto.contact;
        return user;
    }
    remove(id: number)  {
        const user = this.findOne(id);
        if(!user) 
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        const pos = this.users.indexOf(user)
        this.users.splice(pos, 1);
        
      }
}
