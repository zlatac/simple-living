import AppConfig from '../AppConfig.mjs'

export default class MyRegister extends AppConfig {
	constructor() {
		super()
		this.attachShadow({mode: 'open'}).innerHTML = `<div>Registration page ${this.store.state.meow}</div>`
	}
}