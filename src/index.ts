import { morphInTo } from './morph';
import './styles.css';

const root = createRoot();

const canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
canvas.classList.add('canvas');

const target = document.createElementNS('http://www.w3.org/2000/svg', 'path');

target.setAttribute('d', 'M26 8L11 82L22 82L28 49L32 49L38 65L25 65L23 73L41 73L44 81L56 81Z');
target.setAttribute('fill', 'blue');

root.appendChild(canvas);
canvas.appendChild(target);

fun();

function fun() {
  morphInTo(target, { getAttribute: () => 'M152 2L152 15L175 15L178 70L194 71L191 16L219 17L218 3Z' }, () => {
    morphInTo(target, { getAttribute: () => 'M52 2L52 15L75 15L78 70L94 71L91 16L119 17L118 3Z' }, fun);
  });
}

function createRoot() {
  const root = document.createElement('div');

  root.setAttribute('id', 'root');

  document.body.appendChild(root);

  return root;
}
