import { default as F } from './Future.js';

export function Future(value) {
    return new F(value);
}