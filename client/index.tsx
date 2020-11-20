import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MainApp from '@/apps/MainApp';

const appRoot: HTMLElement | null = document.getElementById('app-root');

if (!appRoot) {
  throw new Error('App root does not exist!');
}

ReactDOM.render(
  <BrowserRouter>
    <MainApp />
  </BrowserRouter>,
  appRoot,
);
