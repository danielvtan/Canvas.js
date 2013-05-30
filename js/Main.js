



function Main() {
    
    var offSet = 0;
    var stageHeight = 400;
    var stageWidth = 400;
    var FPS = 60;
    var stage = new Layer("canvas", stageWidth, stageHeight);
	
	Renderer.addLayer(stage);
	Renderer.start(FPS);
	
   
    var xDir = -1;
    var yDir = 1;
    var speed = 5;
    var friction = 5;
    var targetX = 0;
    
	var ball = new Sprite();
	ball.width = 20;
  	ball.height = 20;
    ball.name = "ball";
	//ball.fill = true;
	ball.fillColor = get_random_color();
    //ball.showBounds = true;    
    ball.x = stageWidth/2;
    ball.y = stageHeight/3; 
	ball.drawArc(10, 10, 10, Math.PI * 1.5, Math.PI * 3.4999, false); 
    addChild(ball);

	var paddle = new Sprite();
    paddle.width = 100;
    paddle.height = 10;
    paddle.x = 100;
    paddle.y = 350;
    paddle.name = "paddle";
	paddle.fill = true;
	paddle.fillColor = get_random_color();
    //paddle.showBounds = true;
    addChild(paddle); 
	
	
	var brick = new Array();
	
	
/*	var test = new Element("element");
	test.width = 50;
	test.height = 50;
	test.x = 100;
	test.y = 100;
	test.border = "solid 1px #000";
	addChild(test);
	
	*/
	var bricks = new Array();
	bricks = [[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0]]
	
	
	for (var i=0; i< bricks[0].length; i++)
	{
		brick[i] = new Array();
		for (var j=0; j< bricks.length; j++)
		{
			brick[i][j] = new Sprite();
			brick[i][j].width = 50;
			brick[i][j].height = 10;
			brick[i][j].x = (50 * i);
			brick[i][j].y = (10 * j);
			brick[i][j].name = "brick" + i + "_"+ j;
			brick[i][j].fill = true;
			brick[i][j].fillColor = get_random_color();
			//brick[i][j].showBounds = true;
			addChild(brick[i][j]); 
		}
   
	}
	function get_random_color() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.round(Math.random() * 15)];
		}
		return color;
	}

   	init();
    
    function init(){
        
        stage.addListener(Event.ENTER_FRAME, gameLoop);
       // stage.addEventListener(KeyboardEvent.KEY_DOWN, onKeyPress);
        stage.addListener(MouseEvent.MOUSE_MOVE, onMouseMove);
        //stage.addEventListener('TOUCH_START', onTouchStart);
		stage.addListener(TouchEvent.TOUCH_MOVE, onTouchMove);
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
		else {
			// Mouse event
			//alert("no touchevent");
		}
		e.preventDefault();
	}
    function onMouseMove(e){
		
      	if(e.x >= stageWidth + offSet - paddle.width/2){
            targetX = stageWidth - paddle.width;
        }
        else if(e.x <= offSet + paddle.width/2){
           targetX = 0;
       }
        else{
            targetX = (e.x - paddle.width/2) - offSet;
       }
     
    }
    
    function gameLoop(){
        
		//test.x = ball.x;
		//test.y = ball.y;
		
		
        paddle.x += (targetX - paddle.x) / friction;
		if(ball.x - speed <= 0){
			ball.x = speed;
			xDir *= -1;
		}else if(ball.x + ball.width + speed >= stageWidth){
			ball.x =  stageWidth - ball.width - speed;
			xDir *= -1;
		}
		
		if(ball.y - speed <= 0){
			ball.y = speed
			yDir *= -1;
		}else if(ball.y + ball.height >= stageHeight){
			ball.y = stageHeight - ball.height - speed;
			yDir *= -1;
		}
		
		if(ball.hitTestObject(paddle)){
			var hitPercent;
			var ballPosition = ball.x - paddle.x;
			hitPercent = (ballPosition / (paddle.width - ball.width)) - .5;
			xDir = hitPercent * 1;
			yDir = -1;
		}
		
		for (var i=0; i< bricks[0].length; i++)
		{
			for (var j=0; j< bricks.length; j++)
			{
				if(ball.hitTestObject(brick[i][j])){
					
					// ballPosition = ball.x - brick[i][j].x;
					// hitPercent = (ballPosition / (brick[i][j].width - ball.width)) - .5;
					
					stage.removeChild(brick[i][j]);
					brick[i][j] = -1;
					//xDir *= -1;
					yDir *= -1;
					
					i =  bricks[0].length;
					j =  bricks.length;
				}
			}
		
		}
		
		  
     
		ball.x += speed * xDir;
        ball.y += speed * yDir;
		
      
        //draw(txt);
    }
    function keyUp(event){
        // alert(event);
    }
    
    
    function addChild(gameObject){
        stage.addChild(gameObject);
    }
 
}
