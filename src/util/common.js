const debounce = (func, wait, immediate) => {
	console.log(func)
	let timeout
	return() => {
		let context = this
		let args = arguments

		if(timeout) clearTimeout(timeout)
		if(immediate) {
			let callNow = !timeout
			timeout = setTimeout(() => {
				timeout = null
			}, wait)
			if(callNow) func.apply(context, args)
		} else {
			timeout = setTimeout(() => {
				func.apply(context, args)
			}, wait)
		}
	}
}

const throttle = (func, wait) => {
	console.log(func)
	let previous = 0

	return function() {
		let context = this
		let args = arguments
		let now = Date.now()

		if(now - previous > wait) {
			func.apply(context, args)
			previous = now
		}

	}
}

export {
	debounce,
	throttle
}