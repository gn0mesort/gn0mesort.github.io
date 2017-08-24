/**
 * Generate a random number between low and high
 * @param {Number} low The lower bound to use. Defaults to 0
 * @param {Number} high The upper bound to use. Defaults to Number.MAX_SAFE_INTEGER
 * @return {Number} The generated number
 */
function rand(low, high) {
  if (!low || low < 0) { // If low is undefined or less than 0
    low = 0 // Set low to 0
  }
  if (!high || high > Number.MAX_SAFE_INTEGER) { // If high is undefined or greater than Number.MAX_SAFE_INTEGER
    high = Number.MAX_SAFE_INTEGER // Set high to Number.MAX_SAFE_INTEGER
  }
  return Math.floor(Math.random() * (high - low) + low) // Return a random value between low and high
}

function generateShowcase() {
	const API_URL = 'https://api.xivdb.com/character';

	let showcase = $('#showcase');
	showcase.text('');
	$.get('../vbco-news/memberindex.json').done((resp) => {
		//let resp = JSON.parse('{"members":[{"lodestone_id": 14262160,"quote": "I know many things."}]}');
		let member = resp.members[rand(0, resp.members.length)];
		$.get(`${API_URL}/${member.lodestone_id}`).done((resp) => {
			Object.assign(member, resp);
			showcase.append(`
			<div class="frame">
			<img class="frame" src="${member.avatar}" alt="${member.name}" title="${member.name}"/>
			<h3 class="fantasy">
			<a href="https://xivdb.com/character/${member.lodestone_id}/${member.name.toLowerCase().replace(' ', '+')}" title="Level ${member.data.active_class.progress.level} ${member.data.active_class.role.name}">${member.name}<br />${member.data.title}</a>
			</h3>
			<p></p>
			<p>&quot;${member.quote}&quot;</p>
			</div>
			`);
		});
	});
}