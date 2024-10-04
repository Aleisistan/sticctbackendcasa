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
    type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: 'secret123!',
     database: 'sticct',
      entities: [Order, User],
      synchronize: true,
    }),
UsersModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
