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

  	static of(value) {
    	return new Nothing(value);
  	}
}