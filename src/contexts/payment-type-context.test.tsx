import { renderHook } from "@testing-library/react";
import {
  PaymentTypeContext,
  PaymentTypeContextProvider,
} from "./payment-type-context";
import { act, useContext, type ReactNode } from "react";

describe("PaymentTypeContext", () => {
  test("should run correctly", () => {
    const { result } = renderHook(() => useContext(PaymentTypeContext), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <PaymentTypeContextProvider>{children}</PaymentTypeContextProvider>
      ),
    });
    expect(result.current.paymentType).toBe("");
    expect(result.current.addPaymentType).toBeDefined();
    expect(result.current.resetPaymentType).toBeDefined();
  });

  test("should add payment type", () => {
    const { result } = renderHook(() => useContext(PaymentTypeContext), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <PaymentTypeContextProvider>{children}</PaymentTypeContextProvider>
      ),
    });

    act(() => {
      result.current.addPaymentType("credit");
    });

    expect(result.current.paymentType).toBe("credit");
  });

  test("should toggle payment type", () => {
    const { result } = renderHook(() => useContext(PaymentTypeContext), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <PaymentTypeContextProvider>{children}</PaymentTypeContextProvider>
      ),
    });

    act(() => {
      result.current.addPaymentType("credit");
      result.current.addPaymentType("debit");
    });

    expect(result.current.paymentType).toBe("debit");
  });

  test("should reset payment type", () => {
    const { result } = renderHook(() => useContext(PaymentTypeContext), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <PaymentTypeContextProvider>{children}</PaymentTypeContextProvider>
      ),
    });
    act(() => {
      result.current.addPaymentType("credit");
      result.current.resetPaymentType();
    });

    expect(result.current.paymentType).toBe("");
  });
});
