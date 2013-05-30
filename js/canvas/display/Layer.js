
function Layer(canvasID, layerWidth, layerHeight){
    Layer.prototype = new EventDispatcher();
    Layer.prototype.constructor = Layer;
    EventDispatcher.apply(this, arguments);
    
   
    
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
	
    this.mouseX;
    this.mouseY;
    
	this.renderer;
   
	if(supported(canvas)){
        canvas[MouseEvent.MOUSE_MOVE] = function(e){
                thisClass.dispatchEvent(MouseEvent.MOUSE_MOVE, thisClass.mouse(e));
            
                thisClass.mouseX = thisClass.mouse(e).x;
                thisClass.mouseY = thisClass.mouse(e).y;
        }
        canvas[MouseEvent.MOUSE_DOWN] = function(e){
                thisClass.mouseDown = true;
                thisClass.dispatchEvent(MouseEvent.MOUSE_DOWN, thisClass.mouse(e));
        }
        canvas[MouseEvent.MOUSE_UP] = function(e){
                thisClass.mouseDown = false;
                thisClass.dispatchEvent(MouseEvent.MOUSE_UP, thisClass.mouse(e));
        }
        canvas[MouseEvent.MOUSE_OVER] = function(e){
                thisClass.mouseOver = true;
                thisClass.dispatchEvent(MouseEvent.MOUSE_OVER, thisClass.mouse(e));
        }
        canvas[MouseEvent.MOUSE_OUT] = function(e){
                thisClass.mouseOver = false;
                thisClass.dispatchEvent(MouseEvent.MOUSE_OUT, thisClass.mouse(e));
                document.body.style.cursor= "default";
        }
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
    this.draw = function(){
		thisClass.dispatchEvent(Event.ENTER_FRAME, {});
        
		if(thisClass.clearFrames)
			backBufferContext2D.clearRect(0, 0, layerWidth, layerHeight);
		
       	for (var x=0; x< gameObjects.length; x++)
		{	
			thisClass.renderObject(gameObjects[x]);
        }
		context2D.clearRect(0, 0, layerWidth, layerHeight);	
		context2D.drawImage(backBuffer, 0, 0);
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
            var targetData = mouse;
            targetData.target = gameObject; 
            
			if(gameObject.visible)	{	
					if(thisClass.mouseOver){
						if(!gameObject.mouseOver){
							if(gameObject.hitTestPoint(mouse)){
								gameObject.mouseOver = true;
								gameObject.dispatchEvent(MouseEvent.MOUSE_OVER, targetData);
								
								if(gameObject.buttonMode == true){
									document.body.style.cursor= "pointer";
								}else{
									document.body.style.cursor= "default";
								}
							}
						}else if(gameObject.mouseOver){
							if(!gameObject.hitTestPoint(mouse)){
								gameObject.mouseOver = false;
								gameObject.dispatchEvent(MouseEvent.MOUSE_OUT, targetData);
								document.body.style.cursor= "default";
							}
						}	
					}else{
						if(gameObject.mouseOver){
							gameObject.dispatchEvent(MouseEvent.MOUSE_OUT, targetData);
							gameObject.mouseOver = false;
						}
					}
					
					if(thisClass.mouseDown){
						if(gameObject.hitTestPoint(mouse)){
							gameObject.dispatchEvent(MouseEvent.MOUSE_DOWN, targetData);
							gameObject.mouseDown = true;
						}
					}else{
						if(gameObject.mouseDown){
							gameObject.dispatchEvent(MouseEvent.MOUSE_UP, targetData);
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
								
                                switch(gameObject.constructor) {
                                    case Sprite:
                                        currentImage = gameObject.image;
                                    break;
                                    case MovieClip:
                                        currentImage = gameObject.image[gameObject.currentFrame];
                                        if(!gameObject.stopFrame)
                                            gameObject.updateFrames();
                                    break;
                                    default:
                                    break;
                                }
								if(gameObject.centerRegistrationPoint){
									xPos = gameObject.x -((gameObject.width * gameObject.scaleX)/2);
									yPos = gameObject.y -((gameObject.height * gameObject.scaleY)/2);
								}else{
									xPos = gameObject.x;
									yPos = gameObject.y;
								}
								if(gameObject.rotation != 0){
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
