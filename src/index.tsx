import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import './index.scss';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
      <App />
    </BrowserRouter>,
  );
}
