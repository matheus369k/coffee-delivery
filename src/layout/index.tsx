import { Header } from "@components/Header/index";
import { Outlet } from "react-router";
import { StylesLayoutDefault } from "./styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartCoffeeContextProvider } from "@contexts/cart-coffee-context";
import { PaymentTypeContextProvider } from "@contexts/payment-type-context";

const queryClient = new QueryClient();
export function LayoutDefault() {
  return (
    <StylesLayoutDefault>
      <CartCoffeeContextProvider>
        <Header />
        <QueryClientProvider client={queryClient}>
          <PaymentTypeContextProvider>
            <Outlet />
          </PaymentTypeContextProvider>
        </QueryClientProvider>
      </CartCoffeeContextProvider>
    </StylesLayoutDefault>
  );
}
