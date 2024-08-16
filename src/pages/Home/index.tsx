import { StyledShop, StyledShopList } from './styles';
import { useEffect, useState } from 'react';
import { IntroSection } from './intro-section';
import { CoffeeCard } from './coffee-card';
import { api } from '@/lib/api';
import { ShoppingFilter } from './shopping-filter';
import { Button } from '@/components/button';

interface coffeeDatasType {
    id: string;
    name: string;
    slugs: string[];
    tags: string[];
    image: string;
    description: string;
    price: string;
}

type ResponseStatusType = 'loading' | 'complete' | 'error' | 'not-found';

export function Home() {
    const [coffeeDatas, setCoffeeDatas] = useState<coffeeDatasType[]>([]);
    const [responseStatus, setResponseStatus] = useState<ResponseStatusType>('loading');
    const [query, setQuery] = useState('');

    useEffect(() => {
        api.get(`/coffees/${query}`)
            .then((response) => {
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

    function handleSetQueryFilter(filter: string) {
        setResponseStatus('loading');

        setQuery(filter);
    }

    function handleReloadPage() {
        window.location.reload();
    }

    return (
        <main>
            <IntroSection />

            <StyledShop>
                <ShoppingFilter handleSetQueryFilter={handleSetQueryFilter} query={query} />

                {responseStatus === 'complete' && (
                    <StyledShopList>
                        {coffeeDatas.map((coffeeData) => {
                            return <CoffeeCard key={coffeeData.id} coffeeData={coffeeData} />;
                        })}
                    </StyledShopList>
                )}
                {responseStatus === 'loading' && <p>Carregando...</p>}
                {responseStatus === 'error' && (
                    <div className="request-error">
                        <p>Error ao tentar carregar os dados.</p>
                        <Button title="recarregar a pagina" onClick={handleReloadPage}>
                            Recarregar
                        </Button>
                    </div>
                )}
                {responseStatus === 'not-found' && <p>Nem um dado foi encontrado.</p>}
            </StyledShop>
        </main>
    );
}
