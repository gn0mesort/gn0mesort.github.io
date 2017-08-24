class Theme {
	constructor(text = '', background = '', font = '') {
		this.text = text;
		this.background = background;
		this.font = font;
	}

	applyTheme(target, text = '', background = '', font = '') {
		$(target).removeClass();
		$(target).addClass(`${text || this.text} ${background || this.background} ${font || this.font}`);
	}

	applyDefault(target) {
		this.applyTheme(target);
	}
}
