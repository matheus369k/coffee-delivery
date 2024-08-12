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

    useEffect(() => {
        api.get('/coffees').then((response) => {
            setCoffeeDatas(response.data['coffees']);
        });
    }, []);

    return (
        <main>
            <IntroSection />

            <StyledShop>
                <ShoppingFilter />

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
