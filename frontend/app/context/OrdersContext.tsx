"use client";

import { createContext, useContext, ReactNode } from "react";
import { Order, OrderCreate, OrderUpdate } from "@/app/types/order";
import { useOrders } from "@/app/hooks/useOrders";

interface OrdersContextProps {
  orders: Order[];
  isLoading: boolean;
  isError: boolean;
  add: (order: OrderCreate) => void;
  edit: (id: string, data: OrderUpdate) => void;
  remove: (id: string) => void;
}

const OrdersContext = createContext<OrdersContextProps | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const { orders, isLoading, isError, add, edit, remove } = useOrders();

  return (
    <OrdersContext.Provider value={{ orders, isLoading, isError, add, edit, remove }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrdersContext() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrdersContext must be used within an OrdersProvider");
  }
  return context;
}
