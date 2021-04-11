export function animate(options: Options): Promise<void> {
  let current = 0;
  const frame = 1000 / 60;

  return new Promise((resolve) => {
    requestAnimationFrame(update);

    function update() {
      if (current >= 1) {
        resolve();

        return;
      }

      current += frame / options.duration;

      const value = options.easing(current);

      options.onAnimate(value);

      requestAnimationFrame(update);
    }
  });
}

type Options = {
  duration: number;
  easing(progress: number): number;
  onAnimate(value: number): void;
};
