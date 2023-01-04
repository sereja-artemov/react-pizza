import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

function FullPizza() {
  const { id } = useParams();
  const [pizzaData, setPizzaData] = useState({});

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
        const { data } = await axios.get(`https://63767267b5f0e1eb850c0eef.mockapi.io/items/${id}`);
        setPizzaData(data);
      } catch (error) {
        alert('Ошибка при получении пиццы!')
      }
    }
    getPizzaData();
  }, [])

  return (
    <div className="container">
      <img src={pizzaData.imageUrl} alt={pizzaData.title} />
      <h2>{pizzaData.title}</h2>
      <span>{pizzaData.price} ₽</span>
    </div>
  );
}

export default FullPizza;