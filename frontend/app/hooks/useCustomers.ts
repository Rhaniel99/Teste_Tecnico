import { useQuery } from '@tanstack/react-query'
import { listCustomers, Customer } from '../services/customerService'

export function useCustomers() {
  return useQuery<Customer[], Error>({
    queryKey: ['customers'],
    queryFn: () => listCustomers(),
  })
}