import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrdersDto } from './dto/create-orders.dto/create-orders.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
  @Get(':id')
  findOne(@Param() params) {
    return this.ordersService.findOne(params.id)
  }
  @Post()
  create(@Body() CreateOrdersDto: CreateOrdersDto){
    return this.ordersService.create(CreateOrdersDto);
  }
}
