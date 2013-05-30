/**
*	eleven js
*	@author Daniel Tan
*   @email daniel@eleventap.com
*	
*/

//Element.prototype = new DisplayObject();
//Element.prototype.constructor = Element;
function Element(elementID){
	
	this.isElement = true;
	
	this.elementID = elementID;
	
	var element = document.getElementById(elementID);
	this.border;
	
	this.style = getStyle();
	
	function getStyle(){
		return document.getElementById(elementID).style;	
	}
	/*
	this.element.style.width = this.width + "px";
	this.element.style.height = this.height + "px";
	this.element.style.position = "absolute";
	this.element.style.top = this.y + "px";
	this.element.style.left = this.x + "px";
	this.element.style.border =  this.border;*/
		return document.getElementById(elementID);
}