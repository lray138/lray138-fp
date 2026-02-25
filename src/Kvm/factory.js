import { default as K } from './Kvm.js';
import { proxyWrap } from '../helpers.js';

export function Kvm(value) {
	return proxyWrap(K.of(value));
}

export function attrsReducer(acc, value, key) {
	const v = value && typeof value.extract === 'function' ? value.extract() : value;
	if (v == null || v === false) {
		return acc;
	}

	const chunk = v === true
		? key
		: `${key}="${String(v).replace(/"/g, '&quot;')}"`;

	return acc === '' ? chunk : `${acc} ${chunk}`;
}

Kvm.of = Kvm;
