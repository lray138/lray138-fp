import { default as K } from './Kvm.js';
import { proxyWrap } from '../helpers.js';

export function Kvm(value) {
	return proxyWrap(K.of(value));
}

Kvm.of = Kvm;
