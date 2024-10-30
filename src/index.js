import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Tạo một chủ đề mặc định (có thể tùy chỉnh theo nhu cầu)
const theme = createTheme({
  palette: {
    brownGold: {
      main: '#7b4302', // Màu nâu vàng
    },
    reviewColor: {
      main: '#93333b',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();