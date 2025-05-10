"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateOrder } from "@/app/services/orderService";
import { createStripe, CreateStripeDto } from "@/app/services/stripeService";
import {
  Loader2,
  CreditCard,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  orderId: string;
  amount: number;
  open: boolean;
  onClose: () => void;
  onPaid: () => void;
}

export function PaymentDialog({
  orderId,
  amount,
  open,
  onClose,
  onPaid,
}: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    if (!open) return;

    const dto: CreateStripeDto = {
      amount,
      currency: "brl",
      metadata: { orderId },
    };
    createStripe(dto)
      .then(({ clientSecret }) => setClientSecret(clientSecret))
      .catch((err) => {
        console.error(err);
        toast.error("Não foi possível iniciar o pagamento");
        onClose();
      });
  }, [open, amount, orderId, onClose]);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret || !cardComplete) return;

    setProcessingPayment(true);
    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      }
    );

    if (error) {
      toast.error(error.message);
      setCardError(error.message || "Erro no processamento do pagamento");
      setLoading(false);
      setProcessingPayment(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      await updateOrder(orderId, { status: "pago" });
      toast.success("Pagamento concluído!");
      onPaid();
      // Pequeno atraso para mostrar estado de sucesso antes de fechar
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  const handleCardChange = (event: any) => {
    setCardComplete(event.complete);
    setCardError(event.error ? event.error.message : null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <CreditCard className="h-5 w-5 text-primary" />
            Pagamento do Pedido
          </DialogTitle>
        </DialogHeader>

        <div className="py-2">
          <Separator />
        </div>

        {!clientSecret ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Preparando ambiente de pagamento...
            </p>
          </div>
        ) : (
          <>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
                <CardDescription>
                  Pedido #{orderId.substring(0, 8)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Valor total</span>
                  <span className="font-medium">{formatCurrency(amount)}</span>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 flex justify-between">
                <span className="font-medium">Total a pagar</span>
                <span className="text-lg font-bold text-primary">
                  {formatCurrency(amount)}
                </span>
              </CardFooter>
            </Card>

            <form onSubmit={handlePay} className="mt-4 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Dados do Cartão</label>
                <div
                  className={`rounded-md border p-4 ${
                    cardError
                      ? "border-destructive"
                      : cardComplete
                      ? "border-green-500"
                      : "border-input"
                  }`}
                >
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                    onChange={handleCardChange}
                  />
                </div>

                {cardError && (
                  <div className="flex items-center gap-1 text-xs text-destructive">
                    <AlertCircle className="h-3 w-3" />
                    <span>{cardError}</span>
                  </div>
                )}

                {cardComplete && !cardError && (
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <CheckCircle className="h-3 w-3" />
                    <span>Cartão válido</span>
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  Seus dados de pagamento são processados com segurança pela
                  Stripe.
                </p>
              </div>

              <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={processingPayment}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={!stripe || loading || !cardComplete || !!cardError}
                  className="relative"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : processingPayment ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Pagamento Concluído
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pagar {formatCurrency(amount)}
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
