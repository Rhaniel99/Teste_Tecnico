import { OrdersProvider } from "@/app/context/OrdersContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OrdersProvider>{children}</OrdersProvider>
    </>
  );
}
