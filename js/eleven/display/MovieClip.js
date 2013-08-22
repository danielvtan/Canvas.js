MovieClip.prototype = new DisplayObject();
MovieClip.prototype.constructor = MovieClip;
function MovieClip() {
    DisplayObject.apply(this, arguments);
    
    this.width = this.texture.data[0][2];
    this.height = this.texture.data[0][3];

	this.currentFrame = 0;
	this.totalFrames;
	
	this.frameDelay = 10;
	this.ctrSpeed = 0;
	this.stopFrame = false;
	
	var thisClass = this;
    
    this.totalFrames = this.texture.data.length;
    
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

