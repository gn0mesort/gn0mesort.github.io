var Navbar = function (logo, elements) {
  this.logo = logo || ''
  this.elements = elements || []
  this.appendNavBar = function (element) {
    let navbar = $(`<div><ul><li><a href="/"><img class="icon" src="${this.logo}" alt="home" /></a></li></ul><hr /></div>`)
    let linkList = $('ul', navbar)
    for (let element of this.elements) {
      let link = $('<li></li>').appendTo(linkList)
      element.toElement().appendTo(link)
      $('<span>&nbsp;/&nbsp;</span>').appendTo(linkList)
    }

    navbar.appendTo(element)
  }
  this.handleNavBar = function (navbar) {
    let navLinks = navbar.getElementsByTagName('a')
    for (let link of navLinks) {
      console.log(link.href)
      if (document.localName.href === link.href) {
        link.href = '#'
      }
    }
  }
}

var NavLink = function (href, title, text) {
  this.href = href || ''
  this.title = title || ''
  this.text = text || ''
  this.toElement = function () {
    return $(`<a class="navlink" href=${this.href} title=${this.title}>${this.text}</a>`)
  }
}

var DropDown = function (text, links) {
  this.text = text || ''
  this.links = links || []
  this.toElement = function () {
    let nav = $('<nav class="dropdown></nav>')
    $(`<button class="dropdownbtn" disabled="true">${this.text}</button>`).appendTo(nav)
    let navLinks = $('<div class="dropdowncont"></div>')
    for (let link of links) {
      link.toElement().appendTo(navLinks)
    }
    navLinks.appendTo(nav)
    return nav
  }
}
