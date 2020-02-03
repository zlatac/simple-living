import AppConfig from '../AppConfig.mjs'

export default class MyLander extends AppConfig {
	constructor(){
		super()
		this.store.commit('meow', 'Hello bitch')
		this.attachShadow({mode: 'open'}).innerHTML = `<div>Lander main ${this.store.state.meow}</div>`
	}
}