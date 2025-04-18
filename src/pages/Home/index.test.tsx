import { render, screen } from "@testing-library/react";
import { Home } from "@pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as ReactQuery from "@tanstack/react-query";
import AxiosMockAdapter from "axios-mock-adapter";
import { api } from "@lib/api";
import axios from "axios";
import { env } from "@/env";
import userEvent from "@testing-library/user-event";
import { act } from "react";

const mockApi = new AxiosMockAdapter(api);
const mockAxios = new AxiosMockAdapter(axios);
jest.mock("@/env", () => ({
  env: {
    VITE_RENDER_API_URL: "http://localhost:3000/render",
    VITE_GH_API_URL: "http://localhost:3000/github",
  },
}));
const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Home", () => {
  const defaultResponse = [
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
  ];

  const spyConsole = jest.spyOn(console, "log");
  beforeAll(() => {
    spyConsole.mockImplementation(() => {});
  });
  afterAll(() => {
    spyConsole.mockRestore();
  });

  beforeEach(() => {
    mockAxios
      .onGet(env.VITE_GH_API_URL)
      .withDelayInMs(1000)
      .reply(200, defaultResponse);
  });

  afterEach(() => {
    mockApi.reset();
    mockAxios.reset();
    queryClient.clear();
  });

  test("should render correctly", async () => {
    mockApi.onGet("/coffees/").replyOnce(200, { coffees: defaultResponse });
    render(<Home />, { wrapper });
    screen.getByRole("heading", {
      level: 1,
      name: /Encontre o café perfeito para qualquer hora do dia/i,
    });
    screen.getByRole("heading", { level: 2, name: /Nossos cafés/i });
    await screen.findByRole("heading", { level: 3, name: /coffee 1/i });
    screen.findByRole("heading", { level: 3, name: /coffee 2/i });
  });

  test("should showing error ui view when data is fall fetching", async () => {
    mockApi.onGet("/coffees/").replyOnce(200, undefined);
    render(<Home />, { wrapper });
    screen.getByRole("heading", {
      level: 1,
      name: /Encontre o café perfeito para qualquer hora do dia/i,
    });
    screen.getByRole("heading", { level: 2, name: /Nossos cafés/i });
    await screen.findByText(/Error ao tentar carregar os dados/i);
  });

  test("should reload page when clicked button Recarregar", async () => {
    const mockReload = jest.fn();
    const spyLocation = jest.spyOn(window, "location", "get");
    spyLocation.mockImplementation(
      () =>
        ({
          reload: mockReload,
        } as unknown as Location)
    );
    const user = userEvent.setup();
    mockApi.onGet("/coffees/").replyOnce(200, undefined);
    render(<Home />, { wrapper });
    const buttonReload = await screen.findByRole("button", {
      name: /Recarregar/i,
    });

    await user.click(buttonReload);

    expect(mockReload).toHaveBeenCalledTimes(1);
    spyLocation.mockRestore();
  });

  test("should showing loadCards ui when data is fetching", async () => {
    mockApi.onGet("/coffees/").replyOnce(200, { coffees: defaultResponse });
    render(<Home />, { wrapper });
    screen.getByRole("heading", {
      level: 1,
      name: /Encontre o café perfeito para qualquer hora do dia/i,
    });
    screen.getByRole("heading", { level: 2, name: /Nossos cafés/i });
    const loadingCards = await screen.findAllByRole("heading", {
      level: 3,
      name: /Expresso Tradicional/i,
    });
    expect(loadingCards).toHaveLength(8);
  });

  test("should showing not found custom ui when data is not found", async () => {
    mockApi.onGet("/coffees/").replyOnce(200, { coffees: [] });
    render(<Home />, { wrapper });
    screen.getByRole("heading", {
      level: 1,
      name: /Encontre o café perfeito para qualquer hora do dia/i,
    });
    screen.getByRole("heading", { level: 2, name: /Nossos cafés/i });
    await screen.findByText(/Nem um dado foi encontrado/i);
  });

  test("should refetch request when clicked in other filter", async () => {
    const user = userEvent.setup();
    mockApi.onGet("/coffees/").replyOnce(200, { coffees: defaultResponse });
    mockApi.onGet("/coffees/tradicional").reply(200, {
      coffees: [
        ...defaultResponse,
        {
          id: "3",
          name: "Coffee 3",
          slugs: ["coffee-3"],
          tags: ["coffee", "hot"],
          image: "coffee-3.png",
          description: "Coffee 3 description",
          price: "10.00",
        },
      ],
    });
    render(<Home />, { wrapper });
    const allCoffeeCards = await screen.findAllByRole("heading", {
      level: 3,
      name: /coffee/i,
    });
    expect(allCoffeeCards).toHaveLength(2);
    const buttonFilter = screen.getByRole("button", {
      name: /Tradicional/i,
    });

    await user.click(buttonFilter);

    const filterCoffeeCards = await screen.findAllByRole("heading", {
      level: 3,
      name: /coffee/i,
    });
    expect(filterCoffeeCards).toHaveLength(3);
  });
});
