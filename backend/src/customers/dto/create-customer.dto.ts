import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateCustomerDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @Length(2, 100, {
    message: 'O nome deve ter entre $constraint1 e $constraint2 caracteres.',
  })
  readonly name: string;
}