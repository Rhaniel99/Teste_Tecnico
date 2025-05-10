import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseOrderDto } from './dto/response-order.dto';
import { plainToInstance } from 'class-transformer';

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

  async findAll() {
    const orders = await this.repository.find({ relations: ['client'] });
    // ? Aplica a transformação e exclui campos não expostos
    return plainToInstance(ResponseOrderDto, orders, {
      excludeExtraneousValues: true,
    });
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateOrderDto) {
    const order = await this.repository.findOneBy({ id });

    if (!order) return null;

    // Verifica se há algum campo no DTO para atualizar
    const dtoKeys = Object.keys(dto).filter(
      (key) => dto[key as keyof UpdateOrderDto] !== undefined,
    );

    if (dtoKeys.length === 0) {
      throw new BadRequestException('É necessário enviar ao menos um campo para atualização.');
    }

    // Aplica apenas os campos definidos no DTO
    dtoKeys.forEach((key) => {
      (order as any)[key] = dto[key as keyof UpdateOrderDto];
    });

    return this.repository.save(order);
  }
  
async remove(id: string) {
    const order = await this.repository.findOneBy({ id });
    
    if (!order) return null;

    return this.repository.remove(order);
  }
}
