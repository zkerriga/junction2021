export interface HSL {
	h: number,
	s: number,
	l: number
}

export const HEXtoHSL = (hex: string) => {
	hex = hex.replace(/#/g, '');

	if (hex.length === 3) {
		hex = hex.split('').map(function (hex) {
			return hex + hex;
		}).join('');
	}

	let result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
	if (!result) {
		return null;
	}
	let r = parseInt(result[1], 16) / 255;
	let g = parseInt(result[2], 16) / 255;
	let b = parseInt(result[3], 16) / 255;

	let max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let h = 0, s, l = (max + min) / 2;

	if (max === min) {
		h = s = 0;
	} else {
		let d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	s = s * 100;
	s = Math.round(s);
	l = l * 100;
	l = Math.round(l);
	h = Math.round(360 * h);

	return {
		h: h,
		s: s,
		l: l
	};
}

export const colorRound = (bestNum: number, worstNum: number, status: number) => worstNum + (bestNum - worstNum) * status

export const HSLToHex = (h: number, s: number, l: number) => {
	h /= 360;
	s /= 100;
	l /= 100;
	let r, g, b;
	if (s === 0) {
		r = g = b = l;
	} else {
		const hue2rgb = function(p: number, q: number, t: number) {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	const toHex = function(x: number) {
		const hex = Math.round(x * 255).toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};

	return '#'+toHex(r)+toHex(g)+toHex(b);
}