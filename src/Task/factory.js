import { default as T } from './Task.js';

export function Task(value) {
  return new T(value);
}

Task.unit = T.unit.bind(T);
Task.of = T.of.bind(T);