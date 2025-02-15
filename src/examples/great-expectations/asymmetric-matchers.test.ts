import { v4 as id } from 'uuid';
import { expect, expectTypeOf, it } from 'vitest';

type ComputerScientist = {
  id: string;
  firstName: string;
  lastName: string;
  isCool?: boolean;
};

const createComputerScientist = (
  firstName: string,
  lastName: string,
): ComputerScientist => ({ id: 'cs-' + id(), firstName, lastName });

const addToCoolKidsClub = (p: ComputerScientist, club: unknown[]) => {
  club.push({ ...p, isCool: true });
};

it('include cool computer scientists by virtue of them being in the club', () => {
  const people: ComputerScientist[] = [];

  addToCoolKidsClub(createComputerScientist('Grace', 'Hopper'), people);
  addToCoolKidsClub(createComputerScientist('Ada', 'Lovelace'), people);
  addToCoolKidsClub(createComputerScientist('Annie', 'Easley'), people);
  addToCoolKidsClub(createComputerScientist('Dorothy', 'Vaughn'), people);

  people.forEach((person) => {
    expectTypeOf(person.firstName).toEqualTypeOf<string>();
    expectTypeOf(person.lastName).toEqualTypeOf<string>();
    expect(person.isCool).toBe(true);
  });

  expect(people.length).toEqual(4);
  expect(people).toContainEqual(
    expect.objectContaining({
      // expect to match a any String
      id: expect.any(String),
      firstName: 'Grae',
      lastName: 'Hopper',
      isCool: true,
    }),
  );
});
