export function assert(condition: any): asserts condition {
  if (condition === false) {
    throw new Error('Condition is false');
  }
}
