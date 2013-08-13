/**
*	eleven js
*	@author Daniel Tan
*   @email daniel@eleventap.com
*	
*/

MovieClip.prototype = new DisplayObject();
MovieClip.prototype.constructor = MovieClip;
function MovieClip(imageLink)
{
    DisplayObject.apply(this, arguments);
    this.defaultTarget = undefined;
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
					//console.log(thisClass.name + " " + thisClass.imageCount);
				 };
		}
	}
	
	var thisClass = this;
    
    this.isReady = function(){
        if(thisClass.imageCount >= thisClass.totalFrames){
            return true;	
        }
        return false;
    }
    this.updateFrames = function(){
        if(thisClass.ctrSpeed >= thisClass.frameDelay){
            thisClass.currentFrame++;	
            if(thisClass.currentFrame >= thisClass.totalFrames){
                thisClass.currentFrame = 0;	
            }else{
                
            }
            thisClass.ctrSpeed = 0;
        }
        
        thisClass.ctrSpeed++;
    };
   this.gotoAndStop = function(frame){
        thisClass.stopFrame = true;
        thisClass.currentFrame = frame;
    };
    this.gotoAndPlay = function(frame){
        thisClass.stopFrame = false;
        thisClass.currentFrame = frame;
    };
    this.play = function(){
        thisClass.stopFrame = false;
    };
    this.stop = function(){
        thisClass.stopFrame = true;
    };

}

