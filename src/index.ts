import { Matrix3D } from 'rematrix';
import * as Rematrix from 'rematrix'
import './styles.css';

const root = document.createElement('div');

document.body.appendChild(root);

root.innerHTML = `
<a class='card' href='#'>
</a>`;

const card = document.querySelector<HTMLAnchorElement>('.card');

if (card) {
  card.addEventListener('click', function (event) {
    event.preventDefault();

    const before = this.getBoundingClientRect();

    this.classList.toggle('expanded');

    const after = this.getBoundingClientRect();

    const transformations: Matrix3D[] = [];

    transformations.push(Rematrix.translateX(before.left - after.left));
    transformations.push(Rematrix.translateY(before.top - after.top));
    transformations.push(Rematrix.scaleX(before.width / after.width));
    transformations.push(Rematrix.scaleY(before.height / after.height));

    const inverse = transformations.reduce(Rematrix.multiply);

    this.style.transform = Rematrix.toString(inverse);
    this.style.transformOrigin = '0 0';

    this.offsetTop;

    this.classList.add('animatable');
    this.style.transform = Rematrix.toString(Rematrix.identity());

    this.ontransitionend = () => this.classList.remove('animatable');
  });
}
