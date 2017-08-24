const THEME_JS_PRIVATE = Symbol('theme.js');

class Theme {
	constructor(text = '', background = '', font = '') {
		this[THEME_JS_PRIVATE] = {};
		this[THEME_JS_PRIVATE].defaultText = text;
		this[THEME_JS_PRIVATE].defaultBackground = background;
		this[THEME_JS_PRIVATE].defaultFont = font;
		this[THEME_JS_PRIVATE].currentText = text;
		this[THEME_JS_PRIVATE].currentBackground = background;
		this[THEME_JS_PRIVATE].currentFont = font;
	}

	get defaultTheme() {
		return new Theme(this[THEME_JS_PRIVATE].defaultText, this[THEME_JS_PRIVATE].defaultBackground, this[THEME_JS_PRIVATE].defaultFont);
	}

	get currentTheme() {
		return new Theme(this[THEME_JS_PRIVATE].currentText, this[THEME_JS_PRIVATE].currentBackground, this[THEME_JS_PRIVATE].currentFont);
	}

	get text() {
		return this[THEME_JS_PRIVATE].currentText;
	}

	get background() {
		return this[THEME_JS_PRIVATE].currentBackground;
	}

	get font() {
		return this[THEME_JS_PRIVATE].currentFont;
	}

	applyTheme(target, text = '', background = '', font = '') {
		this[THEME_JS_PRIVATE].currentText = text;
		this[THEME_JS_PRIVATE].currentBackground = background;
		this[THEME_JS_PRIVATE].currentFont = font;
		$(target).removeClass();
		$(target).addClass(`${this.text} ${this.background} ${this.font}`);
	}

	applyDefault(target) {
		this.applyTheme(target, this[THEME_JS_PRIVATE].defaultText, this[THEME_JS_PRIVATE].defaultBackground, this[THEME_JS_PRIVATE].defaultFont);
	}
}
