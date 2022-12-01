import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaCard/Skeleton';
import PizzaCard from '../components/PizzaCard';
import Pagination from '../components/Pagination/Pagination';
import { searchContext } from '../App';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = useContext(searchContext);

  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function onChangeCategory(id) {
    dispatch(setCategoryId(id));
  }

  function onChangePage(number) {
    dispatch(setCurrentPage(number));
  }

  useEffect(() => {
    getPizzaItems();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    const string = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    });

    navigate(`?${string}`);
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  function getPizzaItems() {
    setIsLoading(true);
    axios
      .get(
        `https://63767267b5f0e1eb850c0eef.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sort.sortProperty.replace('-', '')}&order=${
          sort.sortProperty.includes('-') ? 'asc' : 'desc'
        }${searchValue ? `&search=${searchValue}` : ''}`
      )
      .then((res) => {
        setPizzaItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const pizzas = pizzaItems.map((pizza) => (
    <PizzaCard key={pizza.id} {...pizza} />
  ));
  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onClick={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
}

export default Home;
