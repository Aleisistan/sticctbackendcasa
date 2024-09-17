import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly appService: OrdersService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
