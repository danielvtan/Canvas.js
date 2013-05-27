
var layer;
function MovieClipTest(){
	
	Renderer.start(30);
	
	var stats = new Stats();
		
	// Align top-left
	stats.getDomElement().style.position = 'absolute';
	//stats.getDomElement().style.left = '0px';
	//stats.getDomElement().style.top = '0px';
	
	document.body.appendChild( stats.getDomElement() );
	
	setInterval( function () {
	
	stats.update();
	
	}, 1000 / 60 );
	
	var stageHeight = 200;
	var stageWidth = 500;
	var FPS = 30;
	//var stage = new Stage("canvas", stageWidth, stageHeight, FPS);
	layer = new Layer("canvas", stageWidth, stageHeight);
	
	Renderer.addLayer(layer);
	var frames = ["images/robot1.png",
				"images/robot2.png",
				"images/robot3.png",
				"images/robot4.png",
				"images/robot5.png",
				"images/robot6.png",
				"images/robot7.png",
				"images/robot8.png",
				"images/robot9.png",
				"images/robot10.png"];
	
	var clip = new MovieClip(frames);
	clip.width = 48;
	clip.height = 48;
	clip.name = "clip";
	clip.x = 0;
	clip.y = 0;
	clip.frameDelay = 2;
	//clip.rotation = 45
	layer.addChild(clip);
	
	var clip2 = new MovieClip(frames);
	clip2.width = 48;
	clip2.height = 48;
	clip2.name = "clip2";
	clip2.x = 0;
	clip2.y = 50;
	clip2.frameDelay = 1;
	//clip.rotation = 45
	layer.addChild(clip2);
	
	var clip3 = new MovieClip(frames);
	clip3.width = 48;
	clip3.height = 48;
	clip3.name = "clip3";
	clip3.x = 50;
	clip3.y = 100;
	clip3.frameDelay = 2;
	
	clip3.alpha = .5;
	clip3.showBounds = true;
	clip.rotation = 45
	layer.addChild(clip3);
	
	init();
	
	var isJumping = false;
	var jump = 300;
	function init(){
		
		addEvents();	
	}
	function addEvents(){
		layer.addEventListener(Event.ENTER_FRAME, onEnterFrame);
		layer.addEventListener(MouseEvent.MOUSE_OVER, onStageOver);
		
		layer.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDown);
		
		clip.addEventListener(MouseEvent.MOUSE_DOWN, onClipClick);
		clip2.buttonMode = true;
		clip2.addEventListener(MouseEvent.MOUSE_DOWN, onClipClick);
		
		clip3.buttonMode = true;
		clip3.addEventListener(MouseEvent.MOUSE_OVER, onMouseOver);
		clip3.addEventListener(MouseEvent.MOUSE_OUT, onMouseOut);
		
		//layer.addEventListener("TOUCH_START", onTouchStart);
	}
	function onTouchStart(e){
		if(!isJumping){
			isJumping = true;	
		}
	}
	function onKeyDown(e){
		
		if(e.keyCode == 32 && !isJumping){
			isJumping = true
		}
	}
	function onStageOver(e){
		//clip.gotoAndPlay(0);
		//clip2.gotoAndPlay(0);
		//clip3.gotoAndPlay(0);
	}
	function onClipClick(e){
		e.target.stop();
	}
	function onMouseOver(e){
		
		if(!isJumping){
			isJumping = true;	
		}
	}
	function onMouseOut(e){
		
		//e.target.gotoAndPlay(1);
	}
	function onMouseDown(e){
		//clip.currentFrame += 1
		//clip.gotoAndStop(clip.currentFrame)
	}
	function onEnterFrame(){
		
		if(clip3.x > stageWidth){
			clip3.x = 0;	
		}else{
			clip3.x += 3;		
		}
		if(isJumping){
			clip3.y -= jump;
			jump -= .3;
			clip3.frameDelay = 5;
		}
		
		if(clip3.y >= 100){
			isJumping = false;
			clip3.y = 100;
			jump = 5;
			clip3.frameDelay = 2;
		}
		
		
		
		
		clip3.rotation += 1;
	}
}