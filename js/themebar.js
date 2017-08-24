let initialTheme = $('body').attr('class').split(/\s+/g);

function defaultTheme() {
	function generateValues(selector) {
		let targetObject = {};
		$(selector).each((index, element) => {
			targetObject[element.value] = element.value;
		});
		return targetObject;
	}

	function selectValue(id, value) {
		$(id).val(value);
		$(`${id} > option[value="${value}"]`).attr('selected', 'true');
	}

	let textValues = generateValues('#text > option'),
		backgroundValues = generateValues('#background > option'),
		fontValues = generateValues('#font > option');

	$('#theme option[selected]').removeAttr('selected');
	for (let cssClass of initialTheme) {
		if (cssClass in textValues) {
			selectValue('#text', cssClass);
		}
		else if (cssClass in backgroundValues) {
			selectValue('#background', cssClass);
		}
		else if (cssClass in fontValues) {
			selectValue('#font', cssClass)
		}
	}
	handleTheme();
}

function handleTheme() {
	let textColor = $('#text').val(), backgroundColor = $('#background').val(), fontFamily = $('#font').val();
	console.log(`TEXT: ${textColor} BACKGROUND: ${backgroundColor} FONT-FAMILY: ${fontFamily}`)
	if (`${textColor}-background` !== backgroundColor) {
		$('body').removeClass($('body').attr('class'));
		$('body').addClass(`${textColor} ${backgroundColor} ${fontFamily}`);
	} else {
		console.log('CONFLICTING THEME');
		defaultTheme();
	}
}
