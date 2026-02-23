import { Either, Right, Left } from '../Either/factory.js';

export function Result(value, message) {
	return Either(value, message);
}

export function Ok(value) {
	return Right(value);
}

export function Err(value) {
	return Left(value);
}
