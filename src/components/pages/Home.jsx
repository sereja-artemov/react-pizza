import React, { useState, useEffect } from 'react';
import Categories from '../Categories';
import Sort from '../Sort';
import Skeleton from '../PizzaCard/Skeleton';
import PizzaCard from '../PizzaCard';

function Home() {
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPizzaItems();
  }, []);

  function getPizzaItems() {
    setIsLoading(true);
    fetch('https://63767267b5f0e1eb850c0eef.mockapi.io/items')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Упс, что-то сломалось');
        }
        return res.json();
      })
      .then((data) => {
        setPizzaItems(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzaItems.map((pizza) => <PizzaCard key={pizza.id} {...pizza} />)}
      </div>
    </>
  );
}

export default Home;
