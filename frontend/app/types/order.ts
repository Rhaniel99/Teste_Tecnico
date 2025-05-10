export type Order = {
  id: string;
  client: string;
  clientId: string;
  items: string;
  total: number;
  status: string;
};

export type OrderCreate = Omit<Order, 'id' | 'status' | 'client'>;
export type OrderUpdate = Partial<Order>;