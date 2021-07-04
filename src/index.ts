import path from 'path';
import { Worker } from 'jest-worker';

const worker = new Worker(path.join(__dirname, 'worker.js'));

const total = Math.pow(10, 10);
const parts = 10;

const tasks = [];
for (let part = 0; part < parts; part += 1) {
  const count = total / parts;
  // @ts-ignore
  tasks.push(worker.run(part * count + 1, part * count + count));
}

Promise.all(tasks).then((numbers: number[]) => {
  const sum = numbers.reduce((acc, number) => acc + number, 0);
  console.log('Done', sum);

  return worker.end();
});
