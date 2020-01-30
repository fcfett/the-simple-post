import React from 'react';
import './styles.scss';

import Store from '../store';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

export default () => (
  <div id="app">
    <Store>
      <Header />
      <Main />
      <Footer />
    </Store>
  </div>
);
