megatech = function(){
    navigate = function(location){
        if(location){
            document.location = location;
        }
    };

    cycleSpinner = function(items, currentIndex){
        items.eq(currentIndex - 1).fadeToggle();
        items.eq(currentIndex).fadeToggle();        
    };

    handleNavBar = function(navbar){
        var navLinks = navbar.getElementsByTagName("a");

        for(var i = 0; i < navLinks.length; ++i){
            console.log(navLinks[i].href);
            if(document.location.href === navLinks[i].href){
                navLinks[i].href = "#";
            }
        }
    };

    return {
        navigate,
        handleNavBar,
        cycleSpinner
    };
}();