/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { QueryOrdersDto } from './dto/query-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  orderRepository: any;
    constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(@Query() query : QueryOrdersDto) {
       // eslint-disable-next-line prefer-const
    let priority = query.priority;
    let id = query.id;
    let sortBy = query.sortBy;
    let orderBy = query.orderBy;
    return this.ordersService.findAll();
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
 async create(@Body() CreateOrdersDto: CreateOrdersDto): Promise<Order>{
    await this.ordersService.create(CreateOrdersDto);
    return;
     
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto): Promise<Order>   {
    this.ordersService.update(id, updateOrderDto)
    return;
  }
 
  @Delete(':id') //"ESTE FUNCIONA"
  remove(@Param('id') id: number): Promise<Order> {
    this.ordersService.remove(id);
    return;
  }
}
