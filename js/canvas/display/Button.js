/**
*	eleven js
*	@author Daniel Tan
*   @email daniel@eleventap.com
*	
*/
Button.prototype = new DisplayObject();
Button.prototype.constructor = Button;
function Button(imageLink)
{
	this.isButton = true;
	
	this.state;
	
	this.stopFrame = false;
	
	
	if(imageLink != undefined){
		this.image = [];
		this.state = 0;
		for(var i = 0; i< imageLink.length; i++){
			this.image[i] = new Image();
			this.image[i].src = imageLink[i];
			this.image[i].onload = function() {
				
				 };
		}
	}
	
	this.addEventListener("MOUSE_MOVE", onMouseUp);
	this.addEventListener("MOUSE_OUT", onMouseOut);
	thisButton = this;
	function onMouseUp(e){
		thisButton.state = 1;
	}
	function onMouseOut(e){
		thisButton.state = 0;
	}
}
/*MovieClip.prototype.updateFrames = function(){
	if(this.ctrSpeed == this.frameDelay){
		this.currentFrame++;	
		if(this.totalFrames == this.currentFrame){
			this.currentFrame = 0;	
		}else{
			
		}
		this.ctrSpeed = 0;
	}
	
	this.ctrSpeed++;
}
MovieClip.prototype.gotoAndStop = function(frame){
	this.stopFrame = true;
	this.currentFrame = frame;
}
MovieClip.prototype.gotoAndPlay = function(frame){
	this.currentFrame = frame;
}
MovieClip.prototype.play = function(){
	this.stopFrame = false;
}
MovieClip.prototype.stop = function(){
	this.stopFrame = true;
}
*/

