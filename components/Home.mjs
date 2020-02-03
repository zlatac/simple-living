import Logo from './Logo.mjs';

export default class Home extends HTMLElement {
	constructor() {
		super()
		const template = document.querySelector('#home').innerHTML
		const shadow = this.attachShadow({mode: 'open'})
		shadow.innerHTML = template
		//customElements.define('app-logo', AppLogo)
	}

	connectedCallback() {
		this.shadowRoot.querySelector('button')
		.addEventListener('click', this.startRegistration.bind(this))
	}

	startRegistration() {
		window.location.hash = '/pre-register'
	}
}