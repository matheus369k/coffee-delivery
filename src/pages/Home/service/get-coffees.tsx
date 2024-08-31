import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';

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

    useEffect(() => {
        api.get(`/coffees/${query}`)
            .then((response: { data: { [x: string]: coffeeDatasType[] | undefined } }) => {
                const data: coffeeDatasType[] | undefined = response.data['coffees'];

                if (!data) {
                    throw new Error('data not found');
                }

                setCoffeeDatas(data);

                if (data.length === 0) {
                    return setResponseStatus('not-found');
                }

                setResponseStatus('complete');
            })
            .catch(() => {
                setResponseStatus('error');
            });
    }, [query]);

    return {
        coffeeDatas,
        responseStatus,
        setResponseStatus,
    };
}
