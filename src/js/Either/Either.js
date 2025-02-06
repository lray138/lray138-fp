import Gonad from '../Gonad.js';

export default class Either extends Gonad {

	extract() {
		return this.value;
	}

	constructor() {
    	super();
    	if (new.target === Either) {
      		throw new Error("Either is an abstract class and cannot be instantiated directly.");
    	}
  	}

}