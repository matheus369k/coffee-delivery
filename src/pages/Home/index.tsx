import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react';
import introImage from '@assets/into-Imagem.svg';
import coffeeImage from '@assets/coffee.png';
import { StyledHomeIntro, StyledHomeShopList } from './styles';

export function Home() {
    return (
        <main>
            <StyledHomeIntro>
                <div>
                    <h1>Encontre o café perfeito para qualquer hora do dia</h1>
                    <span>Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora</span>
                    <ul>
                        <li>
                            <i id="cart">
                                <ShoppingCart size={16} weight="fill" />
                            </i>
                            <p>Compra simples e segura</p>
                        </li>
                        <li>
                            <i id="box">
                                <Package size={16} weight="fill" />
                            </i>
                            <p>Embalagem mantém o café intacto</p>
                        </li>
                        <li>
                            <i id="timer">
                                <Timer size={16} weight="fill" />
                            </i>
                            <p>Entrega rápida e rastreada</p>
                        </li>
                        <li>
                            <i id="coffee">
                                <Coffee size={16} weight="fill" />
                            </i>
                            <p>O café chega fresquinho até você</p>
                        </li>
                    </ul>
                </div>
                <img src={introImage} />
            </StyledHomeIntro>
            <StyledHomeShopList>
                <div>
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
                </div>
                <ul>
                    {Array.from({ length: 14 }).map((_, index) => {
                        return (
                            <li key={index}>
                                <img src={coffeeImage} alt="" />
                                <span>Tradicional</span>
                                <h3>Expresso Tradicional</h3>
                                <p>O tradicional café feito com água quente e grãos moídos</p>
                                <div>
                                    <span>9,90</span>
                                    <form action="">
                                        <input type="number" value={1} />
                                        <button type="button">
                                            <ShoppingCart size={22} weight="fill" />
                                        </button>
                                    </form>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </StyledHomeShopList>
        </main>
    );
}
