/**
 * Waits for the given b milliseconds before calling a
 * @param {Function} a Passed function to apply b and c
 * @param {Number} b Milliseconds for the timeout to update
 * @param {} c
 */
export default function debounce(a, b, c) {
	var d, e;
	return function() {
		function h() {
			d = null;
			c || (e = a.apply(f, g));
		}
		var f = this,
			g = arguments;
		return (
			clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e
		);
	};
}

export function removeHTMLTags(str) {
	return str.replace(/<[^>]*>?/gm, "");
}
