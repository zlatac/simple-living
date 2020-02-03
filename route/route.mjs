import Home from '../components/Home.mjs'
import PreRegistration from '../components/PreRegistration.mjs'
import PostRegistration from '../components/PostRegistration.mjs'
import Registration from '../components/Registration.mjs'

export default class RouterView extends HTMLElement {
	routes = []

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
				component: PreRegistration,
				define: 'app-pre-register'
			},
			{
				name: '/post-register',
				component: PostRegistration,
				define: 'app-post-register'
			},
			{
				name: '/register',
				component: Registration,
				define: 'app-register'
			}
		]
	}

	connectedCallback() {
		this.setupRoute()
		window.addEventListener('hashchange', this.setupRoute.bind(this))
	}

	setupRoute() {
		const hash = window.location.hash.replace('#','');
		const hashExists = this.routes.find((route) => route.name === hash)
		if (hashExists !== undefined) {
			if ('template' in hashExists) {
				this.innerHTML = hashExists.template
				customElements.define(hashExists.define, hashExists.component)
				return
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