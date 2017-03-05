var Navbar = function (logo, elements) {
  this.logo = logo || ''
  this.elements = elements || []
  this.appendNavbar = function (element) {
    let navbar = $(`<div><nav id="navigation"><ul><li><a href="/"><img class="icon" src="${this.logo}" alt="home" /></a></li><span>&nbsp;/&nbsp;</span></ul></nav><hr /></div>`)
    let linkList = $('ul', navbar)
    for (let element of this.elements) {
      let link = $('<li></li>').appendTo(linkList)
      console.dir(element.toElement())
      element.toElement().appendTo(link)
      $('<span>&nbsp;/&nbsp;</span>').appendTo(linkList)
    }

    navbar.appendTo(element)
  }
  this.handleNavbar = function (navbar) {
    let navLinks = $('a', navbar)
    for (let link of navLinks) {
      console.log(link.href)
      if (document.location.href === link.href) {
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
    for (let link of this.links) {
      link.toElement().appendTo(navLinks)
    }
    navLinks.appendTo(nav)
    return nav
  }
}
