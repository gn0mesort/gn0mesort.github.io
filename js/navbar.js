function handleNavbar() {
	console.log(`CURRENT: ${document.location.href}`);
	$('#navbar a').each((index, elem) => {
		console.log(`${index}: ${elem.href}`);
		if(elem.href === document.location.href) {
			elem.href = '#';
		}
	});
}