import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsEnum(
    ['pendente', 'pago', 'cancelado'],
    { message: 'status deve ser pendente, pago ou cancelado.' },
  )
  readonly status?: 'pendente' | 'pago' | 'cancelado';
}