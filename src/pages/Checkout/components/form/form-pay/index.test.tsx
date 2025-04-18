import { fireEvent, render, screen } from "@testing-library/react";
import { PaymentTypeContext } from "@contexts/payment-type-context";
import { FormPay } from ".";

const mockAddPaymentType = jest.fn();
const wrapperContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <PaymentTypeContext.Provider
      value={{
        addPaymentType: mockAddPaymentType,
        paymentType: "",
        resetPaymentType: jest.fn(),
      }}
    >
      {children}
    </PaymentTypeContext.Provider>
  );
};

describe("PaymentType", () => {
  test("should render corrected", () => {
    render(<FormPay />, { wrapper: wrapperContext });
    screen.getByText(
      /O pagamento é feito na entrega. Escolha a forma que deseja pagar/i
    );
    screen.getByText(/Cartão de crédito/i);
    screen.getByText(/cartão de débito/i);
    screen.getByText(/dinheiro/i);
  });

  test("should call handleGetPayFormat when clicked payment for Cartão de crédito", () => {
    render(<FormPay />, { wrapper: wrapperContext });
    const buttonCreditCart = screen.getByText(/Cartão de crédito/i);

    fireEvent.click(buttonCreditCart);

    expect(mockAddPaymentType).toHaveBeenCalledWith("Cartão de crédito");
  });

  test("should call handleGetPayFormat when clicked payment for cartão de débito", () => {
    render(<FormPay />, { wrapper: wrapperContext });
    const buttonDebitCart = screen.getByText(/cartão de débito/i);

    fireEvent.click(buttonDebitCart);

    expect(mockAddPaymentType).toHaveBeenCalledWith("cartão de débito");
  });

  test("should call handleGetPayFormat when clicked payment for dinheiro", () => {
    render(<FormPay />, { wrapper: wrapperContext });
    const buttonDinheiro = screen.getByText(/dinheiro/i);

    fireEvent.click(buttonDinheiro);

    expect(mockAddPaymentType).toHaveBeenCalledWith("dinheiro");
  });
});
