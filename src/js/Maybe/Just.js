import Maybe from './Maybe.js';

export default class Just extends Maybe {

	constructor(value) {
    	super();
    	this.value = value;
  	}

  	map(f) {
  		return this.of(f(this.extract()))
  	}

  	bind(f) {
  		return f(this.extract());
  	}

  	static of(value) {
    	return new Just(value);
  	}

}