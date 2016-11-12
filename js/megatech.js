megatech = function(){
    navigate = function(location){
        if(location){
            document.location = location;
        }
    };

    return {
        navigate,
    };
}();