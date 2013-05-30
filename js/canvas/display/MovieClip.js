/**
*	eleven js
*	@author Daniel Tan
*   @email daniel@eleventap.com
*	
*/


function MovieClip(imageLink) {
    MovieClip.prototype = new DisplayObject();
    MovieClip.prototype.constructor = MovieClip;
    DisplayObject.apply(this, arguments);
    
	this.isMovieClip = true;
	
	this.currentFrame;
	this.totalFrames;
	
	this.frameDelay = 10;
	this.ctrSpeed = 0;
	this.stopFrame = false;
	
	
	if(imageLink != undefined){
		this.image = [];
		this.totalFrames = imageLink.length;
		this.currentFrame = 0;
		this.imageLoaded = false;
		this.imageCount = 0;
		for(var i = 0; i< imageLink.length; i++){
			this.image[i] = new Image();
			this.image[i].src = imageLink[i];
			this.image[i].onload = function() {
					thisClass.imageCount++;
					console.log(thisClass.name + " " + thisClass.imageCount);
				 };
		}
	}
	var thisClass = this;
    
    this.isReady = function(){
        if(this.imageCount >= this.totalFrames){
            return true;	
        }
        return false;
    }
    this.updateFrames = function(){
        if(this.ctrSpeed >= this.frameDelay){
            this.currentFrame++;	
            if(this.currentFrame >= this.totalFrames){
                this.currentFrame = 0;	
            }else{
                
            }
            this.ctrSpeed = 0;
        }
        
        this.ctrSpeed++;
    };
    this.gotoAndStop = function(frame){
        this.stopFrame = true;
        this.currentFrame = frame;
    };
    this.gotoAndPlay = function(frame){
        this.stopFrame = false;
        this.currentFrame = frame;
    };
    this.play = function(){
        this.stopFrame = false;
    };
    this.stop = function(){
        this.stopFrame = true;
    };
}


