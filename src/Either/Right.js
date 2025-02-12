import Gonad from '../Gonad.js';
import Either from './Either.js';
import Left from './Left.js';

import { wrapType } from '../helpers.js';

export default class Right extends Either {

	map(f) {
		return Right.unit(f(this.extract()));
	}

    prop(p) {
        let value = this.extract();
        if (value && (typeof value === 'object' || Array.isArray(value)) && p in value) {
            return Right.unit(value[p]);
        }
        return Left.unit('prop "' + p + '" not found');
    }

    call(f, ...args) {
        return this.prop(f)
            .bind(c => {
                if(typeof c === "function") {
                    return Array.isArray(args[0]) 
                        ? wrapType(c(...args[0]))
                        : wrapType(c(...args));
                }
                return Left.of('prop "' + f + '" is not callable');
            });
    }

	bind(f) {
		return f(this.extract());
	}

	ap(v) {
  		return v.map(this.extract());
	}

	fork(_, r) {
  		return r(this.extract());
  	}

  	extend(f) {
  		return f(this);
  	}

	static unit(val) {
		return new Right(val);
	}

	extract() {
		return this.value;
	}

	constructor(value) {
    	super();
    	this.value = value;
  			}

}