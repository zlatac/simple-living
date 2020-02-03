export default class AppLogo extends HTMLElement {
    static get observedAttributes() {
        return ['color']
    }

    constructor() {
        super()
        this.attachShadow({mode: 'open'})
        const template = document.querySelector('#logo').cloneNode(true)
        const elem = template.querySelector('.change-fill')
        elem.style.fill = this.color
        elem.style.stroke = 'none'
        //console.log(this.color)
        this.shadowRoot.appendChild(template)
    }

    get color() {
        let color = this.getAttribute('color')
        if(color) {
            return color
        }

        return 'white'
    }
}

const Logo = customElements.define('app-logo', AppLogo)