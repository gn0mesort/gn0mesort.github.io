function defaultTheme() {
	$('#text').val($('#text > option[selected]').val());
	$('#background').val($('#background > option[selected]').val());
	$('#font').val($('#font > option[selected]').val());
	handleTheme();
}

function handleTheme() {
	let textColor = $('#text').val(), backgroundColor = $('#background').val(), fontFamily = $('#font').val();
	console.log(`TEXT: ${textColor} BACKGROUND: ${backgroundColor} FONT-FAMILY: ${fontFamily}`)
	if (textColor !== backgroundColor) {
		$('body').removeClass($('body').attr('class'));
		$('body').addClass(`${textColor} ${backgroundColor}-background ${fontFamily}`);
	} else {
		console.log('CONFLICTING THEME');
		defaultTheme();
	}
}
