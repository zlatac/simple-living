const defineCustomElements = (elementClass, definitionName) => {
	if (typeof elementClass !== 'function' || typeof definitionName !== 'string') {
		console.log(elementClass,definitionName)
		console.error('bruh give me a class and the name you wish to use to define it')
		
		return
	}

	try {
		if (customElements.get(definitionName) !== undefined) {
			console.warn(`${definitionName} Element already registered`)
			return
		}
		customElements.define(definitionName, elementClass)
	} catch (e) {
		console.error(new Error(e))
	}

}

export default {
	defineCustomElements,
}