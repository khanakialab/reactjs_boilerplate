import { observable, action } from 'mobx';

export class GlobalStore {
	@observable routes = [];
	
	@observable menu = {};
}

