import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { loadAssetsMap } from './helpers';
import GameLoader from './components/GameLoader';
import './index.css';

loadAssetsMap().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <GameLoader>
        <App />
      </GameLoader>
    </React.StrictMode>
  );
});
