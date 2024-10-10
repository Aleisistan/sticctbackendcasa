/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders/entities/order.entity';
import { OrdersModule } from './orders/orders.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: process.env.DB_TYPE as 'postgres', //type: 'postgres',
    host: process.env.DB_HOST, //host: 'localhost',
    port: parseInt(process.env.DB_PORT, 10), //port: 2425,
    username: process.env.DB_USERNAME, //username: 'postgres',
    password: process.env.DB_PASSWORD, //password: 'secret123!',
    database: process.env.DB_DATABASE,//database: 'sticct',
    ssl: process.env.TYPEORM_SSL === 'true',
    entities: [Order, User],
    synchronize: true,
    }),
UsersModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
