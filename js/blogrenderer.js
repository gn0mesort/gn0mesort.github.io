const PRIVATE = Symbol('private');
const BLOG_HTML_URL = 'https://github.com/gn0mesort/blog/blob/master';
const BLOG_API_URL = 'https://api.github.com/repos/gn0mesort/blog';

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

function loadBlog(count = 0) {
	let renderer = new Renderer('github', {
		customizedHeaderId: true,
		ghCompatibleHeaderId: true,
		parseImgDimensions: true
	});
	$.get('http://megate.ch/blog/latest.txt').done((resp) => {
		let blogs = resp.split(/\n|\r|(?:\r\n)/g);
		for (let i = 0; i < (count < blogs.length && count !== 0 ? count : blogs.length); ++i) {
			$('#blog').append(`
			<div id="blogs-${i}" class="blog-post">
			<div id="blogs-${i}-metadata"></div>
			<div class="space"></div>
			</div>
			<div class="space"></div>
			`);
			$.get(`${BLOG_API_URL}/commits?path=${blogs[i]}`).done((resp) => {
				let authors = {};
				let byline = 'by&nbsp;';
				for (let element of resp) {
					authors[element.commit.committer.email] = element.commit.committer.name;
				}
				console.log(authors)
				for (let author in authors) {
					byline += `<a href="mailto:${author}">${authors[author]}</a>&nbsp;`
				}
				$(`#blogs-${i}-metadata`).append(`
				<div class="title"><a href="${BLOG_HTML_URL}/${blogs[i]}">${blogs[i]}</a></div>
				<div class="space"></div>
				<div class="author">${byline}</div>
				<div id="commit-time" class="date">last commit:&nbsp;<a href="${resp[0].html_url}">${new Date(resp[0].commit.committer.date).toLocaleString()}</a></div>
				<div id="author-time" class="date">created at:&nbsp;<a href="${resp[resp.length - 1].html_url}">${new Date(resp[resp.length - 1].commit.committer.date).toLocaleString()}</a></div>
				`)
			});
			renderer.load(`http://megate.ch/blog/${blogs[i]}`).then((markdown) => {
				$(`#blogs-${i}`).append(renderer.make(markdown));
			});
		}
	})
}
