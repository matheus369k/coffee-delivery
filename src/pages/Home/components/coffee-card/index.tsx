import { StyledCoffeeCard } from './styles';
import { CoffeeCardForm } from './form';

interface CoffeeCardProps {
  coffeeData: {
    id: string;
    name: string;
    tags: string[];
    image: string;
    description: string;
    price: string;
  };
}

export function CoffeeCard({ coffeeData }: CoffeeCardProps) {
  return (
    <StyledCoffeeCard>
      <img src={coffeeData.image} alt="" loading="lazy" />
      <div>
        {coffeeData.tags.map((tag) => {
          return <span key={tag}>{tag}</span>;
        })}
      </div>
      <h3>{coffeeData.name}</h3>
      <p>{coffeeData.description}</p>
      <div>
        <span>{coffeeData.price}</span>
        <CoffeeCardForm {...coffeeData} />
      </div>
    </StyledCoffeeCard>
  );
}
