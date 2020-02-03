export default class PostRegistration extends HTMLElement {
	constructor() {
		super()
		const template = document.querySelector('#post-register').innerHTML
		const shadow = this.attachShadow({mode: 'open'})
		shadow.innerHTML = template
	}

	// connectedCallback() {
	// 	const elem = this.shadowRoot.querySelector('button')
	// 	elem.addEventListener('click', async () => {
	// 		try {
	// 			await navigator.share('fuck you')
	// 		} catch (error) {
	// 			console.error(new Error(error))
	// 		}
			
	// 	})
	// }

}