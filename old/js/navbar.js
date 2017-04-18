var Navbar = function (logo, elements) {
  this.logo = logo || ''
  this.elements = elements || []
  this.appendNavbar = function (element) {
    var navbar = $(`<div><nav id="navigation"><ul><li><a href="/"><img class="icon" src="${this.logo}" alt="home" /></a></li><span>&nbsp;/&nbsp;</span></ul></nav><hr /></div>`)
    var linkList = $('ul', navbar)
    for (var elem of this.elements) {
      var link = $('<li></li>').appendTo(linkList)
      elem.toElement().appendTo(link)
      $('<span>&nbsp;/&nbsp;</span>').appendTo(linkList)
    }

    navbar.appendTo(element)
  }
  this.handleNavbar = function (navbar) {
    var navLinks = $('a', navbar)
    for (var link of navLinks) {
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
    var nav = $('<nav class="dropdown"></nav>')
    $(`<button class="dropdownbtn" disabled="true">${this.text}</button>`).appendTo(nav)
    var navLinks = $('<div class="dropdowncont"></div>')
    for (var link of this.links) {
      link.toElement().appendTo(navLinks)
    }
    navLinks.appendTo(nav)
    return nav
  }
}