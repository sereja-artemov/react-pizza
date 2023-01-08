import React, {useCallback, useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/filter/slices';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort, { sortListArr } from '../components/Sort';
import Skeleton from '../components/PizzaCard/Skeleton/Skeleton';
import PizzaCard from '../components/PizzaCard';
import Pagination from '../components/Pagination/Pagination';
import {fetchPizzas} from '../redux/pizza/slices';
import {useAppDispatch} from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzaData);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

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
    <Skeleton key={index} width={320} height={480} viewBox='0 0 280 480' >
      <circle cx="140" cy="125" r="125" />
      <rect x="105" y="331" rx="0" ry="0" width="1" height="0" />
      <rect x="0" y="295" rx="11" ry="11" width="280" height="31" />
      <rect x="0" y="346" rx="11" ry="11" width="280" height="59" />
      <rect x="0" y="434" rx="11" ry="11" width="95" height="35" />
      <rect x="125" y="427" rx="20" ry="20" width="152" height="45" />
    </Skeleton>
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
