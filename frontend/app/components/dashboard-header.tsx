"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            <span className="text-lg font-semibold">Gestão de Compras</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden items-center gap-2 md:flex" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span>Sair</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
