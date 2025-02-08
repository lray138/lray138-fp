import Maybe from './Maybe.js';

export default class Just extends Maybe {

	constructor(value) {
    	super();
    	this.value = value;
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