export default class PreRegistration extends HTMLElement {
	constructor() {
		super()
		const template = document.querySelector('#pre-register').innerHTML
		const shadow = this.attachShadow({mode: 'open'})
		shadow.innerHTML = template
		this.shadowRoot.querySelector('button').addEventListener('click', () => {
			location.hash = "/register"
		})
	}

}