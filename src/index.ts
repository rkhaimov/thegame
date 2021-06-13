import { Flipper } from 'flip-toolkit';
import './styles.css';

const root = document.createElement('div');

document.body.appendChild(root);

root.innerHTML = `
<a class='card' href='#'>
  <div class='card-content'>
    <h1>Is it hero?</h1>
      <img src='https://www.goodrx.com/blog/wp-content/uploads/2018/11/generic-vs-brand-goodrx.jpg' alt='Generic'>
    <p>Here is some description for ya</p>
  </div>
</a>`;

const card = document.querySelector<HTMLAnchorElement>('.card');

if (card) {
  card.addEventListener('click', function (event) {
    event.preventDefault();

    const flipper = new Flipper({
      element: document.body,
      debug: false,
      // spring: { stiffness: 10, damping: 10 },
    });

    const content = root.querySelector('.card-content');
    const title = root.querySelector('h1');
    const image = root.querySelector('img');
    const text = root.querySelector('p');

    flipper.addFlipped({
      element: this,
      flipId: 'card',
      children: () => null,
    });

    flipper.addInverted({
      element: content as HTMLDivElement,
      parent: this,
    } as any);

    flipper.addFlipped({
      element: title as HTMLElement,
      flipId: 'title',
      children: () => null,
    });
    flipper.addFlipped({
      element: image as HTMLElement,
      flipId: 'image',
      children: () => null,
    });
    flipper.addFlipped({
      element: text as HTMLElement,
      flipId: 'text',
      children: () => null,
    });

    flipper.recordBeforeUpdate();

    this.classList.toggle('expanded');

    (flipper.update as any)();
  });
}
