"use client";

import type React from "react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCustomers } from "@/app/hooks/useCustomers";
import type { Order, OrderUpdate, OrderCreate } from "@/app/types/order";
import { useOrdersContext } from "@/app/context/OrdersContext";

const orderSchema = z.object({
  clientId: z.string().min(1, "Cliente é obrigatório"),
  items: z.string().min(1, "Item é obrigatório"),
  total: z.number().min(1, "Total deve ser ≥ 1"),
});

type OrderFormProps = {
  initialData?: Order;
  onSubmit?: (data: Order) => void;
};

export function OrderForm({ initialData, onSubmit }: OrderFormProps) {
  const { add, edit } = useOrdersContext();
  const { data: customers = [], isLoading, isError } = useCustomers();
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ? Estado do formulário: inicializa com valores de edição (initialData) ou padrões
  const [formData, setFormData] = useState<{
    clientId: string;
    items: string;
    total: number;
  }>({
    clientId: initialData?.clientId || "",
    items: initialData?.items || "",
    total: initialData?.total || 1,
  });

  // ? Atualiza formData ao digitar no input/select
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((ds) => ({
      ...ds,
      [name]: name === "total" ? Number(value) : value,
    }));

    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  }

  // ? Função disparada no submit do formulário
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      orderSchema.parse(formData);

      if (initialData) {
        onSubmit?.({ ...initialData, ...formData });
      } else {
        onSubmit?.(formData as Order);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErr: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path[0]) newErr[e.path[0].toString()] = e.message;
        });
        setErrors(newErr);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      {/* Campo de seleção de cliente */}
      <div className="space-y-2">
        <Label htmlFor="clientId">Cliente</Label>
        {isLoading ? (
          <p>Carregando clientes...</p>
        ) : isError ? (
          <p className="text-destructive">Erro ao carregar clientes</p>
        ) : (
          <select
            id="clientId"
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">Selecione um cliente</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        )}
        {/* Exibe erro de validação se existir */}
        {errors.clientId && (
          <p className="text-sm text-destructive">{errors.clientId}</p>
        )}
      </div>

      {/* Campo de item */}
      <div className="space-y-2">
        <Label htmlFor="items">Item</Label>
        <Input
          id="items"
          name="items"
          value={formData.items}
          onChange={handleChange}
          placeholder="Digite o nome do item"
        />
        {errors.items && (
          <p className="text-sm text-destructive">{errors.items}</p>
        )}
      </div>

      {/* Campo de quantidade/total */}
      <div className="space-y-2">
        <Label htmlFor="total">Quantidade</Label>
        <Input
          id="total"
          name="total"
          type="number"
          min="1"
          value={formData.total}
          onChange={handleChange}
          placeholder="Digite a quantidade"
        />
        {errors.total && (
          <p className="text-sm text-destructive">{errors.total}</p>
        )}
      </div>

      {/* Botão de submit: muda texto dependendo de edição/criação */}
      <Button type="submit" className="w-full">
        {initialData ? "Atualizar Pedido" : "Criar Pedido"}
      </Button>
    </form>
  );
}
