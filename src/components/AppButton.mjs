export default class AppButton extends HTMLElement {
	constructor() {
        super() 
        const template = document.querySelector('#app-button').innerHTML
        const shadow = this.attachShadow({mode: 'open'})
        shadow.innerHTML = template
    }
}

const Card = customElements.define('app-button', AppButton)