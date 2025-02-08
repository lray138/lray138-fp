import { default as W } from './Writer.js';
import { proxy } from '../helpers.js';

export function Writer(value, log) {
  return W.of(value, log);
}