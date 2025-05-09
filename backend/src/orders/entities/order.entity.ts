import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Customer } from '@/customers/entities/customer.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ? Um cliente pode ter vários pedidos (eager loading ativado para carregar automaticamente o cliente relacionado)
  @ManyToOne(() => Customer, (customer) => customer.orders, { eager: true })
  @JoinColumn({ name: 'clientId' })
  client: Customer;

  @Column('uuid')
  clientId: string;

  @Column()
  items: string;

  @Column('decimal')
  total: number;

  @Column({
    type: 'enum',
    enum: ['pendente', 'pago', 'cancelado'],
    default: 'pendente',
  })
  status: 'pendente' | 'pago' | 'cancelado';
}
