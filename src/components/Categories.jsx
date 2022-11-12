import React, { useState } from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const pizzaCategories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  function handleClickCategory(index) {
    setActiveIndex(index);
  }

  return (
    <div className="categories">
      <ul>
        {pizzaCategories.map((category, index) => (
          <li key={index} onClick={() => handleClickCategory(index)}
              className={activeIndex === index ? 'active' : ''}>{category}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
