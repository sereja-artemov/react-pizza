import React, { useState, useEffect } from 'react';
import Categories from '../Categories';
import Sort from '../Sort';
import Skeleton from '../PizzaCard/Skeleton';
import PizzaCard from '../PizzaCard';

function Home({searchValue}) {
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  useEffect(() => {
    getPizzaItems();
  }, [categoryId, sortType]);

  function getPizzaItems() {
    setIsLoading(true);
    fetch(
      `https://63767267b5f0e1eb850c0eef.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty.replace('-', '')}&order=${
        sortType.sortProperty.includes('-') ? 'asc' : 'desc'
      }`
    )
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

  const pizzas = pizzaItems.filter((pizza) => {
    if (pizza.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  }).map((pizza) => <PizzaCard key={pizza.id} {...pizza} />);
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onClick={setCategoryId} />
        <Sort sortType={sortType} setSortType={setSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? skeleton
          : pizzas }
      </div>
    </>
  );
}

export default Home;
