import { StyledShop, StyledShopFilter, StyledShopList } from './styles';
import { useEffect, useState } from 'react';
import { IntroSection } from './intro-section';
import { CoffeeCard } from './coffee-card';
import { api } from '@/lib/api';
import { ShopFilterRow } from './shop-filter-row';

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
                <StyledShopFilter>
                    <h2>Nossos cafés</h2>
                    <nav>
                        <ul>
                            <ShopFilterRow text="Tradicional" />
                            <ShopFilterRow text="especial" />
                            <ShopFilterRow text="com leite" />
                            <ShopFilterRow text="alcoólico" />
                            <ShopFilterRow text="gelado" />
                        </ul>
                    </nav>
                </StyledShopFilter>
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
