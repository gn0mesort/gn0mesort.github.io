const PRIVATE = Symbol('private');

class Extension {
	constructor(type = 'lang', regex = /.*/g, replace = '', filter = undefined) {
		this.type = type;
		this.regex = regex;
		this.replace = replace;
		this.filter = filter;
	}
}

class Renderer {
	constructor(flavor = 'github', settings = {}) {
		this[PRIVATE] = {};
		this[PRIVATE].engine = new showdown.Converter();
		
		this[PRIVATE].engine.setFlavor(flavor);
		for (let setting in settings) {
			this[PRIVATE].engine.setOption(setting, settings[setting]);
		}
	}

	load(url) {
		return new Promise ((resolve, reject) => {
			$.ajax(url).done((resp) => {
				resolve(resp);
			}).fail((jqXHR, textStatus, errorThrown) => {
				reject(errorThrown);
			})
		});
	}

	make(markdown) {
		return this[PRIVATE].engine.makeHtml(markdown);
	}
}
