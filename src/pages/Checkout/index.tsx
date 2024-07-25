import { Trash } from '@phosphor-icons/react';
import coffeeImage from '@assets/coffee.png';
import { StylesListCoffee, StylesForm } from './styles';
import { FormUser } from './form-user';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const FormUserZodSchema = z.object({
    cep: z.coerce.number().min(8),
    street: z.string().min(4),
    number: z.coerce.number().min(1),
    complement: z.string().min(4),
    neighborhood: z.string().min(4),
    city: z.string().min(4),
    uf: z.string().min(2),
});

type FormUseType = z.infer<typeof FormUserZodSchema>;

export function Checkout() {
    const hookForm = useForm<FormUseType>({
        resolver: zodResolver(FormUserZodSchema),
    });

    const { handleSubmit } = hookForm;

    function handleFormUser(data: FormUseType) {
        console.log(data);
    }

    return (
        <main>
            <StylesForm onSubmit={handleSubmit(handleFormUser)}>
                <FormProvider {...hookForm}>
                    <FormUser />
                </FormProvider>

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
