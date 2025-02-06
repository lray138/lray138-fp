import { default as T } from './Task.js';
import { proxy } from '../helpers.js';

export function Task(value) {
  return T.of(value);
}