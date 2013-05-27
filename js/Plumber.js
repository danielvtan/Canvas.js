



function Main() {
    
    var offSet = 0;
    var stageHeight = 400;
    var stageWidth = 400;
    var FPS = 60;
    var stage = new Stage("canvas", stageWidth, stageHeight, FPS);
   
	var tile = new Array()
	
	var tiles = new Array();
	tiles = [[0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0]]
	
	
	for (var i=0; i< tiles[0].length; ++i)
	{
		tile[i] = new Array();
		for (var j=0; j< tiles.length; ++j)
		{
			tile[i][j] = new Sprite("images/plumber/tile1.png");
			
			tile[i][j].width = 50;
			tile[i][j].height = 50;
			tile[i][j].x = (50 * i);
			tile[i][j].y = (50 * j);
			tile[i][j].name = "tile" + i + "_"+ j;
			
			addChild(tile[i][j]); 
			//if(j == 5 && i == 1){
				
				
			//}else{
				
			//}
			tile[i][j].buttonMode = true;
			tile[i][j].addEventListener(MouseEvent.MOUSE_OVER, onTileClick);	
			
		}
   
	}

   	init();
    
    function init(){
        
       // stage.addEventListener(Event.ENTER_FRAME, gameLoop);
       // stage.addEventListener(KeyboardEvent.KEY_DOWN, onKeyPress);
       // stage.addEventListener(MouseEvent.MOUSE_MOVE, onMouseMove);
        //stage.addEventListener('TOUCH_START', onTouchStart);
		//stage.addEventListener(TouchEvent.TOUCH_MOVE, onTouchMove);
    }
	function onTileClick(e){
		//console.log(e.target.rotation);
		e.target.rotation += 90;	
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
		/*
      	if(e.x >= stageWidth + offSet - paddle.width/2){
            targetX = stageWidth - paddle.width;
        }
        else if(e.x <= offSet + paddle.width/2){
           targetX = 0;
       }
        else{
            targetX = (e.x - paddle.width/2) - offSet;
       }*/
    }
    function gameLoop(){
 		
		
		
    }
    function keyUp(event){
        // alert(event);
    }
    function addChild(gameObject){
        stage.addChild(gameObject);
    }
 
}
