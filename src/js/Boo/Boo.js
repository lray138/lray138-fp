// so, this would be a "SuperMonad" or whatever.
// I want an object that obeys this interface.
// I guess we could use tryCatch 
// there was a thought of why not put everythign in a try catch?

import Gonad from '../Gonad.js';
import { proxyWrap } from '../helpers.js';

export default class Boo extends Gonad {

	

	constructor(value) {
		super();
		this.value = value;
	}

}