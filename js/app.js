$(document).foundation();
$(document).ready(function (){
    $("ul.navFly > li.has-dropdown > a").hover(
        function() {
            $(this).parent('li').children('.has-dropdown').removeClass('hide');
        },
        function() {
            $(this).parent('li').children('.has-dropdown').addClass('hide');
        }
        
    );
    $("li.has-dropdown > ul.has-dropdown").hover(
        function() {
            $(this).removeClass("hide");
        },
        function() {
            $(this).addClass("hide");
        }
    )    
});