
//here we have two objects state and action and we will define them accordingly
import { FETCH_USER } from '../actions/types';


export default function ( state = null, action){

	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;

		default:
			return state;
	}
}