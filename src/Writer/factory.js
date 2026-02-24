import { default as W } from './Writer.js';

export function Writer(value, log) {
  return W.of(value, log);
}