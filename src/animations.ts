export function startBounce(config: Config) {
  let current = config.speed;
  const to = (config.numberOfJumps + 1) * Math.PI;
  const strength = config.target;

  requestAnimationFrame(update);

  function update() {
    if (current > to) {
      config.onAction(config.target);

      return;
    }

    const position = (Math.sin(current) / current) * -1 + 1;

    config.onAction(position * strength);

    const progress = Math.min(current / to, 0.99);
    const factor = (1 - progress) / (1 + progress);

    current += config.speed * factor;

    requestAnimationFrame(update);
  }
}

type Config = {
  target: number;
  numberOfJumps: number;
  speed: number;
  onAction(value: number): void;
};
