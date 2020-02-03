import store from './store/store.mjs'

export default class AppConfig extends HTMLElement {
	// All components should extend this class to have access to the same store instance
	store = store
	constructor() {
		super()
	}
}