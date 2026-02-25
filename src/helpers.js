// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import { Num } from './Num/factory.js';
import { Str } from './Str/factory.js';
import { Lst } from './Lst/factory.js';
import { Kvm } from './Kvm/factory.js';
import { Right } from './Either/factory.js';

import Gonad from './Gonad.js'

export function wrapType(value) {

    if(value instanceof Gonad) {
        return value;
    }
    
    switch (typeof value) {

      case 'number':
          return Num(value)
          break;

      case 'string':
          return Str(value)
          break;

        case 'object':
            return Array.isArray(value) ? Lst(value) : Kvm(value);
            break;

    }

    return Right(value);
}

export function proxyWrap(x) {
    return x;
}

export function curry(fn) {
    const arity = fn.length;

    return function curried(...args) {
        if (args.length >= arity) {
            return fn.apply(this, args);
        } else {
            return function(...nextArgs) {
                return curried.apply(this, args.concat(nextArgs));
            };
        }
    };
}