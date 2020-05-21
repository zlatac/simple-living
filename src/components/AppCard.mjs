export default class AppCard extends HTMLElement {
	constructor() {
    super() 
    const template = document.querySelector('#app-card').innerHTML
    const shadow = this.attachShadow({mode: 'open'})
    shadow.innerHTML = template
    }
}