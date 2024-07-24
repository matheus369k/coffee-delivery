import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react';
import introImage from '@assets/into-Imagem.svg';
import { StyledIntroSection } from './styles';

export function IntroSection() {
    return (
        <StyledIntroSection>
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
        </StyledIntroSection>
    );
}
