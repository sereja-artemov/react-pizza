import React from 'react';
import cartImg from '../assets/img/empty-cart.png';
import { Link } from "react-router-dom";

const ArtEmpty: React.FC = () => (
  <div className="content">
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>
          Корзина пустая <span>😕</span>
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br/>
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={cartImg} alt="Empty cart"/>
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  </div>
);

export default ArtEmpty;
