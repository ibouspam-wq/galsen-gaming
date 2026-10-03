import { CartProvider } from "@/context/CartContext";
import { router } from "@/routes";
import { RouterProvider } from "@tanstack/react-router";

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
