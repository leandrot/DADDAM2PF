import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './MainApp';

if (document.getElementById('app')) {
  const root = ReactDOM.createRoot(document.getElementById('app'));
  root.render(
    <React.StrictMode>
      <MainApp />
    </React.StrictMode>
  );
}
