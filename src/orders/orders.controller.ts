/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  orderRepository: any;
    constructor(private readonly ordersService: OrdersService) {}

  /*@Get()
  findAll(@Query() query : QueryOrdersDto) {
       // eslint-disable-next-line prefer-const
    let priority = query.priority;
    let id = query.id;
    let sortBy = query.sortBy;
    let orderBy = query.orderBy;
    return this.ordersService.findAll({});
  }*/
  @Get(':id')
  findOne(@Param() params) {
    let order = this.ordersService.findOne(params.id)
    if(order){
      return order;  
    }  else {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }}
  @Get()
  async getOrders(): Promise<Order[]>{
    return this.ordersService.getOrdersWithUsers();
  
    
    
  }
  
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
