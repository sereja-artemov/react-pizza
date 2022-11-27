import React, { createContext, useState } from 'react';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import Cart from './components/pages/Cart';

export const searchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <searchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </searchContext.Provider>
    </div>
  );
}

export default App;
