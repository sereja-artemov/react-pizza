import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const FullPizza: React.FC = () => {
  const { id } = useParams();
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
      try {
        const { data } = await axios.get(
          `https://63767267b5f0e1eb850c0eef.mockapi.io/items/${id}`
        );
        setPizzaData(data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
      }
    }

    getPizzaData();
  }, []);

  return (
    <div className="container">
      <img src={pizzaData.imageUrl} alt={pizzaData.title} />
      <h2>{pizzaData.title}</h2>
      <span>{pizzaData.price} ₽</span>
      <br/>
      <Link to='/' >
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>

    </div>
  );
};

export default FullPizza;
