


var fps = new FPS();
function FPS(){
	// FPS check code by phrogz
	// link http://phrogz.net/tmp/image_move_sprites_canvas.html
	
	// fps check
	var filterStrength = 20;
	var frameTime = 0, lastLoop = new Date, thisLoop;
	var fpsOut = document.getElementById('fps');
	
	var fps;
	var show = false;
	
	setInterval(function(){
		fps = (1000/frameTime).toFixed(1) + " fps";
	},1000);

	this.check = function(){	
		// fps check
		var thisFrameTime = (thisLoop=new Date) - lastLoop;
	  	frameTime += (thisFrameTime - frameTime) / filterStrength;
	 	lastLoop = thisLoop;
		
		return fps;
	};
}