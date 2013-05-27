/**
*	eleven js
*	@author Daniel Tan
*   @email daniel@eleventap.com
*	
*/	
Layer.prototype = new EventDispatcher();
Layer.prototype.constructor = Layer;
function Layer(canvasID, layerWidth, layerHeight){

    
    var gameEvents = new Array();
  	
    var gameObjects = new Array();
   
    this.width = layerWidth;
    this.height = layerHeight;
	
	
    var thisClass = this;

	var canvas = document.getElementById(canvasID);
	
	var frames;
	var context2D;
	
	var offSetX = 0;
	var offSetY = 0;
	
	this.clearFrames = true;
	
	
	var backBuffer;
	var backBufferContext2D;
	
	var requestAnimation;
	
	
	this.renderer;
   
	this.getMouse = function(e){
		var mouse = new Object();
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
	this.addEventListener = function(eventType, eventReciever){
        	
        if(eventType == Event.ENTER_FRAME){
            gameEvents.push(eventReciever);
			
			if(gameEvents.length == 1){

				//if(window[requestAnimation]){
				//	window[requestAnimation](thisClass.draw);
				//}else{
				//	
				//}
				
				//renderer.
			}
        }else if(eventType.indexOf("onkey") >= 0){
			document[eventType] = function(e){
				var key = new Object();
				key.keyCode = e.keyCode;
				
				/*if(!isIE){
					key.keyCode = e.keyCode;	
				}else{
					key.keyCode = window.event.keyCode;	
				}*/
		   		eventReciever(key);
			};
        }else if(eventType.indexOf("onmouse") >= 0){
			canvas[eventType] = function(e){
					dispatchEvent(eventType, e);
					//e.preventDefault();
				};
			thisClass.mouseEvents[eventType].push(eventReciever);
        }else if(eventType.indexOf("ontouch") >= 0){
			canvas[eventType] = eventReciever;
        }
		function dispatchEvent(type, e){
			var mouse = thisClass.getMouse(e);
			mouse.type = type;
			for(var i = 0; i < thisClass.mouseEvents[type].length; i++){
				thisClass.mouseEvents[type][i](mouse);   
			}
		}
    };
	this.removeEventListener = function(eventType, eventReciever){
        // Layer.prototype = new Event;
        if(eventType == Event.ENTER_FRAME){
			gameEvents.splice(gameEvents.indexOf(eventReciever), 0);
			if(gameEvents.length == 0){
				//clearInterval(frames);
			}
		}else if(eventType.indexOf("onkey") >= 0){
			document[eventType] = null;
        }else if(eventType.indexOf("onmouse") >= 0){
			thisClass.mouseEvents[eventType].splice(gameEvents.indexOf(eventReciever), 0);
        }else if(eventType.indexOf("ontouch") >= 0){
			canvas[eventType] = null;
        }
    };
	if(supported(canvas)){
		this.init();
		
        thisClass.addEventListener(MouseEvent.MOUSE_MOVE, function(e){ });
		thisClass.addEventListener(MouseEvent.MOUSE_DOWN, function(e){ thisClass.mouseDown = true; });
		thisClass.addEventListener(MouseEvent.MOUSE_UP, function(e){ thisClass.mouseDown = false; });
		thisClass.addEventListener(MouseEvent.MOUSE_OVER, function(e){ thisClass.mouseOver = true; });
		thisClass.addEventListener(MouseEvent.MOUSE_OUT, function(e){ thisClass.mouseOver = false; document.body.style.cursor= "default"; });

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
			
			if(window.webkitRequestAnimationFrame){
				requestAnimation = "webkitRequestAnimationFrame";
			}else if(window.mozRequestAnimationFrame){
				requestAnimation = "mozRequestAnimationFrame";
			}
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
    this.draw = function(){
 
		
		for (var x=0; x< gameEvents.length; x++)
		{
			var e = new Object();
			e.type = Event.ENTER_FRAME;
			gameEvents[x](e);
			
		}
		if(thisClass.clearFrames)
			backBufferContext2D.clearRect(0, 0, layerWidth, layerHeight);
		
       	for (var x=0; x< gameObjects.length; x++)
		{	
			thisClass.renderObject(gameObjects[x]);
        }
		context2D.clearRect(0, 0, layerWidth, layerHeight);	
		context2D.drawImage(backBuffer, 0, 0);
		
		
		//if(window[requestAnimation]){
		//	window[requestAnimation](thisClass.draw);
		//}
		
		//if(document.getElementById("element"))
			//document.getElementById("element").innerHTML = fps.check();
    };
	this.renderObject = function(gameObject){
		var mouse = new Object();
		mouse.x = thisClass.mouseX;
		mouse.y = thisClass.mouseY;
		
		
		if(gameObject.istextField){
			backBufferContext2D.fillStyle = gameObject.fontColor;
			backBufferContext2D.font = gameObject.fontSize + " "
					  + gameObject.fontFamily;
			backBufferContext2D.textBaseline = gameObject.textBaseline;
			backBufferContext2D.fillText(gameObject.text, gameObject.x ,gameObject.y);		
		}else{
			if(gameObject.visible)	{	
					function dispatchEvents(type){
						for(var i = 0; i < gameObject.mouseEvents[type].length; i++){
							var target = new Object();
							target.x = mouse.x;
							target.y = mouse.y;
							target.target = gameObject;
							target.type = type;
							gameObject.mouseEvents[type][i](target); 
							
						}
					}
					if(thisClass.mouseOver){
						if(!gameObject.mouseOver){
							if(gameObject.hitTestPoint(mouse)){
								gameObject.mouseOver = true;
								dispatchEvents(MouseEvent.MOUSE_OVER);
								
								if(gameObject.buttonMode == true){
									document.body.style.cursor= "pointer";
								}else{
									document.body.style.cursor= "default";
								}
								
							}
						}else if(gameObject.mouseOver){
							if(!gameObject.hitTestPoint(mouse)){
								gameObject.mouseOver = false;
								dispatchEvents(MouseEvent.MOUSE_OUT);
								document.body.style.cursor= "default";
							}
						}	
					}else{
						if(gameObject.mouseOver){
							dispatchEvents(MouseEvent.MOUSE_OUT);
							gameObject.mouseOver = false;
						}
					}
					
					if(thisClass.mouseDown){
						if(gameObject.hitTestPoint(mouse)){
							dispatchEvents(MouseEvent.MOUSE_DOWN);
							gameObject.mouseDown = true;
						}
					}else{
						if(gameObject.mouseDown){
							dispatchEvents(MouseEvent.MOUSE_UP);
							gameObject.mouseDown = false;
						}
						
					}
					
					
					if(gameObject.mask){
							backBufferContext2D.save();
					
							backBufferContext2D.linesStyle = gameObject.borderColor;
							backBufferContext2D.lineWidth   = "1";
							backBufferContext2D.beginPath();
							backBufferContext2D.fillStyle = gameObject.fillColor;
							//context2D.fillRect(this.gameObject.mask[0], this.gameObject.mask[1], this.gameObject.mask[2], this.gameObject.mask[3]);
							
							backBufferContext2D.moveTo(gameObject.mask[0], gameObject.mask[1]);
							backBufferContext2D.lineTo(gameObject.mask[2], gameObject.mask[1]);
							backBufferContext2D.lineTo(gameObject.mask[2], gameObject.mask[3]);
							backBufferContext2D.lineTo(gameObject.mask[0], gameObject.mask[3]);
							backBufferContext2D.closePath();
							//context2D.fill();
							backBufferContext2D.clip();
							
					}
					
					if(gameObject.showBounds){
						backBufferContext2D.strokeStyle = gameObject.borderColor;
						backBufferContext2D.lineWidth   = "1";
						backBufferContext2D.strokeRect(gameObject.x, gameObject.y,
								gameObject.width, gameObject.height);
					}
					if(gameObject.fill){
						 
						backBufferContext2D.fillStyle   = gameObject.fillColor;
						backBufferContext2D.fillRect(gameObject.x, gameObject.y,
								gameObject.width, gameObject.height);
					}
					//if(this.gameObject.graphics){
						if(gameObject.arc.x){
							backBufferContext2D.fillStyle   = gameObject.fillColor;
							backBufferContext2D.beginPath();
							backBufferContext2D.arc(gameObject.arc.x + gameObject.x, gameObject.arc.y + gameObject.y ,
							gameObject.arc.radius, gameObject.arc.startAngle,
							gameObject.arc.endAngle, gameObject.arc.anticlockwise);
							//context2D.stroke();
							backBufferContext2D.lineTo(gameObject.x,
							gameObject.y);
							backBufferContext2D.fill();
							
						}
					//}
					
						if(gameObject.image){
							var currentImage;
							var xPos;
							var yPos;
							if( gameObject.width > 0){
								
								if(!gameObject.isReady())
									return;
									
								if(gameObject.isSprite){
									currentImage = gameObject.image;
								}else if(gameObject.isMovieClip){
									currentImage = gameObject.image[gameObject.currentFrame];
									if(!gameObject.stopFrame)
										gameObject.updateFrames();
								}
								
							
								if(gameObject.centerRegistrationPoint){
									xPos = gameObject.x -((gameObject.width * gameObject.scaleX)/2);
									yPos = gameObject.y -((gameObject.height * gameObject.scaleY)/2);
								}else{
									xPos = gameObject.x;
									yPos = gameObject.y;
								}
								if(gameObject.rotation){
									backBufferContext2D.save();
									
									backBufferContext2D.translate(xPos +((gameObject.width * gameObject.scaleX)/2),
																	yPos + ((gameObject.height * gameObject.scaleY)/2));
									
									backBufferContext2D.rotate(gameObject.rotation * Math.PI / 180);
									
									backBufferContext2D.drawImage(currentImage, -((gameObject.width * gameObject.scaleX)/2),
									-((gameObject.height * gameObject.scaleY)/2),
									gameObject.width*gameObject.scaleX,
									gameObject.height*gameObject.scaleY);
										
									
								}else{
									backBufferContext2D.drawImage(currentImage, xPos, yPos,
									gameObject.width*gameObject.scaleX,
									gameObject.height*gameObject.scaleY);
									
									//backBufferContext2D.shadowOffsetX = 5;
									//backBufferContext2D.shadowOffsetY = 5;
									//backBufferContext2D.shadowBlur    = 4;
									//backBufferContext2D.shadowColor   = "black";
	
								
								}
							}
						}else{
							//context2D.drawImage(this.gameObject.image, this.gameObject.x, this.gameObject.y, this.gameObject.image.width, this.gameObject.image.height);
							
						}
					backBufferContext2D.restore();
			}
				
		}	
		
	};
    this.addChild = function(gameObject)
    {
        gameObjects.push(gameObject);
		gameObject.parent = thisClass;
		
		thisClass.draw();
		//thisClass.renderObject(gameObject);
    };
	this.removeChild = function(gameObject)
    {
		for(x in gameObjects){

			
            if(gameObjects[x] == gameObject){
                gameObjects.splice(x,1);
                gameObject = -1;
				return;
            }

        }
		
    };
	this.getChild = function(gameObject){
		for(x in gameObjects){
            if(gameObjects[x].name == gameObject.name){
				return gameObjects[x];
            }

        }
	};
}
