/* eslint-disable react-hooks/exhaustive-deps */
import { StylesListCoffee, StylesForm } from "./styles";
import { FormUser } from "./components/form/index";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext } from "react";
import { CardBuyCoffee } from "./components/card-buy-coffee";
import { useNavigate } from "react-router";
import { PricesTotal } from "./components/total-prices";
import { NotFound } from "./components/not-found";
import { PostShopping } from "./service/post-shopping";
import { RegisterAddress } from "./service/register-address";
import { UpdateAddress } from "./service/update-address";
import { CartCoffeeContext } from "@contexts/cart-coffee-context";
import { PaymentTypeContext } from "@contexts/payment-type-context";
import { useCalculateFinnishPrice } from "./hooks/use-calculate-finnish-price";

export interface TotalPriceType {
  Products: string;
  taxa: string;
  priceEnd: string;
}

const FormUserZodSchema = z.object({
  cep: z.string().min(8),
  street: z.string().min(4),
  number: z.coerce.number().min(1),
  complement: z.string().default(""),
  neighborhood: z.string().min(4),
  city: z.string().min(4),
  uf: z.string().min(2),
});

export type FormUseType = z.infer<typeof FormUserZodSchema>;

export function Checkout() {
  const { paymentType, resetPaymentType } = useContext(PaymentTypeContext);
  const { cartCoffee, ResetCoffeeCart } = useContext(CartCoffeeContext);
  const { priceTotal } = useCalculateFinnishPrice();
  const navigate = useNavigate();
  const hookForm = useForm<FormUseType>({
    resolver: zodResolver(FormUserZodSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = hookForm;

  async function handleFormUser(address: FormUseType) {
    try {
      if (!paymentType) return;

      let addressId: string | undefined = window.localStorage.addressId;

      if (!addressId) {
        addressId = await RegisterAddress({ address });
      } else if (window.sessionStorage.editeAddress) {
        await UpdateAddress({ address, addressId });
      }
      if (!addressId) {
        throw new Error("Erro ao cadastrar endereço");
      }
      await PostShopping({
        addressId,
        buyCoffeeDatas: cartCoffee,
        paymentType,
      });

      ResetCoffeeCart();
      resetPaymentType();
      navigate("/coffee-delivery/confirm");
    } catch (error) {
      console.log(error);
    }
  }

  if (!cartCoffee || cartCoffee.length === 0) {
    return <NotFound />;
  }

  return (
    <main>
      <StylesForm
        onSubmit={handleSubmit(handleFormUser)}
        aria-autocomplete="none"
        autoComplete="off"
        autoSave="off"
      >
        <FormProvider {...hookForm}>
          <FormUser />
        </FormProvider>

        <StylesListCoffee>
          <h3>Cafés selecionados</h3>
          <ul>
            {cartCoffee.length > 0 ? (
              cartCoffee.map((data) => {
                return <CardBuyCoffee {...data} key={data.id} />;
              })
            ) : (
              <p>Carregando...</p>
            )}
          </ul>
          <PricesTotal isLoading={isSubmitting} priceTotal={priceTotal} />
        </StylesListCoffee>
      </StylesForm>
    </main>
  );
}
