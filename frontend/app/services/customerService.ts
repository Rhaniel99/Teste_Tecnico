import { apiClient } from './api'

export type Customer = {
  id: string
  name: string
}

export const listCustomers = async (): Promise<Customer[]> => {
  const { data } = await apiClient.get<Customer[]>('/customers')
  return data
}

export const getCustomer = async (id: string): Promise<Customer> => {
  const { data } = await apiClient.get<Customer>(`/customers/${id}`)
  return data
}

export const createCustomer = async (input: Pick<Customer, 'name'>): Promise<Customer> => {
  const { data } = await apiClient.post<Customer>('/customers', input)
  return data
}

export const updateCustomer = async (id: string, input: Pick<Customer, 'name'>): Promise<Customer> => {
  const { data } = await apiClient.patch<Customer>(`/customers/${id}`, input)
  return data
}

export const deleteCustomer = async (id: string): Promise<void> => {
  await apiClient.delete(`/customers/${id}`)
}
