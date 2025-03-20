import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';
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

export type ResponseStatusType = 'loading' | 'complete' | 'error' | 'not-found';

export interface GetCoffeesPropsType {
    query: string;
}

export function GetCoffees({ query }: GetCoffeesPropsType) {
    const [coffeeDatas, setCoffeeDatas] = useState<coffeeDatasType[]>([]);
    const [responseStatus, setResponseStatus] = useState<ResponseStatusType>('loading');

    async function requestCoffees(query: string) {
        try {
            let data;

            if (!query) {
                data = await Promise.race([
                    (await api.get(`/coffees/${query}`)).data['coffees'],
                    (await axios.get(env.VITE_GH_API_URL)).data,
                ]);
            } else {
                data = (await api.get(`/coffees/${query}`)).data['coffees'];
            }

            if (!data) {
                throw new Error('data not found');
            }

            setCoffeeDatas(data);

            if (data.length === 0) {
                return setResponseStatus('not-found');
            }

            setResponseStatus('complete');
        } catch (_) {
            setResponseStatus('error');
        }
    }

    useEffect(() => {
        requestCoffees(query);
    }, [query]);

    return {
        coffeeDatas,
        responseStatus,
        setResponseStatus,
    };
}
