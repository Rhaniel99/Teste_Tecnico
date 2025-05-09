import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  create(dto: CreateOrderDto) {
    const order = this.repository.create(dto);
    return this.repository.save(order);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

 async update(id: string, dto: UpdateOrderDto) {
    const order = await this.repository.findOneBy({ id });
    
    if (!order) return null;

    this.repository.merge(order, dto);

    return this.repository.save(order);
  }
  
async remove(id: string) {
    const order = await this.repository.findOneBy({ id });
    
    if (!order) return null;

    return this.repository.remove(order);
  }
}
