import { fireEvent, render, screen } from "@testing-library/react";
import { FormAddress } from ".";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("FormAddress", () => {
  const MockRegister = jest.fn();
  const defaultProps = {
    city: "TestCity",
    cep: "55870000",
    complement: "test house",
    neighborhood: "testing",
    street: "test 2",
    uf: "TT",
    number: 2,
  };

  beforeEach(() => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: MockRegister,
    });
  });

  test("should render component corrected", () => {
    render(
      <FormAddress
        address={defaultProps}
        handleHasEditeAddress={jest.fn()}
        hasEditeAddress
      />
    );

    screen.getByText(/Endereço de Entrega/i);
    screen.getByText(/Informe o endereço onde deseja receber seu pedido/i);
    const buttonEdit = screen.queryByRole("button", { name: /Editar/i });
    expect(buttonEdit).toBeNull();
    screen.getByRole("spinbutton", { name: /cep/i });
    screen.getByRole("textbox", { name: /street/i });
    screen.getByRole("spinbutton", { name: /house number/i });
    screen.getByRole("textbox", { name: /complement/i });
    screen.getByRole("textbox", { name: /neighborhood/i });
    screen.getByRole("textbox", { name: /city/i });
    screen.getByRole("textbox", { name: /uf/i });
  });

  test("should not render Button edit when hasEditeAddress is false", () => {
    render(
      <FormAddress
        address={defaultProps}
        handleHasEditeAddress={jest.fn()}
        hasEditeAddress
      />
    );

    const buttonEdit = screen.queryByRole("button", { name: /Editar/i });
    expect(buttonEdit).toBeNull();
  });

  test("should render Button edit when hasEditeAddress is true", () => {
    render(
      <FormAddress
        address={defaultProps}
        handleHasEditeAddress={jest.fn()}
        hasEditeAddress={false}
      />
    );

    screen.getByRole("button", { name: /Editar/i });
  });

  test("should Button call handleHasEditeAddress when is clicked", () => {
    const mockHandleHasEditeAddress = jest.fn();
    render(
      <FormAddress
        address={defaultProps}
        handleHasEditeAddress={mockHandleHasEditeAddress}
        hasEditeAddress={false}
      />
    );
    const buttonEdit = screen.getByRole("button", { name: /Editar/i });

    fireEvent.click(buttonEdit);

    expect(mockHandleHasEditeAddress).toHaveBeenCalled();
  });
});
