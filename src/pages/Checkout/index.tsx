import { Bank, CreditCard, CurrencyDollar, MapPin, Money, Trash } from '@phosphor-icons/react';
import coffeeImage from '@assets/coffee.png';
import { StylesDatasUser, StylesListCoffee, StylesForm, StyledAddressUser, StylesPayFormat } from './styles';

export function Checkout() {
    return (
        <main>
            <StylesForm>
                <StylesDatasUser>
                    <h3>Complete seu pedido</h3>
                    <StyledAddressUser>
                        <div>
                            <MapPin size={22} />
                            <p>
                                <span>Endereço de Entrega</span>
                                <span>Informe o endereço onde deseja receber seu pedido</span>
                            </p>
                        </div>
                        <form>
                            <input type="text" id="cep" placeholder="CEP" />
                            <input type="text" id="street" placeholder="Rua" />
                            <input type="number" id="number" placeholder="Número" />
                            <input type="text" id="complement" placeholder="Complemento" />
                            <input type="text" id="neighborhood" placeholder="Bairro" />
                            <input type="text" id="city" placeholder="Cidade" />
                            <input type="text" id="uf" placeholder="UF" />
                        </form>
                    </StyledAddressUser>
                    <StylesPayFormat>
                        <div>
                            <CurrencyDollar size={22} />
                            <p>
                                <span>Pagamento</span>
                                <span>O pagamento é feito na entrega. Escolha a forma que deseja pagar</span>
                            </p>
                        </div>
                        <ul>
                            <li>
                                <button type="button">
                                    <CreditCard size={16} />
                                    <span>Cartão de crédito</span>
                                </button>
                            </li>
                            <li>
                                <button type="button">
                                    <Bank size={16} />
                                    <span>cartão de débito</span>
                                </button>
                            </li>
                            <li>
                                <button type="button">
                                    <Money size={16} />
                                    <span>dinheiro</span>
                                </button>
                            </li>
                        </ul>
                    </StylesPayFormat>
                </StylesDatasUser>
                <StylesListCoffee>
                    <h3>Cafés selecionados</h3>
                    <ul>
                        {Array.from({ length: 2 }).map((_, index) => {
                            return (
                                <li key={index}>
                                    <img src={coffeeImage} alt="" />
                                    <div>
                                        <h4>Expresso Tradicional</h4>
                                        <form action="">
                                            <input type="number" value={1} />
                                            <button type="button">
                                                <Trash size={16} />
                                                <span>Remover</span>
                                            </button>
                                        </form>
                                    </div>
                                    <span>9,90</span>
                                </li>
                            );
                        })}
                    </ul>
                    <div>
                        <p>
                            <span>Total de itens</span>
                            <span>R$ 29,70</span>
                        </p>
                        <p>
                            <span>Entrega</span>
                            <span>R$ 3,50</span>
                        </p>
                        <p>
                            <span>Total</span>
                            <span>R$ 33,20</span>
                        </p>
                        <button type="submit">confirmar pedido</button>
                    </div>
                </StylesListCoffee>
            </StylesForm>
        </main>
    );
}
