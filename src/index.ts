import './styles.css';
import { Flipper } from './Flipper';

const root = document.createElement('div');

document.body.appendChild(root);

root.innerHTML = `
  <div class='container'>
    <div class='child'></div>
    <div class='child'></div>
    <div class='child'></div>
    <div class='child'></div>
    <div class='child'></div>
    <div class='child'></div>
    <div class='child'></div><div class='child'></div>
    <div class='child'></div>
    <div class='child'></div>
    <div class='child'></div>
    <div class='child'></div>
    <div class='child'></div>
    <div class='child'></div><div class='child'></div>
    <div class='child'></div>
    <div class='child'></div>
    <div class='child'></div>
    <div class='child'></div>
    <div class='child'></div>
    <div class='child'></div>
  </div>
`;

const children = document.querySelectorAll<HTMLAnchorElement>('.child');

const flipper = new Flipper(Array.from(children));

const container = document.querySelector<HTMLDivElement>('.container');

if (container) {
  container.addEventListener('click', function (event) {
    event.preventDefault();

    const snapshot = flipper.capture();

    this.classList.toggle('expanded');

    flipper.invert(snapshot);

    flipper.animate();
  });
}
