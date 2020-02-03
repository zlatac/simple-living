import utils from '../lib/utils.mjs'
import Progress from './Progress.mjs'
export default class Registration extends HTMLElement {
	formData = [
		{
			name: 'name',
			query: 'input[name="full-name"]'
		},
		{
			name: 'email',
			query: 'input[name="email"]'
		},
		{
			name: 'industry',
			query: 'select[name="industry"]'
		},
		{
			name: 'city',
			query: '[name="city"]'
		},
		{
			name: 'living status',
			query: '[name="living-status"]'
		},
	];
	index = 0;
	childComponents = [
		{
			name: 'app-progress',
			component: Progress
		}
	];
	nextButton = undefined;

	constructor() {
		super()
		this.childComponents.forEach((item) => utils.defineCustomElements(item.component, item.name))
		const template = document.querySelector('#app-registeration').innerHTML
		const shadow = this.attachShadow({mode: 'open'})
		shadow.innerHTML = template
	}

	connectedCallback() {
		const firstElement = this.shadowRoot.querySelector(this.currentForm.query)
		firstElement.classList.remove('hide')
		firstElement.addEventListener('input', this.setFormValue.bind(this))
		this.setProgress()
		this.nextButton = this.shadowRoot.querySelector('button[name="next"]')
		this.nextButton.classList.add('hide')
		this.nextButton.addEventListener('click', this.goToNextForm.bind(this))
	}

	async goToNextForm() {
		let elem;
		if (this.isLastIndex) {
			console.log('we are submitting data', this.formData.map(i => i.value))
			const form = {}
			this.formData.forEach(i => form[i.name] = i.value)
			await fetch('/api', {
				body: JSON.stringify(form),
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				}
			})
			location.hash = '/post-register'
			return
		}
		switch(this.nextForm.name) {
			case 'email':
				elem = this.shadowRoot.querySelector(this.nextForm.query)
				elem.addEventListener('input', this.setFormValue.bind(this))
				break;
			case 'industry':
				elem = this.shadowRoot.querySelector(this.nextForm.query)
				elem.addEventListener('change', this.setFormValue.bind(this))
				break;
			case 'city':
				elem = this.shadowRoot.querySelector(this.nextForm.query)
				const otherCity = this.shadowRoot.querySelector('input[name="city-other"]')
				elem.addEventListener('change', (event) => {
					this.setFormValue(event)
					if (event.target.value === 'other') {
						otherCity.classList.remove('hide')
					} else {
						otherCity.classList.add('hide')
					}
				})
				otherCity.addEventListener('input', this.setFormValue.bind(this))
				break;
			case 'living status':
				elem = this.shadowRoot.querySelector(this.nextForm.query)
				elem.addEventListener('change', this.setFormValue.bind(this))
				break;
			default:
		}
		const currentForm = this.shadowRoot.querySelector(this.currentForm.query)
		const nextForm = this.shadowRoot.querySelector(this.nextForm.query)
		currentForm.classList.add('hide')
		nextForm.classList.remove('hide')
		this.nextButton.classList.add('hide')
		this.index++
		this.setProgress()
	}

	setProgress() {
		const elem = this.shadowRoot.querySelector('app-progress')
		elem.max = this.formData.length
		elem.current = this.index + 1
	}

	setFormValue(event) {
		//console.log(event)
		const value = event.target.value
		if (value !== '' || value !== undefined) {
			this.currentForm.value = value
			if ('value' in this.currentForm && this.currentForm.value !== '') {
				this.nextButton.classList.remove('hide')
				if (this.isLastIndex) {
					this.nextButton.innerHTML = 'submit'
				}
			} else {
				this.nextButton.classList.add('hide')
			}
			//console.log(this.currentForm)
		}
	}

	get currentForm() {
		return this.formData[this.index]
	}

	get nextForm() {
		return this.formData[this.index + 1]
	}

	get isLastIndex() {
		return this.formData.length === this.index + 1
	}

}