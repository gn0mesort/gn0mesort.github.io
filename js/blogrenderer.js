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
	constructor(repo, flavor = 'github', settings = {}) {
		this[PRIVATE] = {};
		this[PRIVATE].engine = new showdown.Converter();
		
		this.blogUrls = { html: `https://github.com/${repo}/blob/master`, api: `https://api.github.com/repos/${repo}` };

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

function generateBlogMetaData(index, blogs, blogUrls) {
	let data = JSON.parse(sessionStorage[`blogs-${index}`]);
	let byline = 'by&nbsp;';

	for (let author in data.authors) {
		byline += `<a href="mailto:${author}">${data.authors[author]}</a>&nbsp;`
	}
	$(`#blogs-${index}-metadata`).append(`
	<div class="title"><a href="${blogUrls.html}/${blogs[index]}">${blogs[index]}</a></div>
	<div class="space"></div>
	<div class="author">${byline}</div>
	<div id="commit-time" class="date">last commit:&nbsp;<a href="${data.lastCommit.url}">${new Date(data.lastCommit.date).toLocaleString()}</a></div>
	<div id="author-time" class="date">created at:&nbsp;<a href="${data.firstCommit.url}">${new Date(data.firstCommit.date).toLocaleString()}</a></div>
	`);
}

function loadBlog(repo, blogPath, target, count = 0, startAt = 0) {
	let renderer = new Renderer(repo, 'github', {
		customizedHeaderId: true,
		ghCompatibleHeaderId: true,
		parseImgDimensions: true
	});
	$.get(`${blogPath}/latest.txt`).done((resp) => {
		let blogs = resp.split(/\n|\r|(?:\r\n)/g);
		$(target).text('');
		for (let i = startAt; i < (count < blogs.length && count !== 0 ? count : blogs.length); ++i) {
			$(target).append(`
			<div id="blogs-${i}" class="blog-post">
			<div id="blogs-${i}-metadata"></div>
			<div class="space"></div>
			</div>
			<div class="space"></div>
			`);
			$.get(`https://api.github.com/rate_limit`).done((resp) => {
				if (!sessionStorage[`blogs-${i}`]) {
					sessionStorage[`blogs-${i}`] = JSON.stringify({ cacheTime: 0 });
				}
				if (resp.rate.remaining && JSON.parse(sessionStorage[`blogs-${i}`]).cacheTime + 60000 < Date.now()) {
					$.get(`${renderer.blogUrls.api}/commits?path=${blogs[i]}`).done((resp) => { 
						let authors = {};
						let lastCommit = { url: resp[0].html_url, date: resp[0].commit.committer.date };
						let firstCommit = { url: resp[resp.length - 1].html_url, date: resp[resp.length - 1].commit.committer.date };
						for (let element of resp) {
							authors[element.commit.committer.email] = element.commit.committer.name;
						}
						sessionStorage[`blogs-${i}`] = JSON.stringify({
							authors: authors,
							lastCommit: lastCommit,
							firstCommit: firstCommit,
							cacheTime: Date.now()
						})
					}).always(() => {
						generateBlogMetaData(i, blogs, renderer.blogUrls);
					});
				} else {
					generateBlogMetaData(i, blogs, renderer.blogUrls);
				}
			});
			renderer.load(`${blogPath}/${blogs[i]}`).then((markdown) => {
				$(`#blogs-${i}`).append(renderer.make(markdown));
			});
		}
	})
}
