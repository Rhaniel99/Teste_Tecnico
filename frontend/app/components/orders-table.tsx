"use client";

import { useState } from "react";
import { Edit, Plus, Trash2, CreditCard, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderForm } from "@/app/components/order-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useOrders } from "@/app/hooks/useOrders";
import { Order } from "@/app/types/order";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { PaymentDialog } from "@/app/components/payment-dialog";
import { useQueryClient } from "@tanstack/react-query";

export function OrdersTable() {
  const { orders, isLoading, isError, add, edit, remove } = useOrders();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [current, setCurrent] = useState<Order | null>(null);
  const [search, setSearch] = useState("");
  const [payingOrder, setPayingOrder] = useState<Order | null>(null);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const queryClient = useQueryClient();
  const openPayDialog = (order: Order) => {
    console.log(order);
    setPayingOrder(order);
    setIsPayOpen(true);
  };
  const closePayDialog = () => {
    setIsPayOpen(false);
    setPayingOrder(null);
  };
  const handlePaid = () => {
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  };

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar pedidos.</p>;

  const filtered = orders.filter(
    (o) =>
      o.clientId.includes(search) ||
      o.items.toLowerCase().includes(search.toLowerCase())
  );

  function handleCreate(data: Order) {
    add(data);
    toast.success("Pedido criado com sucesso!");
    setIsCreateOpen(false);
  }

  async function handleEdit(data: Order) {
    if (data.id) {
      await edit(data.id, { items: data.items, total: data.total });
      toast.success("Pedido atualizado com sucesso!");

      setCurrent(null);
      setIsEditOpen(false);
    }
  }

  const handleCancel = async (id: string) => {
    try {
      // Enviando apenas o status "cancelado"
      await edit(id, { status: "cancelado" });
      toast.success("Pedido cancelado com sucesso!");
    } catch (err) {
      console.error("Erro ao cancelar o pedido:", err);
      toast.error("Erro ao cancelar o pedido.");
    }
  };

  async function handleDelete(id: string) {
    try {
      await remove(id);
      toast.success("Pedido excluído com sucesso!");
    } catch (err) {
      console.error("Erro ao deletar pedido:", err);
      toast.error("Erro ao excluir o pedido.");
    }
  }

  function openEditDialog(order: Order) {
    setCurrent(order);
    setIsEditOpen(true);
  }

  return (
    <>
      <ToastContainer />

      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-xs">
            <Input
              placeholder="Pesquisar pedidos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Pedido
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Pedido</DialogTitle>
                <DialogDescription>
                  Adicione um novo pedido de compra ao sistema
                </DialogDescription>
              </DialogHeader>
              <OrderForm onSubmit={handleCreate} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Cliente</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="text-center">Quantidade</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length > 0 ? (
                filtered.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.client}
                    </TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell className="text-center">{order.total}</TableCell>
                    <TableCell className="text-center">
                      {order.status.toUpperCase()}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center items-center gap-2">
                        {/* Botão Pagar Pedido */}
                        {order.status !== "pago" &&
                          order.status !== "cancelado" && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => openPayDialog(order)}
                                  >
                                    <CreditCard className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>Pagar Pedido</TooltipContent>
                            </Tooltip>
                          )}

                        {/* Botão Editar Pedido */}
                        {order.status !== "pago" &&
                          order.status !== "cancelado" && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => openEditDialog(order)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>Editar Pedido</TooltipContent>
                            </Tooltip>
                          )}

                        {/* Botão Excluir Pedido */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Excluir Pedido
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza de que deseja excluir este
                                      pedido? Esta ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(order.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>Excluir Pedido</TooltipContent>
                        </Tooltip>

                        {/* Botão Cancelar Pedido */}
                        {order.status !== "pago" &&
                          order.status !== "cancelado" && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex">
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        className="text-destructive"
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Cancelar Pedido
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Tem certeza de que deseja cancelar
                                          este pedido? Esta ação não pode ser
                                          desfeita.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Cancelar
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleCancel(order.id)}
                                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                          Cancelar
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>Cancelar Pedido</TooltipContent>
                            </Tooltip>
                          )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Nenhum pedido encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {current && (
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Pedido</DialogTitle>
                <DialogDescription>
                  Atualize os detalhes do pedido de compra
                </DialogDescription>
              </DialogHeader>
              <OrderForm onSubmit={handleEdit} initialData={current} />
            </DialogContent>
          </Dialog>
        )}

        {payingOrder && (
          <PaymentDialog
            orderId={payingOrder.id}
            amount={Number(payingOrder.total) * Number(payingOrder.total)}
            open={isPayOpen}
            onClose={closePayDialog}
            onPaid={handlePaid}
          />
        )}
      </div>
    </>
  );
}
