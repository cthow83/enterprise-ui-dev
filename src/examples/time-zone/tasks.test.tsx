import TaskList from './tasks';
import { render } from '@testing-library/react';

describe('TaskList', () => {
  it('should render a list of tasks', () => {
    const tasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ];
    const { container } = render(<TaskList tasks={tasks} />);
    expect(container.querySelectorAll('li')[0].textContent).toEqual('Task 1');
    expect(container.querySelectorAll('li')[1].textContent).toEqual('Task 2');
    expect(container.querySelectorAll('li')).toHaveLength(2);
  });
});
