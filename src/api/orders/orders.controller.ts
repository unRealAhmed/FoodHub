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

import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import {
  ORDER_CREATED_SUCCESSFULLY,
  ORDER_CANCELLED_SUCCESSFULLY,
  LIST_ALL_ORDERS,
  ORDER_FOUND,
} from 'src/common/assets/messages';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new order',
    description: 'create a new order.',
  })
  @ApiBody({ type: CreateOrderDto })
  @ApiCreatedResponse({
    description: 'Order created successfully.',
    type: Order,
  })
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<{ message: string; data: Order }> {
    const order = await this.ordersService.createOrder(createOrderDto);
    return { message: ORDER_CREATED_SUCCESSFULLY, data: order };
  }

  @Get()
  @ApiOperation({
    summary: 'Get all orders',
    description: 'retrieve a list of all orders.',
  })
  @ApiOkResponse({
    description: 'List of all orders.',
    type: Order,
    isArray: true,
  })
  async getAllOrders(): Promise<{ message: string; data: Order[] }> {
    const orders = await this.ordersService.getAllOrders();
    return { message: LIST_ALL_ORDERS, data: orders };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an order by ID',
    description: 'retrieve an order by its ID.',
  })
  @ApiOkResponse({
    description: 'Order found.',
    type: Order,
  })
  @ApiNotFoundResponse({
    description: 'Order not found.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the order',
  })
  async getOrderById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<{ message: string; data: Order }> {
    const order = await this.ordersService.getOrder(id);
    return { message: ORDER_FOUND, data: order };
  }

  @Delete(':id/user/:userId')
  @ApiOperation({
    summary: 'Cancel an order by user',
    description: 'cancel an order by user.',
  })
  @ApiOkResponse({
    description: 'Order cancelled successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Order not found.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the order',
  })
  @ApiParam({
    name: 'userId',
    description: 'ID of the user',
  })
  async cancelOrderByUser(
    @Param('id') id: number,
    @Param('userId') userId: number,
  ): Promise<{ message: string }> {
    await this.ordersService.cancelOrderByUser(id, userId);
    return { message: ORDER_CANCELLED_SUCCESSFULLY };
  }

  @Post(':id/restaurant-cancel')
  @ApiOperation({
    summary: 'Cancel an order by restaurant',
    description: 'cancel an order by restaurant.',
  })
  @ApiOkResponse({
    description: 'Order cancelled successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Order not found.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the order',
  })
  async cancelOrderByRestaurant(
    @Param('id') id: number,
    @Body() body: { RestaurantName: string },
  ): Promise<{ message: string }> {
    const { RestaurantName } = body;
    await this.ordersService.cancelOrderByRestaurant(id, RestaurantName);
    return { message: ORDER_CANCELLED_SUCCESSFULLY };
  }
}
