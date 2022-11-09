import React from 'react';
import './scss/app.scss';
// @ts-ignore
import Header from './components/Header';
import Sort from './components/Sort';
import Categories from './components/Categories';
import PizzaCard from './components/PizzaCard';

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
            <PizzaCard title="Мексиканская" price={500} />
            <PizzaCard title="Итальянская" price={600} />
            <PizzaCard title="Европейская" price={550} />

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
