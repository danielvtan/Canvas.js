/**
*	eleven js
*	@author Daniel Tan
*   @email daniel@eleventap.com
*	
*/

DisplayObject.prototype = new EventDispatcher();
DisplayObject.prototype.constructor = DisplayObject;
function DisplayObject(){
    
    EventDispatcher.apply(this, arguments);
    
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
	
	this.mask;
	this.centerRegistrationPoint = false;
	
	this.fill = false;
	//
	this.arc = new Object();
	
	this.parent;
	
	var thisClass = this;
    
    this.mouseOver = false;
    this.mouseDown = false;
    this.mouseX;
    this.mouseY;
	
    this.hitTestPoint = function(point){
        if(thisClass.y + thisClass.height > point.y && thisClass.x + thisClass.width > point.x && thisClass.x < point.x && thisClass.y < point.y){
            return true;
        }
        return false;
    };
    this.hitTestObject = function(gameObject){
        if(gameObject == -1)
            return false;	
        if(thisClass.y + thisClass.height > gameObject.y && thisClass.x + thisClass.width > gameObject.x && thisClass.x < gameObject.x + gameObject.width  && thisClass.y < gameObject.y + gameObject.height){
            return true;
        }
    };
    this.drawArc = function(x, y,radius, startAngle, endAngle, anticlockwise){
        thisClass.arc = new Object();
        thisClass.arc.x = x;
        thisClass.arc.y = y;
        thisClass.arc.radius = radius;
        thisClass.arc.startAngle = startAngle;
        thisClass.arc.endAngle = endAngle;
        thisClass.arc.anticlockwise = anticlockwise;
    };
   this.getArc = function(){
		
		return thisClass.arc;
	};

}

