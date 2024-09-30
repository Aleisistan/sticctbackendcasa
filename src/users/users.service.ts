/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto/create-users.dto';
import { UpdateUserDto } from './dto/create-users.dto/update-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>   //REVISAR OTRO POSTGRES EN PUERTO 5432
    ) {

    }
  
    
    private users = [
        {
            "id": 1,
            "name": "Ana",
            "institute": "otros",
            "mail": "ana@gmail.com",
            "cel": 154123456
         },
         {
            "id": 2,
            "name": "Juana",
            "institute": "cificen",
            "mail": "juana@gmail.com",
            "cel": 154789456
         },
         {
            "id": 3,
            "name": "Laura",
            "institute": "civetan",
            "mail": "laura@gmail.com",
            "cel": 154456789

         }
    ]; 

    async findAll(filters: { institute?: string; id?: number; sortBy?: string; orderBy?: number },
        orderField: string = 'institute', //ORDENO POR INSTITUTE
        orderDirection: 'ASC' | 'DESC' = 'ASC',
        
        ): Promise<User[]> {
            const whereConditions: any ={};
        
            if (filters.institute) {
              whereConditions.priority = Like(`%${filters.institute}%`);
            }
        
            if (filters.id) {
              whereConditions.id = Like (`%${filters.id}%`);
            }
            /*if (filters.sortBy) {
                whereConditions.sortBy = Like(`%${filters.sortBy}%`);
            } 
            if (filters.orderBy) {
                whereConditions.oderBy = Like(`%${filters.orderBy}%`);
              }*/
        
            return this.userRepository.find({
                where: whereConditions,
                order: {
                    [orderField]: orderDirection,
                    },
            });
          }
    /*findAll(institute: string, id: number, sortBy: string, orderBy: string) {
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

}*/
    findOne(id:any): Promise<User> {
        return this.userRepository.findOneBy({id});
    }        /*findOne(id: any) {
    /*findOne(id: any) {
        
        //if(!id)
          //  throw new HttpException('Not Found', HttpStatus.NOT_FOUND);// SE ME CIERRA LA APLICACION ERROR 500 INTERNAL SERVER ERROR
            //throw new HttpException( 'ERROR DE SERVER 500', HttpStatus.INTERNAL_SERVER_ERROR);
        return this.users.find(function(user){
        return user.id == id;
        });
    }*/
    async create(CreateUsersDto: CreateUsersDto): Promise<User> {
        const newUser = this.userRepository.create(CreateUsersDto);
        return await this.userRepository.save(newUser);
    }
    /*
    create(CreateUsersDto: CreateUsersDto) {
        let nextId = this.users[this.users.length-1].id +1;
        let user = new User(nextId, CreateUsersDto.name, CreateUsersDto.institute, CreateUsersDto.mail, CreateUsersDto.cel);
        this.users.push(user);
        return user;
    }*/
    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        await this.userRepository.update(id, updateUserDto);
        return this.userRepository.findOne({where:{id}});
    }
   /*
    update(id: number, updateUserDto: UpdateUserDto): User {
        let user = this.findOne(id);
        user.name = updateUserDto.name;
        user.institute = updateUserDto.institute;
        user.mail = updateUserDto.mail;
        user.cel = updateUserDto.cel
        return user;
    }*/
    async remove(id: number): Promise<void> { //FUNCIONA ESTE
        await this.userRepository.delete(id);
           }
   /*
    remove(id: number)  {
        let user = this.findOne(id);
        if(!user) 
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        let pos = this.users.indexOf(user)
        this.users.splice(pos, 1);
        
      }*/
}
