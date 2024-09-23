import { render, screen } from '@testing-library/react';
import App from './index';

test('renders learn react link', () => {
  render(<App />);
  const text = screen.getByText(/Hello, i'm test component/i);
  expect(text).toBeInTheDocument();
});
