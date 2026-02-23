import { default as A } from './Arr.js';
import { default as L } from './Lst.js';
import { default as K } from './Kvm.js';
import { proxyWrap } from '../helpers.js';

export function Arr(value) {
	return value != null && typeof value === 'object' && !Array.isArray(value)
		? proxyWrap(K.of(value))
		: proxyWrap(A.of(value));
}

export function Lst(value) {
	return proxyWrap(L.of(value));
}

export function Kvm(value) {
	return proxyWrap(K.of(value));
}