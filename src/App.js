import React, {useEffect, useState} from 'react';
import './scss/app.scss';
// @ts-ignore
import Header from './components/Header';
import Sort from './components/Sort';
import Categories from './components/Categories';
import PizzaCard from './components/PizzaCard';

function App() {
  const [pizzaItems, setPizzaItems] = useState([]);

  useEffect(() => {
    getPizzaItems()
  }, [])

  function getPizzaItems() {
    fetch('https://63767267b5f0e1eb850c0eef.mockapi.io/items')
      .then(res => {
        if (!res.ok) {
          throw new Error('Упс, что-то сломалось')
        }
        return res.json()
      })
      .then(data => setPizzaItems(data))
      .catch(err => console.log(err))
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
            {pizzaItems.map((pizza) => (
            <PizzaCard
              key={pizza.id}
              {...pizza}
            />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
