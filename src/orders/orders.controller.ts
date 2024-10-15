/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
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
    return this.ordersService.findAll({});
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    let order = this.ordersService.findOne(id)
    if(order){
      return order;  
    }  else {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }}
  @Get(':priority')
    async findOrdersByPriority(@Param('priority') priority: string) {
      return this.ordersService.findOrdersByPriority(priority);
    }
  //@Get(':priority') 14/10 22:30
  //14/10 20:23
  /*async getOrders(): Promise<Order[]>{
    return this.ordersService.getOrdersWithUsers();
  */ 
    /*async getOrders(@Query('sortBy') sortBy: string = 'priority', @Query('orderBy') orderBy: 'ASC' | 'DESC' = 'ASC'): Promise<Order[]> {
      return this.ordersService.findAll({ priority: undefined }, sortBy, orderBy);
    }*/ //14/10 22:30
  @Post()
  async create(@Body() CreateOrdersDto: CreateOrdersDto): Promise<Order>{
    const result = await this.ordersService.create(CreateOrdersDto);
      if ('error' in result) {
          throw new BadRequestException(result.error);
      }
      return result; // Devolver el objeto de tipo Order.return this.ordersService.create(CreateOrdersDto);
   
    
     
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto): Promise<Order>   {
    return this.ordersService.update(id, updateOrderDto)
   
    
  }
 
  @Delete(':id') //"ESTE FUNCIONA"
  remove(@Param('id') id: number): Promise<void> {
    return this.ordersService.remove(id);
    
    
  }
}
