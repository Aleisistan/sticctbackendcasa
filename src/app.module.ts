import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { WorkdoneModule } from './workdone/workdone.module';

@Module({
  imports: [UsersModule, OrdersModule, WorkdoneModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
