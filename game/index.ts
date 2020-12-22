import { sum } from './sum';

const connection = new WebSocket('ws://localhost:8080/hr');

connection.onmessage = () => location.reload();

console.log('Hello world', sum());
