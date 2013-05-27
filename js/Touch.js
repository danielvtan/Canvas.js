
function MultiTouch(){
	
	var stage = new Stage("canvas", 400, 400, 30);
	stage.clearFrames = true;
	var isMouseDown = false;
	
	onInit();
	function onInit(){
		
		stage.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
		stage.addEventListener(MouseEvent.MOUSE_UP, onMouseUp);
		stage.addEventListener(MouseEvent.MOUSE_MOVE, onMouseMove);
		
		stage.addEventListener(TouchEvent.TOUCH_START, onTouchStart);
		stage.addEventListener(TouchEvent.TOUCH_STOP, onTouchStop);
		stage.addEventListener(TouchEvent.TOUCH_MOVE, onTouchMove);

	}
	function onTouchStop(e){
		
		if (e.touches) {
			// Touch event
			if (e.touches.offsetX) {
				alert("offsetX");
			}
			else if (e.touches.layerX) {
				alert("layerX");
			}
			else {
				
				onMouseUp(e.touches[0]);
			}
		}
		e.preventDefault();
	}
	function onTouchMove(e){
		if (e.touches) {
			// Touch event
			if (e.touches.offsetX) {
				alert("offsetX");
			}
			else if (e.touches.layerX) {
				alert("layerX");
			}
			else {
				
				onMouseMove(e.touches[0]);
			}
		}
		e.preventDefault();
	}
	function onTouchStart(e){
		alert(e)
		if (e.touches) {
			// Touch event
			if (e.touches.offsetX) {
				alert("offsetX");
			}
			else if (e.touches.layerX) {
				alert("layerX");
			}
			else {
				
				onMouseDown(e.touches[0]);
			}
		}
		e.preventDefault();
	}
	function onMouseDown(e){
		stage.graphics.beginPath();
		//stage.graphics.moveTo(e.x, e.y);
		//console.log(e.x + " " + e.y)

		isMouseDown = true;
     	console.log("mouse down " + isMouseDown)
    }
	function onMouseMove(e){
		if(!isMouseDown)
			return;
		
		stage.graphics.lineTo(e.x, e.y);
		stage.graphics.moveTo(e.x, e.y);
		
   		stage.graphics.stroke();
		
		//console.log(e.x + " " + e.y)
		
    }
	
	function onMouseUp(e){
		//console.log(e.x + " " + e.y)
		
		isMouseDown = false;
     	console.log("mouse down " + isMouseDown)
    }
	
	
	
	
}