import React, { useEffect, useState } from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Sort from './components/Sort';
import Categories from './components/Categories';
import PizzaCard from './components/PizzaCard';
import Skeleton from './components/PizzaCard/Skeleton';

function App() {
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPizzaItems();
  }, []);

  function getPizzaItems() {
    fetch('https://63767267b5f0e1eb850c0eef.mockapi.io/items')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Упс, что-то сломалось');
        }
        return res.json();
      })
      .then((data) => setPizzaItems(data))
      .catch((err) => console.log(err));
  }

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? pizzaItems.map((pizza) => <PizzaCard key={pizza.id} {...pizza} />)
              : [...new Array(6)].map((_, index) => <Skeleton key={index} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
