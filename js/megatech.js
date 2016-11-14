megatech = function(){
    navigate = function(location){
        if(location){
            document.location = location;
        }
    };

    cycleSpinner = function(items, currentIndex){
        var item = items.eq(currentIndex);
        items.hide();
        item.fadeToggle(1000);        
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