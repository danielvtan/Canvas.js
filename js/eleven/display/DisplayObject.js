/**
*	eleven js
*	@author Daniel Tan
*   @email daniel@eleventap.com
*	
*/

DisplayObject.prototype = new EventDispatcher();
DisplayObject.prototype.constructor = DisplayObject;
function DisplayObject(){
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
	
	
	
	
}
DisplayObject.prototype.addEventListener = function(eventType, eventReciever){
	
	this.mouseEvents[eventType].push(eventReciever);
};
DisplayObject.prototype.hitTestPoint = function(point){
	if(this.y + this.height > point.y && this.x + this.width > point.x && this.x < point.x && this.y < point.y){
	 	return true;
	}
	return false;
};
DisplayObject.prototype.hitTestObject = function(gameObject){
	if(gameObject == -1)
		return false;	
	
	if(this.y + this.height > gameObject.y && this.x + this.width > gameObject.x && this.x < gameObject.x + gameObject.width  && this.y < gameObject.y + gameObject.height){
		
		return true;
	}
};
DisplayObject.prototype.drawArc = function(x, y,radius, startAngle, endAngle, anticlockwise){
	this.arc = new Object();
	this.arc.x = x;
	this.arc.y = y;
	this.arc.radius = radius;
	this.arc.startAngle = startAngle;
	this.arc.endAngle = endAngle;
	this.arc.anticlockwise = anticlockwise;
};
DisplayObject.prototype.getArc = function(){
		
		return this.arc;
	};

