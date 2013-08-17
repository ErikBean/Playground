$(document).ready(function(){
    $( "button.close" ).click(function() {
        var box=$( this ).parents("div");
        
       
        
        if(box.hasClass("minimized")){
            box.find("h4").fadeIn();
            box.animate({width: '95%'});
            box.animate({height: '50%'},'slow');
            box.children("section").slideDown();
            $( this ).html("x");
        }
        else{
            $( this ).html("v");
            box.animate({height: '28px'},'slow');
            box.children("section").slideUp();
            box.animate({width: '30px'}).find("h4").fadeOut();
           
        }
        box.toggleClass("minimized");
        box.toggleClass("maximized");
        
    });

    
});