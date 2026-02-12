import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './utils/store';
import App from './App';

test('renders app component', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const appElement = document.querySelector('.App');
  expect(appElement).toBeInTheDocument();
});
