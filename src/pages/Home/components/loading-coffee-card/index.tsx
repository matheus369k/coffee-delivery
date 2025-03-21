import { StyledLoadingCoffeeCard } from './styles';

export function LoadingCoffeeCard() {
    return (
        <StyledLoadingCoffeeCard>
            <span className="image" />
            <div>
                <span>Tradicional</span>
            </div>
            <h3>Expresso Tradicional</h3>
            <p>O tradicional café feito com água quente e grãos moídos</p>
            <div>
                <span>9.90</span>
                <form>
                    <div>
                        <input type="number" value="1" name="count" />
                    </div>
                    <button type="submit" title="add to cart"></button>
                </form>
            </div>
        </StyledLoadingCoffeeCard>
    );
}
