$.getScript('../js/navbar.js', function () {
  let navbar = new Navbar('../img/logo.png')
  let projects = new DropDown('Projects')
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
  let about = new NavLink('../about', '', 'About')
  let contact = new NavLink('../contact', '', 'Contact')
  navbar.elements.push(projects)
  navbar.elements.push(about)
  navbar.elements.push(contact)


  navbar.appendNavbar($('#navbar'))
  navbar.handleNavbar($('#navbar'))
  $('#navbar ul').attr('class', 'glow')
  $('#navbar button').attr('class', 'monospace green glow')
  $('#navbar div[class="dropdowncont]"').attr('class', 'dropdowncont transbox')
})
