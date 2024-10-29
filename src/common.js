app.service("myservice", function () {
     this.responsiveResize= function(elemId, screenId) { 
        var h = $("#"+elemId).height();
        var w = $("#"+elemId).width();
        var hs;
        var ws;
    
        if(screenId){
            hs = $("#"+screenId).height();
            ws = $("#"+screenId).width();
        } else {
            hs = window.innerHeight;
            ws = window.innerWidth;
        }
        
    
        var dim = [];
    
        var perc = (100*w)/h;
        var percs = (100*ws)/hs;
    
        if(percs < perc){
            dim[0] = "auto"; // new height
            dim[1] = ws + "px"; // new width
        } else {
            dim[0] = hs + "px";
            dim[1] = "auto";
        }
    
        return dim;
    }
	  
	 this.responsiveCenter= function(elemid, screenId) { 
        var padding, hs, ws, pt, pl;
        var h = $("#"+elemid).height();
        var w = $("#"+elemid).width();

        if(screenId){
            hs = $("#"+screenId).height();
            ws = $("#"+screenId).width();
        } else {
            hs = window.innerHeight;
            ws = window.innerWidth;
        }

        pt = (hs-h)/2;
        pl = (ws-w)/2;

        padding = pt+"px 0px 0px "+pl+"px";
        
        return padding;
	}
	
	
	/* *** 
	Use responsiveInput function in order to keep a responsive width of an input DOM element.
	Provides:
		- initialNumbers: the numbers that can be fully contained in the smallest input
		- initialWidth: the initial width before the next action (remove or add digit) on the input
		- currentNumbers: how many numbers (or characters) are present after the action
		- minWidth: the minimum width of the input (that contains fully initialNumbers elements). This must
		  be setted as min-width in css
	*** */
     this.responsiveInput = function(initialNumbers, initialWidth, currentNumbers, minWidth) {
        var newSize = initialWidth;
        if(currentNumbers>initialNumbers){
            var deltaSize = minWidth/(initialNumbers);
            var newSize = deltaSize*currentNumbers;
        } else if (currentNumbers==initialNumbers) {
            var newSize = 0;
        }
        return newSize;
    }
});
