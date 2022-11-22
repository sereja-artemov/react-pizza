import React from 'react';
import style from './NotFoundBlock.module.scss';

function NotFoundBlock() {
  return (
    <div className={style.root}>
      <span>🙁</span>
      <h2>Ничего не найдено</h2>
      <p>Неверно введен адрес или со страницей что-то случилось</p>
    </div>
  );
}

export default NotFoundBlock;
