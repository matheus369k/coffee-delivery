import { api } from '@/lib/api';
import { env } from '@/env';
import axios from 'axios';

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

export async function requestCoffees(query: string) {
  try {
    let result: coffeeDatasType[] | [];
    const apiPath = `/coffees/${query}`;

    if (!query) {
      result = await Promise.race([
        (await axios.get(env.VITE_GH_API_URL)).data,
        (await api.get(apiPath)).data['coffees'],
      ]);
    } else {
      result = (await api.get(apiPath)).data['coffees'];
    }

    if (!result || result.length === 0) {
      throw new Error('not-found datas');
    }

    return result;
  } catch (error) {
    console.log((error as Error).message);
    return [];
  }
}
