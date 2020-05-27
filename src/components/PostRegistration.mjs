import Logo from './AppButton.mjs'; 

export default class PostRegistration extends HTMLElement {
	constructor() {
		super()
		const template = document.querySelector('#post-register').innerHTML
		const shadow = this.attachShadow({mode: 'open'})
		shadow.innerHTML = template
	}

	connectedCallback() {
		const elem = this.shadowRoot.querySelector('button')
		elem.addEventListener('click', async () => {
			try {
				if ('share' in navigator) {
					await navigator.share({
						title: 'Slash The Rent',
						text: 'Find the perfect roommate & save 50% on rent today',
						url: window.location.origin
					})
				}
				
			} catch (error) {
				console.error(new Error(error))
			}
		})
	}

}