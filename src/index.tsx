import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import App from './app';


const root = createRoot(document.getElementById('app-root'));
root.render(<App />);
