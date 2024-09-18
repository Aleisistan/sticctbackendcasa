/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { QueryOrdersDto } from './dto/query-orders.dto';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';

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

  @Put(':id')
  update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto)   {
    return this.ordersService.update(id, updateOrderDto)
  }
  
}
