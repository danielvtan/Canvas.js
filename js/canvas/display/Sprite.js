
function Sprite(imageLink) {
    Sprite.prototype = new DisplayObject();
    Sprite.prototype.constructor = Sprite;
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


