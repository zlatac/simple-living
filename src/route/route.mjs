import Home from '../components/Home.mjs'
import Registration from '../components/Registration.mjs'
const PreRegistration = '../components/PreRegistration.mjs'
const PostRegistration = '../components/PostRegistration.mjs'
const Marketing = '../components/Marketing.mjs'


export default class RouterView extends HTMLElement {
	constructor() {
		super()
		this.routes = [
			{
				name: '/',
				component: Home,
				define: 'app-home',
			},
			{
				name: '/pre-register',
				dynamicComponent: PreRegistration,
				define: 'app-pre-register'
			},
			{
				name: '/post-register',
				dynamicComponent: PostRegistration,
				define: 'app-post-register'
			},
			{
				name: '/register',
				component: Registration,
				define: 'app-register'
			},
			{
				name: '/marketing',
				dynamicComponent: Marketing,
				define: 'app-marketing'
			}
		]
	}

	connectedCallback() {
		this.setupRoute()
		window.addEventListener('hashchange', this.setupRoute.bind(this))
	}

	async setupRoute() {
		const hash = window.location.hash.replace('#','');
		const hashExists = this.routes.find((route) => route.name === hash)
		if (hashExists !== undefined) {
			if ('template' in hashExists) {
				this.innerHTML = hashExists.template
				customElements.define(hashExists.define, hashExists.component)
				return
			}
			// Get dynamic imports
			if ('dynamicComponent' in hashExists && !('component' in hashExists)) {
				const component = await import(hashExists.dynamicComponent)
				hashExists.component = component.default
			}
			this.innerHTML = `<${hashExists.define}></${hashExists.define}>`
			if (customElements.get(hashExists.define) === undefined) {
				customElements.define(hashExists.define, hashExists.component)
			}
		} else {
			window.location.hash = '/'
		}

		if (location.pathname !== '/') {
			location.pathname = '/'
		}
	}
}

export const routes =  customElements.define('router-view', RouterView)