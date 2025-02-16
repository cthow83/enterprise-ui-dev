// @vitest-environment happy-dom

import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';

const setup = ({ initialCount }: { initialCount?: number } = {}) => {
  render(<Counter initialCount={initialCount} />);
  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });
  const resetButton = screen.getByRole('button', { name: 'Reset' });
  const user = userEvent.setup();
  return { user, currentCount, incrementButton, resetButton };
};

test('it should render the component', () => {
  const { currentCount } = setup();
  expect(currentCount.textContent).toEqual('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user, currentCount, incrementButton } = setup();
  await user.click(incrementButton);
  expect(currentCount.textContent).toEqual('1');
});

test('it should render the component with an initial count', () => {
  const { currentCount } = setup({ initialCount: 400 });
  expect(currentCount.textContent).toEqual('400');
});

test('it should reset the count when the "Reset" button is pressed', async () => {
  const { user, currentCount, resetButton } = setup({ initialCount: 400 });
  expect(currentCount.textContent).toEqual('400');
  await user.click(resetButton);
  expect(currentCount.textContent).toEqual('0');
});
