import Gonad from '../Gonad.js';

export default class Maybe extends Gonad {

	extract() {
		return this.value;
	}

	constructor() {
    	super();
    	if (new.target === Maybe) {
      		throw new Error("Maybe is an abstract class and cannot be instantiated directly.");
    	}
  	}

}