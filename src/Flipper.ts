import { Matrix3D } from 'rematrix';
import * as Rematrix from 'rematrix';

export class Flipper {
  constructor(private elements: HTMLElement[]) {}

  capture() {
    return collectBCR(this.elements);
  }

  invert(captured: ReturnType<Flipper['capture']>) {
    this.elements.forEach((element) => element.classList.remove('animatable'));
    const after = collectBCR(this.elements);

    const inverses = inverse(captured, after);

    this.elements.forEach((element, index) => {
      const inverse = inverses[index];

      element.style.transform = Rematrix.toString(inverse);
      element.style.transformOrigin = '0 0';
    });

    reflow();
  }

  animate() {
    this.elements.forEach((element) => {
      element.classList.add('animatable');
      element.style.transform = Rematrix.toString(Rematrix.identity());

      element.ontransitionend = () => element.classList.remove('animatable');
    });
  }
}

function collectBCR(elements: HTMLElement[]) {
  return elements.map((element) => element.getBoundingClientRect());
}

function inverse(before: DOMRect[], after: DOMRect[]) {
  return before.map((befRect, index) => {
    const afRect = after[index];
    const transformations: Matrix3D[] = [];

    transformations.push(Rematrix.translateX(befRect.left - afRect.left));
    transformations.push(Rematrix.translateY(befRect.top - afRect.top));
    transformations.push(Rematrix.scaleX(befRect.width / afRect.width));
    transformations.push(Rematrix.scaleY(befRect.height / afRect.height));

    return transformations.reduce(Rematrix.multiply);
  });
}

function reflow() {
  document.body.offsetHeight;
}
