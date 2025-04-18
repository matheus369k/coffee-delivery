import { env } from "@/env";
import { api } from "@lib/api";
import { requestCoffees } from "@pages/Home/service/get-coffees";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mockApi = new AxiosMockAdapter(api);
const mockAxios = new AxiosMockAdapter(axios);
jest.mock("@/env", () => ({
  env: {
    VITE_RENDER_API_URL: "http://localhost:3000/render",
    VITE_GH_API_URL: "http://localhost:3000/github",
  },
}));

describe("getCoffees", () => {
  const defaultResponse = {
    coffees: [
      {
        id: "1",
        name: "Coffee 1",
        slugs: ["coffee-1"],
        tags: ["coffee", "hot"],
        image: "coffee-1.png",
        description: "Coffee 1 description",
        price: "10.00",
      },
      {
        id: "2",
        name: "Coffee 2",
        slugs: ["coffee-2"],
        tags: ["coffee", "cold"],
        image: "coffee-2.png",
        description: "Coffee 2 description",
        price: "12.00",
      },
    ],
  };

  afterEach(() => {
    mockApi.reset();
    mockAxios.reset();
  });

  test("should run correctly", async () => {
    mockApi.onGet("/coffees/").replyOnce(200, defaultResponse);
    mockAxios
      .onGet(env.VITE_GH_API_URL)
      .replyOnce(200, defaultResponse.coffees);
    const result = await requestCoffees();
    expect(result).toMatchObject(defaultResponse.coffees);
  });

  test("should return data from first finish request", async () => {
    mockApi.onGet("/coffees/").withDelayInMs(1000).replyOnce(200, {
      coffees: defaultResponse.coffees[0],
    });
    mockAxios
      .onGet(env.VITE_GH_API_URL)
      .replyOnce(200, defaultResponse.coffees[1]);
    const result = await requestCoffees();
    expect(result).toMatchObject(defaultResponse.coffees[1]);
  });

  test("should run requests without query with correct paths", async () => {
    mockApi
      .onGet("/coffees/coffee-1")
      .withDelayInMs(1000)
      .replyOnce(200, defaultResponse);
    mockAxios
      .onGet(env.VITE_GH_API_URL)
      .replyOnce(200, defaultResponse.coffees);
    await requestCoffees();
    expect(mockAxios.history.get[0].url).toBe(env.VITE_GH_API_URL);
  });

  test("should run requests with query with correct paths", async () => {
    mockApi.onGet("/coffees/coffee-1").replyOnce(200, defaultResponse);
    mockAxios
      .onGet(env.VITE_GH_API_URL)
      .withDelayInMs(1000)
      .replyOnce(200, defaultResponse.coffees);
    await requestCoffees("coffee-1");
    expect(mockApi.history.get[0].url).toBe("/coffees/coffee-1");
  });

  test("should return empty array when data is not found", async () => {
    mockApi.onGet("/coffees/coffee-1").replyOnce(200, { coffees: [] });
    mockAxios.onGet(env.VITE_GH_API_URL).replyOnce(200, []);
    const result = await requestCoffees("coffee-1");
    expect(result).toMatchObject([]);
  });
});
