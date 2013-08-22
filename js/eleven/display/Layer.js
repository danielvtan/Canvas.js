Layer.prototype = new DisplayObjectContainer();
Layer.prototype.constructor = Layer;
function Layer(canvasID, layerWidth, layerHeight) {
    DisplayObjectContainer.apply(this, arguments);
    
    var thisClass = this;
	var canvas = document.getElementById(canvasID);
    
    this.width = layerWidth;
    this.height = layerHeight;
    
	var frames;
	var context2D;
	
	var offSetX = 0;
	var offSetY = 0;
	
	this.clearFrames = true;
	
	var backBuffer;
	var backBufferContext2D;
    
	this.renderer;

	this.getMouse = function(e){
		var mouse = {};
		mouse.x = e.pageX - offSetX;
		mouse.y = e.pageY - offSetY;	
		/*if (!isIE) {
			mouse.x = e.pageX - offSetX;
			mouse.y = e.pageY - offSetY;
		}else{
			mouse.x = event.x;
			mouse.y = event.y;
		}*/
		
		thisClass.mouseX = mouse.x;
		thisClass.mouseY = mouse.y;	
		
		return mouse;
	};
	if(supported(canvas)){ 
        thisClass.defaultTarget = canvas;
        thisClass.addListener(MouseEvent.MOUSE_MOVE, function(e){ thisClass.getMouse(e); });
		thisClass.addListener(MouseEvent.MOUSE_DOWN, function(e){ thisClass.getMouse(e); thisClass.mouseDown = true; });
		thisClass.addListener(MouseEvent.MOUSE_UP, function(e){ thisClass.getMouse(e); thisClass.mouseDown = false; });
		thisClass.addListener(MouseEvent.MOUSE_OVER, function(e){ thisClass.getMouse(e); thisClass.mouseOver = true; });
		thisClass.addListener(MouseEvent.MOUSE_OUT, function(e){ thisClass.getMouse(e); thisClass.mouseOver = false; document.body.style.cursor= "default"; });
    }
    function supported(canvas){ 
		
        if (canvas){
            canvas.setAttribute("width", layerWidth);
            canvas.setAttribute("height", layerHeight);
			offSetX = String(canvas.style.left).replace("px","");
			offSetY = String(canvas.style.top).replace("px","");

            
            context2D = canvas.getContext("2d");
			backBuffer = document.createElement('canvas');
			backBufferContext2D = backBuffer.getContext('2d');
			/*if(isIE){
				backBuffer = canvas;
				backBufferContext2D = canvas.getContext("2d");
			}else{
				backBuffer = document.createElement('canvas');
				backBufferContext2D = backBuffer.getContext('2d');
			}*/
			backBuffer.width = layerWidth;
			backBuffer.height = layerHeight;

            return true;
        }
        else {
            //alert("Your internet browser sucks, canvas not supported");
            return false;
        }
    }
	this.graphics = getContext2D();
	function getContext2D(){
		return context2D;
	}
	this.clearFrame = function(){
		backBufferContext2D.clearRect(0, 0, layerWidth, layerHeight);
		context2D.clearRect(0, 0, layerWidth, layerHeight);	
	};
    this.draw = function() {
        var e = {};
        e.type = Event.ENTER_FRAME;
        thisClass.dispatchEvent(Event.ENTER_FRAME, e)
		        
		if(thisClass.clearFrames)
			backBufferContext2D.clearRect(0, 0, layerWidth, layerHeight);

        thisClass.updateObjects(thisClass.gameObjects);
        
		context2D.clearRect(0, 0, layerWidth, layerHeight);	
		context2D.drawImage(backBuffer, 0, 0);
    };
    this.updateEvents = function(gameObject) {
        var target = {};
        target.x = thisClass.mouse.x;
        target.y = thisClass.mouse.y;
        target.target = gameObject;
        
        if(thisClass.mouseOver){
                if(!gameObject.mouseOver){
                    if(gameObject.hitTestPoint(target)){
                        gameObject.mouseOver = true;
                        
                        gameObject.dispatchEvent(MouseEvent.MOUSE_OVER, target);
                        
                        if(gameObject.buttonMode == true){
                            document.body.style.cursor= "pointer";
                        }else{
                            document.body.style.cursor= "default";
                        }
                    }
                }else if(gameObject.mouseOver){
                    if(!gameObject.hitTestPoint(target)){
                        gameObject.mouseOver = false;
                        gameObject.dispatchEvent(MouseEvent.MOUSE_OUT, target);
                        document.body.style.cursor= "default";
                    }
                }	
            }else{
                if(gameObject.mouseOver){
                    gameObject.dispatchEvent(MouseEvent.MOUSE_OUT, target);
                    gameObject.mouseOver = false;
                }
            }
            
            if(thisClass.mouseDown){
                if(gameObject.hitTestPoint(target)){
                    gameObject.dispatchEvent(MouseEvent.MOUSE_DOWN, target);
                    gameObject.mouseDown = true;
                }
            }else{
                if(gameObject.mouseDown){
                    gameObject.dispatchEvent(MouseEvent.MOUSE_UP, target);
                    gameObject.mouseDown = false;
                }
                
            }
    }
    this.updateObjects = function(objs) {
        for (var x=0; x< objs.length; x++) {
            thisClass.updateEvents(objs[x]);
            if(objs[x] instanceof DisplayObjectContainer)
                thisClass.updateObjects(objs[x].gameObjects);
            else
                thisClass.renderObject(objs[x]);
        }
    }
	this.renderObject = function(gameObject){
		if(gameObject.visible)	{	
            
            var xPos = gameObject.x + gameObject.parent.x;
            var yPos = gameObject.y + gameObject.parent.y;
            
            if(gameObject.showBounds){
                backBufferContext2D.save();
                //backBufferContext2D.translate(-10000, -yPos);
                //backBufferContext2D.rotate(gameObject.rotation * Math.PI / 180);
                backBufferContext2D.strokeStyle = gameObject.borderColor;
                backBufferContext2D.lineWidth   = ".5";
                backBufferContext2D.strokeRect(xPos, yPos,
                        gameObject.width * gameObject.scaleX, gameObject.height * gameObject.scaleY);
                
                backBufferContext2D.restore();
            }
            if(gameObject.fill){
                 
                backBufferContext2D.fillStyle   = gameObject.fillColor;
                backBufferContext2D.fillRect(xPos, yPos,
                        gameObject.width, gameObject.height);
            }
            
            if(gameObject.texture) {
                var currentText;
                var currentData;
                if(gameObject instanceof Sprite){
                    currentText = gameObject.texture.texture;
                    currentData = gameObject.texture.data;
                }else if(gameObject instanceof MovieClip){
                    currentText = gameObject.texture.texture;
                    currentData = gameObject.texture.data[gameObject.currentFrame];
                    
                    if(!gameObject.stopFrame)
                        gameObject.updateFrames();
                }
                
            
                if(gameObject.centerRegistrationPoint){
                    xPos = xPos -((gameObject.width * gameObject.scaleX)/2);
                    yPos = yPos -((gameObject.height * gameObject.scaleY)/2);
                }
                
                if(gameObject.rotation){
                    backBufferContext2D.save();
                    
                    backBufferContext2D.translate(xPos +((gameObject.width * gameObject.scaleX)/2),
                                                    yPos + ((gameObject.height * gameObject.scaleY)/2));
                    
                    backBufferContext2D.rotate(gameObject.rotation * Math.PI / 180);
                    
                    backBufferContext2D.drawImage(currentText,
                        currentData[0], currentData[1], currentData[2], currentData[3],
                        -((gameObject.width * gameObject.scaleX)/2),
                        -((gameObject.height * gameObject.scaleY)/2),
                        gameObject.width*gameObject.scaleX,
                        gameObject.height*gameObject.scaleY);
                        
                    
                }else{
                     
                    if(gameObject.scaleX != 1 || gameObject.scaleY != 1) {
                        backBufferContext2D.save();
                        backBufferContext2D.translate(xPos, yPos);
                        backBufferContext2D.scale(gameObject.scaleX, gameObject.scaleY);
                        xPos = 0;
                        yPos = 0;
                    }
                    backBufferContext2D.drawImage(currentText, 
                        currentData[0], currentData[1], currentData[2], currentData[3], 
                        xPos, yPos,
                        gameObject.width,
                        gameObject.height);
                    //backBufferContext2D.shadowOffsetX = 5;
                    //backBufferContext2D.shadowOffsetY = 5;
                    //backBufferContext2D.shadowBlur    = 4;
                    //backBufferContext2D.shadowColor   = "black";

                
                }
            }else{
                //context2D.drawImage(this.gameObject.image, this.gameObject.x, this.gameObject.y, this.gameObject.image.width, this.gameObject.image.height);
                
            }
            backBufferContext2D.restore();
        }
		
	}
}
