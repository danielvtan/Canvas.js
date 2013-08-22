
DisplayObject.prototype = new EventDispatcher();
DisplayObject.prototype.constructor = DisplayObject;
function DisplayObject(texture) {
    EventDispatcher.apply(this, arguments);

    this.texture = texture;

	this.width = 0;
	this.height = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.fillColor = '#f00';
	
	this.rotation = 0;
	
	this.visible = true;
	this.showBounds = false;
	this.borderColor = '#f00';
	this.x = 0;
	this.y = 0;
	
	this.centerRegistrationPoint = false;
	
	this.fill = false;

	this.parent;
	
    this.mouseOver = false;
    this.mouseDown = false;
    this.mouseX;
    this.mouseY;
    
    var thisClass = this;
	
    this.hitTestPoint = function(point){
        if(thisClass.y + thisClass.height > point.y && thisClass.x + thisClass.width > point.x && thisClass.x < point.x && thisClass.y < point.y){
            return true;
        }
        return false;
    };
    this.hitTestObject = function(gameObject){
        if(thisClass.y + thisClass.height > gameObject.y && thisClass.x + thisClass.width > gameObject.x && thisClass.x < gameObject.x + gameObject.width  && thisClass.y < gameObject.y + gameObject.height){
            return true;
        }
    };

}

