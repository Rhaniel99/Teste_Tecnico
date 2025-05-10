"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, Menu, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function DashboardHeader() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 sm:max-w-xs">
              <nav className="flex flex-col gap-4 pt-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-primary hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  <Package className="h-5 w-5" />
                  <span>Purchase Orders</span>
                </Link>
                <Button
                  variant="ghost"
                  className="flex items-center justify-start gap-2 rounded-md px-3 py-2 text-destructive hover:bg-accent"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/dashboard" className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            <span className="text-lg font-semibold">Purchasing System</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden items-center gap-2 md:flex" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
