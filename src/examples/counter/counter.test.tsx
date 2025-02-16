// @vitest-environment happy-dom

import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';

test('it should render the component', () => {
  render(<Counter />);
  expect(screen.getByTestId('current-count').textContent).toEqual('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const user = userEvent.setup();
  render(<Counter />);
  screen.debug();
  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });
  expect(currentCount.textContent).toEqual('0');
  await user.click(incrementButton);
  await user.keyboard('{enter}');
  expect(currentCount.textContent).toEqual('2');
});
