export default class AppButton extends HTMLElement {

static get observedAttributes() {
        return ['type']
    }
    
    constructor() {
        super()
		const template = document.querySelector('#app-button').innerHTML
        const shadow = this.attachShadow({mode: 'open'})
        shadow.innerHTML = template
        const elem = this.shadowRoot.querySelector('.change-type')
        elem.classList.add(this.type)
        console.log(this.type)
        
    }
    
 get type(){
    let type = this.getAttribute('type')
        if(type) {
            return type    
        }
    
        return 'default'

 }
 
}

const button = customElements.define('app-button', AppButton)