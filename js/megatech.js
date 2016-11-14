megatech = function(){
    navigate = function(location){
        if(location){
            document.location = location;
        }
    };

    cycleSpinner = function(items, currentIndex){
        var item = $(".container div").eq(currentIndex);
        items.hide();
        item.css("display", "inline-block");

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