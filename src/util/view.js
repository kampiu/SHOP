((d, w) => {
	const dw = d.documentElement.clientWidth;
	d.documentElement.style.fontSize = dw / 7.5 + "px"
	w.onresize = () => {
		d.documentElement.style.fontSize = d.documentElement.clientWidth / 7.5 + "px"
	}
})(document, window)