import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStripeDto {
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  metadata?: Record<string, string>;
}