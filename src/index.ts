import { getDatesFromMonth } from './date';
import './styles.css';

const calendar = document.createElement('div');

calendar.classList.add('calendar');

document.body.appendChild(calendar);

const state = createState({ node: render(getDatesFromMonth(new Date())), date: new Date() });

state.onChange((prev, curr) => {
  prev.node.classList.add('leaving', 'animatable');
  curr.node.classList.add('entering', 'animatable');

  prev.node.ontransitionend = () => {
    prev.node.remove();
    curr.node.classList.remove('entering', 'animatable');
  };
});

setInterval(() => {
  const curr = new Date(state.get().date);

  curr.setMonth(state.get().date.getMonth() + 1);

  const container = render(getDatesFromMonth(curr));

  document.body.offsetTop;

  state.change({ node: container, date: curr });
}, 3_000);

function render(dates: number[]) {
  const container = document.createElement('div');

  container.classList.add('container');

  for (const date of dates) {
    const cell = document.createElement('div');

    cell.innerText = `${date}`;
    cell.classList.add('cell');

    container.appendChild(cell);
  }

  calendar.appendChild(container);

  return container;
}

function createState<T>(initial: T) {
  let state = initial;
  let handleChange: (prev: T, curr: T) => unknown = () => ({});

  return {
    change(newState: T) {
      handleChange(state, newState);

      state = newState;
    },
    onChange(clb: (prev: T, curr: T) => unknown) {
      handleChange = clb;
    },
    get() {
      return state;
    }
  };
}
