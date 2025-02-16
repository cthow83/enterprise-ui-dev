import { render, screen, within } from 'test/utilities';
import userEvent from '@testing-library/user-event';
import PackingList from '.';
import { checkPrime } from 'node:crypto';

const setup = () => {
  const user = userEvent.setup();
  render(<PackingList />);
  const newItemInputField = screen.getByPlaceholderText('New Item');
  const addNewItemButton = screen.getByRole('button', { name: 'Add New Item' });
  const markAllAsUnpacked = screen.getByRole('button', {
    name: 'Mark All As Unpacked',
  });

  const packedItemList = screen.getByTestId('packed-items-list');
  const unpackedItemList = screen.getByTestId('unpacked-items-list');
  return {
    user,
    newItemInputField,
    addNewItemButton,
    markAllAsUnpacked,
    packedItemList,
    unpackedItemList,
  };
};

it('renders the Packing List application', () => {
  setup();
});

it('has the correct title', async () => {
  setup();
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  setup();
  screen.getByPlaceholderText('New Item');
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  const { addNewItemButton } = setup();
  expect(addNewItemButton).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user, newItemInputField, addNewItemButton } = setup();
  await user.type(newItemInputField, 'Lucky beanie');
  expect(addNewItemButton).not.toBeDisabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user, newItemInputField, addNewItemButton } = setup();
  await user.type(newItemInputField, 'Lucky beanie');
  await user.click(addNewItemButton);
  within(screen.getByTestId('unpacked-items-list')).getByText('Lucky beanie');
});

it.only('marks all items as unpacked when mark all as unpacked button is clicked', async () => {
  const {
    user,
    newItemInputField,
    addNewItemButton,
    markAllAsUnpacked,
    packedItemList,
    unpackedItemList,
  } = setup();
  await user.type(newItemInputField, 'Lucky beanie');
  await user.click(addNewItemButton);
  const checkBox = screen.getByRole('checkbox');
  await user.click(checkBox);
  within(packedItemList).getByText('Lucky beanie');
  expect(
    within(packedItemList).queryByText('Lucky beanie'),
  ).toBeInTheDocument();
  await user.click(markAllAsUnpacked);
  within(unpackedItemList).getByText('Lucky beanie');
  expect(
    within(packedItemList).queryByText('Lucky beanie'),
  ).not.toBeInTheDocument();
});

it('removes an item when the remove button is clicked', async () => {
  const { user } = render(<PackingList />);

  const newItemInput = screen.getByLabelText<HTMLInputElement>('New Item Name');
  const addNewItemButton = screen.getByRole<HTMLButtonElement>('button', {
    name: 'Add New Item',
  });

  await user.type(newItemInput, 'iPad Pro');
  await user.click(addNewItemButton);

  const item = screen.getByLabelText('iPad Pro');
  const removeButton = screen.getByRole('button', {
    name: 'Remove iPad Pro',
  });

  await user.click(removeButton);

  expect(item).not.toBeInTheDocument();
});
