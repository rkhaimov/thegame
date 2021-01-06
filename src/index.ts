import { morphInTo } from './morph';
import './styles.css';

const root = createRoot();

const canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
canvas.classList.add('canvas');

const one = document.createElementNS('http://www.w3.org/2000/svg', 'path');
const two = document.createElementNS('http://www.w3.org/2000/svg', 'path');

one.setAttribute('d', 'M150 150 L75 350 L225 350 Z');
one.setAttribute('fill', 'red');

two.setAttribute('d', 'M100 100 L75 350 L50 350 Z');
two.setAttribute('fill', 'blue');

root.appendChild(canvas);
canvas.appendChild(one);
canvas.appendChild(two);

morphInTo(two, one);

function createRoot() {
  const root = document.createElement('div');

  root.setAttribute('id', 'root');

  document.body.appendChild(root);

  return root;
}
