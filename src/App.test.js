import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the header navigation', () => {
  render(<App />);
  const linkElement = screen.getByRole('link', { name: 'Solutions' });
  expect(linkElement).toBeInTheDocument();
});
