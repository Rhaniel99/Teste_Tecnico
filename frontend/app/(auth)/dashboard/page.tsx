import { OrdersTable } from "@/app/components/orders-table"
import { DashboardHeader } from "@/app/components/dashboard-header"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-6 text-2xl font-bold md:text-3xl">Pedidos de Compra</h1>
          <OrdersTable />
        </div>
      </main>
    </div>
  )
}
