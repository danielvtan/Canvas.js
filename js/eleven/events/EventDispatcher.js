/**
*	eleven js
*	@author Daniel Tan
*   @email daniel@eleventap.com
*	
*/


function EventDispatcher(){
	
	
	
	//this.mouseOver = false;
	//this.mouseDown = false;
	
	//this.mouseEvents = new Object();
	//this.mouseEvents[MouseEvent.MOUSE_UP] = new Array();
	//this.mouseEvents[MouseEvent.MOUSE_MOVE] = new Array();
	//this.mouseEvents[MouseEvent.MOUSE_DOWN] = new Array();
	//this.mouseEvents[MouseEvent.MOUSE_OVER] = new Array();
	//this.mouseEvents[MouseEvent.MOUSE_OUT] = new Array();
	
	//this.mouseX;
	//this.mouseY;
	
	this.init = function(){
		this.mouseEvents = new Object();
		this.mouseEvents[MouseEvent.MOUSE_UP] = new Array();
		this.mouseEvents[MouseEvent.MOUSE_MOVE] = new Array();
		this.mouseEvents[MouseEvent.MOUSE_DOWN] = new Array();
		this.mouseEvents[MouseEvent.MOUSE_OVER] = new Array();
		this.mouseEvents[MouseEvent.MOUSE_OUT] = new Array();
		
		this.mouseOver = false;
		this.mouseDown = false;
		
		this.mouseX;
		this.mouseY;
		
	};
}



