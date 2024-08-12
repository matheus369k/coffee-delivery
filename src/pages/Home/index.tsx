import { StyledShop, StyledShopList } from './styles';
import { useEffect, useState } from 'react';
import { IntroSection } from './intro-section';
import { CoffeeCard } from './coffee-card';
import { api } from '@/lib/api';
import { ShoppingFilter } from './shopping-filter';

interface coffeeDatasType {
    id: string;
    name: string;
    tags: string[];
    image: string;
    description: string;
    price: string;
}

export function Home() {
    const [coffeeDatas, setCoffeeDatas] = useState<coffeeDatasType[] | undefined>();
    const [query, setQuery] = useState('');

    useEffect(() => {
        api.get(`/coffees/${query}`).then((response) => {
            setCoffeeDatas(response.data['coffees']);
        });
    }, [query]);

    function handleSetQueryFilter(filter: string) {
        setQuery(filter);
    }

    return (
        <main>
            <IntroSection />

            <StyledShop>
                <ShoppingFilter handleSetQueryFilter={handleSetQueryFilter} query={query} />

                {coffeeDatas ? (
                    <StyledShopList>
                        {coffeeDatas.map((coffeeData) => {
                            return <CoffeeCard key={coffeeData.id} coffeeData={coffeeData} />;
                        })}
                    </StyledShopList>
                ) : (
                    <p>Carregando...</p>
                )}
            </StyledShop>
        </main>
    );
}
