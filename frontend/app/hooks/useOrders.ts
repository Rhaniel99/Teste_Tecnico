"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Order, OrderCreate, OrderUpdate } from "../types/order";
import {
  listOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../services/orderService";

export function useOrders() {
  const queryClient = useQueryClient();

  // Busca lista de pedidos
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: listOrders,
  });

  // Mutation para criação
  const createMutation = useMutation<Order, Error, OrderCreate>({
    mutationFn: (input) => createOrder(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });

  // Mutation para atualização
  const updateMutation = useMutation<
    Order,
    Error,
    { id: string; data: OrderUpdate }
  >({
    mutationFn: ({ id, data }) => updateOrder(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });

  // Mutation para remoção
  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (id) => deleteOrder(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });

  return {
    orders,
    isLoading,
    isError,
    add: (input: OrderCreate) => createMutation.mutateAsync(input),
    edit: (id: string, upd: OrderUpdate) =>
      updateMutation.mutateAsync({ id, data: upd }),
    remove: (id: string) => deleteMutation.mutateAsync(id),
  };
}
