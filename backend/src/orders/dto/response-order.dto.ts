import { Expose, Transform } from 'class-transformer';

export class ResponseOrderDto {
  @Expose()
  id: string;

  // Extrai apenas o nome do cliente
  @Expose()
  @Transform(({ obj }) => obj.client?.name, { toClassOnly: true })
  client: string;

  @Expose()
  clientId: string;

  @Expose()
  items: string;

  @Expose()
  total: string;

  @Expose()
  status: string;
}