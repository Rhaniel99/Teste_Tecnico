import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
    constructor(
      @InjectRepository(Customer)
      private readonly repository : Repository<Customer>) {}

  create(dto: CreateCustomerDto) {
    const customer = this.repository.create(dto);
    return this.repository.save(customer);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateCustomerDto) {
    const customer = await this.repository.findOneBy({ id });
    
    if (!customer) return null;
    
    this.repository.merge(customer, dto);

    return this.repository.save(customer);
  }

  async remove(id: string) {
    const customer = await this.repository.findOneBy({ id });
    
    if (!customer) return null;

    return this.repository.remove(customer);
  }
}
