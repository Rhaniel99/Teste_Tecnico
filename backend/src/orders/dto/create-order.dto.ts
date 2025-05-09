import {
  IsUUID,
  IsNotEmpty,
  IsString,
  Length,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsUUID('4', { message: 'clientId deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'O campo clientId é obrigatório.' })
  readonly clientId: string;

  @IsString({ message: 'items deve ser uma string.' })
  @IsNotEmpty({ message: 'items não pode estar vazio.' })
  @Length(1, 255, { message: 'items deve ter entre $constraint1 e $constraint2 caracteres.' })
  readonly items: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'total deve ser um número com até 2 casas decimais.' },
  )
  @Min(0, { message: 'total não pode ser negativo.' })
  readonly total: number;
}
