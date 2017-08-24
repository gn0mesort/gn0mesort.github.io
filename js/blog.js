const BLOG_JS_PRIVATE = Symbol('blog.js');

class Blog {
	constructor(markdown, filename = '', created = {}, updated = {}, authors = {}, cacheDuration = 60000, cacheTime = 0) {
		this[BLOG_JS_PRIVATE] = {};
		this[BLOG_JS_PRIVATE].cacheTime = cacheTime;
		this[BLOG_JS_PRIVATE].cacheDuration = cacheDuration;

		this.markdown = markdown;
		this.filename = filename;
		this.created = created;
		this.updated = updated;
		this.authors = authors;
	}

	get cacheTime() {
		return this[BLOG_JS_PRIVATE].cacheTime;
	}

	get cacheDuration() {
		return this[BLOG_JS_PRIVATE].cacheDuration;
	}

	get byLine() {
		let r = '';
		for (let author in this.authors) {
			r += `<a href="mailto:${author}">${this.authors[author]}</a>&nbsp;`
		}
		return r;
	}

	get safeFilename() {
		return this.filename.replace('.', '-');
	}

	toJSON() {
		return {
			markdown: this.markdown,
			filename: this.filename,
			created: this.created,
			updated: this.updated,
			authors: this.authors,
			cacheTime: this.cacheTime,
			cacheDuration: this.cacheDuration
		};
	}

	toHtml(baseUrl = '') {
		return `
			<div id="blog-${this.safeFilename}" class="blog-post">
				<div id="blog-${this.safeFilename}-metadata">
					<div><a href="${baseUrl}/blob/master/${this.filename}"><span class="filename">${this.filename}</span></a></div>
					<div><span class=author>by&nbsp;${this.byLine}</span></div>
					<div><span class=date>last update:&nbsp;<a href="${this.updated.url}">${new Date(this.updated.date).toLocaleString() || 'API ERROR'}</a></span></div>
					<div><span class=date>&nbsp;created at:&nbsp;<a href="${this.created.url}">${new Date(this.created.date).toLocaleString() || 'API ERROR'}</a></span></div>
				</div>
				<div id="blog-${this.safeFilename}-content">${this.markdown}</div>
			</div>
		`;
	}
}

class BlogEngine {
	constructor(repo, flavor = 'github', settings = {}) {
		this[BLOG_JS_PRIVATE] = {};
		this[BLOG_JS_PRIVATE].converter = new showdown.Converter();

		this.repo = repo;

		this[BLOG_JS_PRIVATE].converter.setFlavor(flavor);
		for (let setting in settings) {
			this[BLOG_JS_PRIVATE].converter.setOption(setting, settings[setting]);
		}
	}

	get apiUrl() {
		return `https://api.github.com/repos/${this.repo}`
	}

	get htmlUrl() {
		return `https://github.com/${this.repo}/blob/master`
	}

	makeHtml(blog) {
		let html = $(blog.toHtml(this.htmlUrl));
		let markdownLocation = html.find(`#blog-${blog.safeFilename}-content`);
		let markdown = markdownLocation.text();
		markdownLocation.text('');
		html.html(`${html.html()}${this[BLOG_JS_PRIVATE].converter.makeHtml(markdown)}`);
		return html;
	}

	appendBlog(target, blog) {
		$(target).append(this.makeHtml(blog)).append('<div class="space"></div>');
	}

	static async loadBlog(path, repo, target, startAt = 0, count = 0) {
		let engine = new BlogEngine(repo, 'github', {
			customizedHeaderId: true,
			ghCompatibleHeaderId: true,
			parseImgDimensions: true
		}),
		blogs = (await $.get(`${path}/latest.txt`)).split(/\n|\r|(?:\r\n)/g),
		rateLimit = (await $.get('https://api.github.com/rate_limit')).rate;
			
		$(target).text('');
		for (let i = startAt; i < (count < blogs.length && count !== 0 ? count : blogs.length); ++i) {
			let parsedBlog = null,
			commits = null;

			if ((!sessionStorage[`${repo}-blogs-${i}`] || sessionStorage[`${repo}-blogs-${i}`].cacheTime + sessionStorage[`${repo}-blogs-${i}`].cacheDuration < Date.now()) && rateLimit.remaining > 0) {
				commits = await $.get(`${engine.apiUrl}/commits?path=${blogs[i]}`);
			}
			if (commits) {
				let created = { 
					url: commits[commits.length - 1].html_url,
					date: commits[commits.length - 1].commit.committer.date
				},
				updated = {
					url: commits[0].html_url,
					date: commits[0].commit.committer.date
				},
				authors = commits.reduce((acc, elem) => {
					acc[elem.commit.committer.email] =  elem.commit.committer.name;
					return acc;
				}, {});
				parsedBlog = new Blog(await $.get(`${path}/${blogs[i]}`), blogs[i], created, updated, authors, 120000, Date.now());
			}
			else {
				let cachedBlog = JSON.parse(sessionStorage[`${repo}-blogs-${i}`]);
				parsedBlog = new Blog(cachedBlog.markdown, cachedBlog.filename, cachedBlog.created, cachedBlog.updated, cachedBlog.authors, cachedBlog.cacheDuration, cachedBlog.cacheTime);
			}
			sessionStorage[`${repo}-blogs-${i}`] = JSON.stringify(parsedBlog);
			engine.appendBlog(target, parsedBlog);
		}
	}
}