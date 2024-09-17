/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { QueryOrdersDto } from './dto/query-orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(@Query() query : QueryOrdersDto) {
       // eslint-disable-next-line prefer-const
    let priority = query.priority;
    let sortBy = query.sortBy;
    let orderBy = query.orderBy;
    return this.ordersService.findAll(priority, sortBy, orderBy);
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
