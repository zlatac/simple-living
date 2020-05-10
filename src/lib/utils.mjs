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

const rankAnalysis = (myRank, theirRank) => {
	if (Array.isArray(myRank) && Array.isArray(theirRank) 
		&& myRank.every(i => typeof i === 'number') && theirRank.every(i => typeof i === 'number')) {
		// When both top ranks are the same they are 100% compatible
		if (expressMatch()) {
			return 1
		}

		return compromiseAnalysis()
	}else {
		throw new Error('Not an array or Array should only have number values')
	}

	function expressMatch() {
		return myRank[0] === theirRank[0]
	}

	// They outcome of compatibility is heavily dependent on myRank
	// as what is important to one user can be not important the other and vice versa
	function compromiseAnalysis() {
		let totalSum = 0
		let matchProbabilty = 0
		for(let i=myRank.length; i > 0; i--) {
			totalSum += i;
		}
		const mean = Math.round(totalSum/myRank.length)
		//console.log(mean, totalSum)
		const myRankWeightMap = new Map()
		for(let i=0; i < myRank.length; i++) {
			const rankWeight = (myRank.length - i)/totalSum
			const isLastIndex = (myRank.length - 1) === i
			// The last index in the array will have a weight of 0
			if (!isLastIndex) {
				myRankWeightMap.set(myRank[i], rankWeight)
			} else {
				myRankWeightMap.set(myRank[i], 0)
			}
			
		}
		//console.log(myRankWeightMap)
		for(let i=0; i < mean; i++) {
			matchProbabilty += myRankWeightMap.get(theirRank[i])
		}
		//console.log(matchProbabilty)

		return Number(Number(matchProbabilty).toFixed(2))
	}
}

export default {
	defineCustomElements,
	rankAnalysis
}