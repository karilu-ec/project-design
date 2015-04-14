$(function() {   
    var prev = { start: 0, stop: 0},
    content = $('#news-articles div.news-item');
    
    
   var Paging = $(".pagination").paging(content.length, { // make elements navigatable
    format: '[< nc! >]', // define how the navigation should look like and in which order onFormat() get's called
    perpage: 10, // show 10 elements per page
    lapping: 0, // don't overlap pages for the moment
    page: null, // we await hashchange() event, ----start at page, can also be "null" or negative
    onSelect: function (page) {
        // add code which gets executed when user selects a page, how about $.ajax() or $(...).slice()?
        var data = this.slice;
        
        content.slice(prev[0], prev[1]).css('display', 'none');
        content.slice(data[0], data[1]).fadeIn("slow");
        
        prev = data;
        //console.log(this);
        window.scroll(0,0);
        return true;
        
        
    },
    onFormat: function (type) {
        switch (type) {
        case 'block': // n and c        
            if (!this.active)
		return '<li class="unavailable">' + this.value + '</li>';
	    else if (this.value != this.page)
		return '<li><a href="#' + this.value + '">' + this.value + '</a></li>';
	    return '<li class="current"><a href="#">' + this.value + '</a></li>';
        case 'next': // >            
            if (this.active)
		return '<li class="arrow"><a href="#' + this.value + '">&raquo;</a>';
	    return '<li class="arrow unavailable">&raquo;</li>';
        case 'prev': // <
            if (this.active)
		return '<li class="arrow"><a href="#' + this.value + '">&laquo;</a>';
            return '<li class="arrow unavailable">&laquo;</li>';
        case 'first': // [
            if (this.active)
                return '<li><a href="#' + this.value + '" class="first">First</a></li>';
	    return '<li class="unavailable">First</li>';
        case 'last': // ]
            if (this.active)
		return '<li><a href="#' + this.value + '" class="last">Last</a></li>';
	    return '<li class="unavailable">Last</li>';

        }
    }
});
function locationHashChanged() {    
    if (location.hash)
        Paging.setPage(window.location.hash.substr(1));
    else
        Paging.setPage(1);
}

window.onhashchange= locationHashChanged;
Paging.setPage(1);//when the page loads. Set page to 1
});