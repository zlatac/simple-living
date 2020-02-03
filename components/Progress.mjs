export default class Progress extends HTMLElement {
    static get observedAttributes() {
        return ['current', 'max']
    }
	constructor() {
        super()
        //const template = this.addProgress()
        const template = document.querySelector('#progress').content.cloneNode(true)
		const shadow = this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(template.cloneNode(true))
        this.addProgress()
        console.log(this.current, this.max)
    }
    
    set current(value) {
        this.setAttribute('current', value)
    }

    get current() {
        return this.getAttribute('current')
    }

    set max(value) {
        this.setAttribute('max', value)
    }

    get max() {
        return this.getAttribute('max')
    }

    addProgress() {
        // const template = document.querySelector('#progress').content.cloneNode(true)
        // const progress = template.querySelector('.progress')
        // const pill = progress.querySelector('.item')
        const temp = this.shadowRoot.querySelector('.progress')
        temp.innerHTML = ''
        for (let i = 0; i < this.max; i++) {
            // debugger
            if (i < this.current) {
                const div = document.createElement('div')
                div.classList.add('item')
                temp.appendChild(div)
            } else {
                const div = document.createElement('div')
                div.classList.add('item', 'grey')
                // const new_pill = pill.cloneNode(true)
                // new_pill.classList.add('grey')
                temp.appendChild(div)
            }
            
        }

        //return template
    }

    attributeChangedCallback() {
        console.log('wow')
        //console.log(this.addProgress())
        //this.shadowRoot.querySelector('.progress').replaceWith(this.addProgress())
        this.addProgress()
    }

}