/**
*	eleven js
*	@author Daniel Tan
*   @email daniel@eleventap.com
*	
*/
Sprite.prototype = new DisplayObject();
Sprite.prototype.constructor = Sprite;
function Sprite(imageLink)
{
    DisplayObject.apply(this, arguments);
    
	this.isSprite = true;
	
	
	if(imageLink != undefined){
		this.image = new Image();
		this.image.src = imageLink;
		this.image.onload = function() {
			
		};
	}
	
	var thisClass = this;
    this.isReady = function(){
        if(this.image.complete){
            return true;	
        }
        return false;
    }

	
}
