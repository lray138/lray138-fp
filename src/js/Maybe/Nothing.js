import Maybe from './Maybe.js';

export default class Nothing extends Maybe {

	constructor() {
    	super();
  	}

  	map() {
  		return this;
  	}

  	bind() {
  		return this;
  	}

  	ap() {
  		return this;
  	}

  	fork(f, _) {
  		return f();
  	}

  	extract() {
  		return null;
  	}

  	extend() {
  		return this;
  	}

  	static unit() {
    	return new Nothing();
  	}
}