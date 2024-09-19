/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { QueryOrdersDto } from './dto/query-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(@Query() query : QueryOrdersDto) {
       // eslint-disable-next-line prefer-const
    let priority = query.priority;
    let id = query.id;
    let sortBy = query.sortBy;
    let orderBy = query.orderBy;
    return this.ordersService.findAll(priority, id, sortBy, orderBy);
  }
  @Get(':id')
  findOne(@Param() params) {
    let order = this.ordersService.findOne(params.id)
    if(order){
      return order;  
    }  else {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }}
  
  @Post()
  create(@Body() CreateOrdersDto: CreateOrdersDto){
    return this.ordersService.create(CreateOrdersDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto)   {
    return this.ordersService.update(id, updateOrderDto);
  }
 
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ordersService.remove(id);
  }
}
