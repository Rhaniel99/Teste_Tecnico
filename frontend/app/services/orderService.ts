import { apiClient } from './api';
import type { Order, OrderCreate, OrderUpdate } from '../types/order';

export const listOrders = async (): Promise<Order[]> => {
  const { data } = await apiClient.get<Order[]>('/orders');
  return data;
};

export const getOrder = async (id: string): Promise<Order> => {
  const { data } = await apiClient.get<Order>(`/orders/${id}`);
  return data;
};

export const createOrder = async (input: OrderCreate): Promise<Order> => {
  const { data } = await apiClient.post<Order>('/orders', input);
  return data;
};

export const updateOrder = async (
  id: string,
  update: OrderUpdate
): Promise<Order> => {
  const { data } = await apiClient.patch<Order>(`/orders/${id}`, update);
  return data;
};

export const deleteOrder = async (id: string): Promise<void> => {
  await apiClient.delete(`/orders/${id}`);
};