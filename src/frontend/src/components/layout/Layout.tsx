import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Outlet } from "@tanstack/react-router";
import { useState } from "react";

export function Layout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header onOpenMobileNav={() => setMobileNavOpen(true)} />
      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
