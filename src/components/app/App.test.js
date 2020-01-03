import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from './';

test('full app rendering/navigating', () => {
  const history = createMemoryHistory();
  const { getByTestId, getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByTestId('app')).toBeInTheDocument();
});

test('renders the header component', () => {
  const history = createMemoryHistory();
  const { getByTestId, getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByTestId('comp-header')).toBeInTheDocument();
});

test('renders the home page', () => {
  const history = createMemoryHistory();
  const { getByTestId, getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByTestId('page-home')).toBeInTheDocument();
});

test('renders the sign up page', () => {
  const history = createMemoryHistory();
  const { getByTestId, getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  fireEvent.click(getByText(/Sign Up/i));
  expect(getByTestId('page-signup')).toBeInTheDocument();
});

test('renders the sign in page', () => {
  const history = createMemoryHistory();
  const { getByTestId, getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  fireEvent.click(getByText(/Sign In/i));
  expect(getByTestId('page-signin')).toBeInTheDocument();
});

test('renders the forgot password page', () => {
  const history = createMemoryHistory();
  const { getByTestId, getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  fireEvent.click(getByText(/Sign In/i));
  fireEvent.click(getByText(/Forgot your password/i));
  expect(getByTestId('page-forgot-password')).toBeInTheDocument();
});

test('landing on a bad page shows 404 page', () => {
  const history = createMemoryHistory();
  history.push('/some/bad/route');
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByText(/Oops, that page doesn't seem to exist./i)).toBeInTheDocument();
});
