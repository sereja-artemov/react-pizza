import React from 'react';
import style from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => (
  <div className={style.root}>
    <span>🙁</span>
    <h2 className={style.testClass}>Ничего не найдено</h2>
    <p>Неверно введен адрес или со страницей что-то случилось</p>
  </div>
);

export default NotFoundBlock;
