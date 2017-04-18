Megatech = function () {
  this.handleNavBar = function (navbar) {
    var navLinks = navbar.getElementsByTagName('a')
    for (var i = 0; i < navLinks.length; ++i) {
      console.log(navLinks[i].href)
      if (document.location.href === navLinks[i].href) {
        navLinks[i].href = '#'
      }
    }
  }
}
