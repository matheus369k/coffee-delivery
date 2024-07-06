import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react';
import introImage from '@assets/into-Imagem.svg';

export function Home() {
    return (
        <main>
            <div>
                <div>
                    <h1>Encontre o café perfeito para qualquer hora do dia</h1>
                    <span>Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora</span>
                    <ul>
                        <li>
                            <ShoppingCart size={22} weight="fill" />
                            <p>Compra simples e segura</p>
                        </li>
                        <li>
                            <Timer size={32} weight="fill" />
                            <p>Entrega rápida e rastreada</p>
                        </li>
                        <li>
                            <Package size={32} weight="fill" />
                            <p>Embalagem mantém o café intacto</p>
                        </li>
                        <li>
                            <Coffee size={32} weight="fill" />
                            <p>O café chega fresquinho até você</p>
                        </li>
                    </ul>
                </div>
                <img src={introImage} />
            </div>
            <div>
                <h2>Nossos cafés</h2>
                <ul>
                    {Array.from({ length: 14 }).map((_, index) => {
                        return (
                            <li key={index}>
                                <img />
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
            </div>
        </main>
    );
}
