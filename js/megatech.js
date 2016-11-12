megatech = function(){
    navigate = function(location){
        if(location){
            document.location = location;
        }
    };

    handleNavBar = function(navbar){
        var currentLocation = document.location;
        var navLinks = navbar.getElementsByTagName("a");

        for(var i = 0; i < navLinks.length; ++i){
            console.log(navLinks[i].href);
            if(document.location.href === navLinks[i].href){
                navLink[i].href = "#";
            }
        }
    };

    return {
        navigate,
        handleNavBar
    };
}();