import { describe, expect, it } from 'vitest';
import { createPerson, Person } from '$lib/person';
import { KanbanBoard } from '$lib/kanban-board';

/**
 * toBe: https://vitest.dev/api/expect.html#tobe
 * toBeCloseTo: https://vitest.dev/api/expect.html#tobecloseto
 * toBeInstanceOf: https://vitest.dev/api/expect.html#tobeinstanceof
 * toBeUndefined: https://vitest.dev/api/expect.html#tobeundefined
 * toContain: https://vitest.dev/api/expect.html#tocontain
 * toThrow: https://vitest.dev/api/expect.html#tothrow
 * toThrowError: https://vitest.dev/api/expect.html#tothrowerror
 */

it('should pass if the two numbers would add up correctly in a language other than JavaScript', () => {
  expect(0.2 * 10 + 0.1 * 10).toEqual(0.3 * 10);
});

describe('createPerson', () => {
  it('should create an instance of a person', () => {
    const person = createPerson('Ada Lovelace');
    expect(person).toBeInstanceOf(Person);
    // Verify that person is an instance of a Person.
  });
});

describe('Kanban Board', () => {
  it('should include "Backlog" in board.statuses', () => {
    const board = new KanbanBoard('Things to Do');
    // Verify that board.statuses contains "Backlog".
    expect(board.statuses).toContain('Backlog');
  });

  it.fails('should *not* include "Bogus" in board.statuses', () => {
    const board = new KanbanBoard('Things to Do');

    // Verify that board.statuses does not contain "Bogus".
    expect(board.statuses).toContain('Bogus');
  });

  it('should include an added status in board.statuses using #addStatus', () => {
    const board = new KanbanBoard('Things to Do');
    board.addStatus('test status');
    // Use board.addStatus to add a status.
    expect(board.statuses).toContain('test status');
    // Verify that the new status is—in fact—now in board.statuses.
  });

  it.fails('should remove a status using #removeStatus', () => {
    const board = new KanbanBoard('Things to Do');
    expect.hasAssertions();
    // Use board.removeStatus to remove a status.
    board.removeStatus('Backlog');
    // You can be clever or you can just assume "Backlog" is in board.statuses
    // by default.
    // Verify that the status is no longer in in board.statuses.
    expect(board.statuses).toContain('Backlog');
  });
});

describe('Person', () => {
  it('will create a person with a first name', () => {
    const person = new Person('Madonna');
    // Verify that person.firstName is correct.
    expect(person.firstName).toEqual('Madonna');
  });

  it('will create a person with a first and last name', () => {
    const person = new Person('Madonna Cicone');
    // Verify that person.lastName is correct.
    expect(person.lastName).toEqual('Cicone');
  });

  it('will create a person with a first, middle, and last name', () => {
    const person = new Person('Madonna Louise Cicone');
    // Verify that person.middleName is correct.
    expect(person.middleName).toEqual('Louise');
  });

  it('will throw if you provide an empty string', () => {
    const fn = () => {
      new Person('');
    };

    // Verify that function above throws.
  });

  it('will throw a specific error message if you provide an empty string', () => {
    const errorMessage = 'fullName cannot be an empty string';

    const fn = () => {
      new Person('');
    };
    // Verify that function above throws the error message above.
    expect(fn).toThrowError('fullName cannot be an empty string');
  });

  it('will add a friend', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);

    // Verify that john.friends contains paul.
    expect(john.friends).toContain(paul);
  });

  it('will mutually add a friend', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);

    // Verify that paul.friends contains john.
    expect(paul.friends).toContain(john);
  });

  it.fails('will remove a friend', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);
    john.removeFriend(paul);

    // Verify that john.friends does not include paul.
    expect(john.friends).toContain(paul);
  });

  it.fails('will mutually remove friends', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);
    john.removeFriend(paul);

    // Verify that paul.friends does not include john.
    expect(paul.friends).toContain(john);
  });
});

const explode = () => {
  throw new Error('Something went terribly wrong');
};

describe('explode', () => {
  it('should throw an error', () => {
    const fn = () => {
      explode();
    };

    expect(fn).toThrowError();
  });

  it('should throw a specific error containing "terribly wrong"', () => {
    const fn = () => {
      explode();
    };

    expect(fn).toThrowError('terribly wrong');
  });
});
