import { StyledShop, StyledShopList } from './styles';
import { useRef } from 'react';
import { IntroSection } from './components/intro-section';
import { CoffeeCard } from './components/coffee-card';
import { ShoppingFilter } from './components/shopping-filter';
import { Button } from '@components/button';
import { requestCoffees } from './service/get-coffees';
import { useQuery } from '@tanstack/react-query';

export function Home() {
    const queryRef = useRef('');
    const { data, isError, isFetching, refetch } = useQuery({
        queryKey: ['coffees', queryRef.current],
        queryFn: async () => await requestCoffees(queryRef.current),
    });

    function handleSetQueryFilter(filter: string) {
        queryRef.current = filter;
        refetch();
    }

    function handleReloadPage() {
        window.location.reload();
    }

    return (
        <main>
            <IntroSection />

            <StyledShop>
                <ShoppingFilter
                    handleSetQueryFilter={handleSetQueryFilter}
                    query={queryRef.current}
                />

                {data && data.length > 0 && (
                    <StyledShopList>
                        {data.map((coffee) => {
                            return <CoffeeCard key={coffee.id} coffeeData={coffee} />;
                        })}
                    </StyledShopList>
                )}
                {!data && isFetching && (
                    <p>
                        <h3>Carregando...</h3>
                        <span>
                            Atenção o banco de dados poderá estar inativo, recomenda-se esperar no
                            mínimo 30s.
                        </span>
                    </p>
                )}
                {isError && (
                    <div className="request-error">
                        <p>Error ao tentar carregar os dados.</p>
                        <Button title="recarregar a pagina" onClick={handleReloadPage}>
                            Recarregar
                        </Button>
                    </div>
                )}
                {data && data.length === 0 && <p>Nem um dado foi encontrado.</p>}
            </StyledShop>
        </main>
    );
}
