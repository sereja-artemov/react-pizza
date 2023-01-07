import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import {useNavigate} from 'react-router-dom';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort, { sortListArr } from '../components/Sort';
import Skeleton from '../components/PizzaCard/Skeleton';
import PizzaCard from '../components/PizzaCard';
import Pagination from '../components/Pagination/Pagination';
import {fetchPizzas, selectPizzaData} from '../redux/slices/pizzaSlice';
import {useAppDispatch} from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzaData);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  function onChangeCategory(id: number) {
    dispatch(setCategoryId(id));
  }

  function onChangePage(number: number) {
    dispatch(setCurrentPage(number));
  }

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    if (!isSearch.current) {
      getPizzaItems();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  //Если был первый рендер, то проверяем параметры из URL и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortListArr.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      // @ts-ignore
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  //Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const string = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${string}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  async function getPizzaItems() {

    dispatch(
      fetchPizzas({
        currentPage,
        categoryId,
        searchValue,
        sort,
      })
    );
  }

  const pizzas = items.map((pizza: any) => (

      <PizzaCard {...pizza} key={pizza.id} />

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
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeleton : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
