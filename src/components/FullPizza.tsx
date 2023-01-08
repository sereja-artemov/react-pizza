import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Skeleton from "./PizzaCard/Skeleton/Skeleton";

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [pizzaData, setPizzaData] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>({
    imageUrl: '',
    title: '',
    price: 0,
  });

  useEffect(() => {
    // axios.get(`https://63767267b5f0e1eb850c0eef.mockapi.io/items/${id}`)
    //   .then((res) => {
    //     setPizzaData(res.data);
    //   })
    //   .catch((err) => {
    //     alert('Ошибка при получении пиццы!')
    //   })
    async function getPizzaData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://63767267b5f0e1eb850c0eef.mockapi.io/items/${id}`
        );
        setPizzaData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        alert('Ошибка при получении пиццы!');
      }
    }

    getPizzaData();
  }, []);

  const skeleton = (
    <Skeleton width={1100} height={520} viewBox='0 0 1100 520' >
      <rect x="383" y="430" rx="11" ry="11" width="337" height="40" />
      <rect x="501" y="493" rx="6" ry="6" width="98" height="20" />
      <circle cx="550" cy="207" r="200" />
    </Skeleton>
  );

  return (
    <section className="fullPizza">
      <div className="fullPizza__content-wrapper">
        { isLoading ? skeleton : (
          <>
            <img className="fullPizza__image" src={pizzaData.imageUrl} alt={pizzaData.title} />
            <h2 className="fullPizza__title">{pizzaData.title}</h2>
            <span className="fullPizza__price">{pizzaData.price} ₽</span>
          </>
        ) }
      </div>
      <br/>
      <Link to='/' >
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </section>
  );
};

export default FullPizza;
