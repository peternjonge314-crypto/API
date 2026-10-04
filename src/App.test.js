import { render, screen } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

test('loads and displays people from the directory API', async () => {
  axios.get.mockResolvedValue({
    data: [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'leanne@example.com',
        company: { name: 'Romaguera-Crona' },
      },
    ],
  });

  render(<App />);

  expect(screen.getByRole('status')).toHaveTextContent(/finding your people/i);
  expect(await screen.findByRole('heading', { name: 'Leanne Graham' })).toBeInTheDocument();
  expect(screen.getByText('leanne@example.com')).toHaveAttribute(
    'href',
    'mailto:leanne@example.com',
  );
});
