import { StyledShop, StyledShopList } from './styles';
import { useState } from 'react';
import { IntroSection } from './intro-section';
import { CoffeeCard } from './coffee-card';
import { ShoppingFilter } from './shopping-filter';
import { Button } from '@components/button';
import { GetCoffees } from './hooks/get-coffees';

export function Home() {
    const [query, setQuery] = useState('');
    const { coffeeDatas, responseStatus, setResponseStatus } = GetCoffees({ query });

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
