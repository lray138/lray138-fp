import Maybe from './Maybe.js';
import Nothing from './Nothing.js';

export default class Just extends Maybe {

	constructor(value) {
    	super();
    	this.value = value;
  	}

  	prop(p) {
        let value = this.extract();
		if (value && (typeof value === 'object' || Array.isArray(value)) && p in value) {
			return Just.unit(value[p]);
		}
		return Nothing.unit();
  	}

    
    call(f, ...args) {
        return this.prop(f)
            .bind(c => {
                if(typeof c === "function") {
                    return Array.isArray(args[0]) 
                        ? wrapType(c(...args[0]))
                        : wrapType(c(...args));
                }
                return Nothing.of();
            });
    }

  	map(f) {
  		return Just.of(f(this.extract()))
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

  	static unit(value) {
    	return new Just(value);
  		}

}