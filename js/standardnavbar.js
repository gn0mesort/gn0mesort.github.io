var navbar = new Navbar('../img/logo.png')
var projects = new DropDown('Projects')
projects.links.push(new NavLink(
  '../welcome',
  'A page containing useful links for getting up to speed after getting a new computer.',
  'Welcome'
))
projects.links.push(new NavLink(
  '../clock',
  'A simple alarm clock',
  'Clock'
))
var about = new NavLink('../about', '', 'About')
var contact = new NavLink('../contact', '', 'Contact')
navbar.elements.push(projects)
navbar.elements.push(about)
navbar.elements.push(contact)

navbar.appendNavbar($('#navbar'))
navbar.handleNavbar($('#navbar'))
$('#navbar ul').attr('class', 'glow')
$('#navbar button').attr('class', 'dropdownbtn monospace green glow')
$('#navbar div[class="dropdowncont"]').attr('class', 'dropdowncont transbox')
$('#navbar nav[class="dropdown"]').on('mouseenter.navbar', function () {
  $('#navbar #navigation').css('height', '15vw')
  console.log('focus')
})
$('#navbar nav[class="dropdown"]').on('mouseleave.navbar', function () {
  $('#navbar #navigation').css('height', '2vw')
  console.log('focus')
})
