import { StyledShop, StyledShopFilter, StyledShopList } from './styles';
import { useEffect, useState } from 'react';
import { IntroSection } from './intro-section';
import { CoffeeCard } from './coffee-card';
import { api } from '@/lib/api';

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
                            <li>
                                <button type="button">Tradicional</button>
                            </li>
                            <li>
                                <button type="button">especial</button>
                            </li>
                            <li>
                                <button type="button">com leite</button>
                            </li>
                            <li>
                                <button type="button">alcoólico</button>
                            </li>
                            <li>
                                <button type="button">gelado</button>
                            </li>
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
                    <p>loading...</p>
                )}
            </StyledShop>
        </main>
    );
}
