import { api } from "@/lib/api";
import { env } from "@/env";
import axios from "axios";

export interface coffeeDatasType {
  id: string;
  name: string;
  slugs: string[];
  tags: string[];
  image: string;
  description: string;
  price: string;
}

export interface GetCoffeesPropsType {
  query: string;
}

export async function requestCoffees(query = "") {
  try {
    let result;
    const apiPath = `/coffees/${query}`;

    if (!query) {
      result = await Promise.race([
        axios.get(env.VITE_GH_API_URL),
        api.get(apiPath),
      ]);
    } else {
      result = await api.get(apiPath);
    }

    if (!result.data) {
      throw new Error("not-found datas");
    }

    if (result.data["coffees"]) {
      return result.data["coffees"] as coffeeDatasType[];
    }

    return result.data as coffeeDatasType[];
  } catch (error) {
    console.log((error as Error).message);
  }
}
