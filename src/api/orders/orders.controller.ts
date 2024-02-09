import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Order } from './orders.entity';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Order> {
    return this.ordersService.getOrder(id);
  }

  @Delete(':id/user/:userId')
  async cancelOrderByUser(
    @Param('id') id: number,
    @Param('userId') userId: number,
  ) {
    return this.ordersService.cancelOrderByUser(id, userId);
  }

  @Post(':id/restaurant-cancel')
  async cancelOrderByRestaurant(
    @Param('id') id: number,
    @Body() body: { RestaurantName: string },
  ) {
    const { RestaurantName } = body;
    return this.ordersService.cancelOrderByRestaurant(id, RestaurantName);
  }
}
