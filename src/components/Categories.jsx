import React from 'react';

function Categories({ categoryId, onClick: setCategoryId }) {
  const pizzaCategories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  function handleClickCategory(index) {
    setCategoryId(index);
  }

  return (
    <div className="categories">
      <ul>
        {pizzaCategories.map((category, index) => (
          <li key={index} onClick={() => handleClickCategory(index)}
              className={categoryId === index ? 'active' : ''}>{category}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
