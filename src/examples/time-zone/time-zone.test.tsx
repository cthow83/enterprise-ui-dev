import { test, expect, vi } from 'vitest';
import { render, screen } from 'test/utilities';
import TimeZone from '.';

test('it should render successfully', () => {
  render(<TimeZone />);
});

test('should match the snapshot', async () => {
  render(<TimeZone />);
  expect(screen.getByTestId('current-time').textContent).toMatch(/^\d{13}$/);
});
