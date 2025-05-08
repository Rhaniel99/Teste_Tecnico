import { Injectable } from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Developer } from './entities/developer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DevelopersService {
  constructor(
    @InjectRepository(Developer)
    private readonly repository : Repository<Developer>) {}

  create(dto: CreateDeveloperDto) {
    const developer = this.repository.create(dto);
    return this.repository.save(developer);
  }

  findAll() {
    return this.repository.find();
    // return `This action returns all developers`;
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
    // return `This action returns a #${id} developer`;
  }

  async update(id: string, dto: UpdateDeveloperDto) {
    const developer = await this.repository.findOneBy({ id });
    
    if (!developer) return null;

    this.repository.merge(developer, dto);

    return this.repository.save(developer);
  }

  async remove(id: string) {
    const developer = await this.repository.findOneBy({ id });
    
    if (!developer) return null;

    return this.repository.remove(developer);
  }
}
