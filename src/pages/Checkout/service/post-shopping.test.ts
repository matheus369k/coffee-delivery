import AxiosMockAdapter from "axios-mock-adapter";
import { PostShopping } from "./post-shopping";
import { api } from "@lib/api";

const mockApi = new AxiosMockAdapter(api);
jest.mock("@/env", () => ({
  env: {
    VITE_RENDER_API_URL: "http://localhost:3000/render",
    VITE_GH_API_URL: "http://localhost:3000/github",
  },
}));

describe("PostShopping", () => {
  const defaultProps = {
    addressId: "123",
    buyCoffeeDatas: [
      {
        id: "1",
        name: "Expresso Tradicional",
        image: "https://github.com/lucas-santos-dev.png",
        total_price: "10.00",
        count: 1,
      },
      {
        id: "2",
        name: "Expresso Americano",
        image: "https://github.com/lucas-santos-dev.png",
        total_price: "10.00",
        count: 1,
      },
    ],
    paymentType: "credit_card",
  };

  const spyConsole = jest.spyOn(console, "log");
  beforeAll(() => {
    spyConsole.mockImplementation(() => {});
  });
  afterAll(() => {
    spyConsole.mockRestore();
  });
  afterEach(() => {
    mockApi.reset();
    window.localStorage.clear();
  });

  test("should render correctly", async () => {
    mockApi.onPost("/shopping/123").replyOnce(200, { shoppingId: "321" });
    await PostShopping(defaultProps);
    expect(window.localStorage.shoppingId).toBeDefined();
  });

  test("should break application when request to erros", async () => {
    mockApi.onPost("/shopping/123").replyOnce(500, {});
    await PostShopping(defaultProps);
    expect(window.localStorage.shoppingId).toBeUndefined();
  });

  test("should stopping application when shoppingId is not found", async () => {
    mockApi.onPost("/shopping/123").replyOnce(200, {});
    await PostShopping(defaultProps);
    expect(window.localStorage.shoppingId).toBeUndefined();
  });

  test("should throw an error when props buyCoffeeDatas is not found", async () => {
    mockApi.onPost("/shopping/123").replyOnce(200, {});
    await PostShopping({
      ...defaultProps,
      buyCoffeeDatas: [],
    });
    expect(window.localStorage.shoppingId).toBeUndefined();
  });

  test("should throw an error when props paymentType is string empty", async () => {
    mockApi.onPost("/shopping/123").replyOnce(200, {});
    await PostShopping({
      ...defaultProps,
      paymentType: "",
    });
    expect(window.localStorage.shoppingId).toBeUndefined();
  });
});
