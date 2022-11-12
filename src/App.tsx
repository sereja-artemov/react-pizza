import React from 'react';
import './scss/app.scss';
// @ts-ignore
import Header from './components/Header';
import Sort from './components/Sort';
import Categories from './components/Categories';
import PizzaCard from './components/PizzaCard';
import pizzaItems from './assets/pizzas.json';

function App() {
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
