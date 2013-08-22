
var layer;
var iso;

var backLayer;

var Gfx = {};

function Iso(){
	Renderer.start(30);
	
	var stats = new Stats();
	document.body.appendChild( stats.getDomElement());
	setInterval( function () { stats.update(); }, 1000 / 60 );
	
	

    var layerHeight = 400;
    var layerWidth = 300;
    layer = new Layer("canvas", layerWidth, layerHeight);
	
	backLayer = new Layer("backCanvas", layerWidth, layerHeight);
	
	Renderer.addLayer(layer);
	Renderer.addLayer(backLayer);
	
	var map = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
				[1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
				[1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
				[1, 0, 0, 0, 0, 0, 0, 0, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1]];

	function initIso() {
        iso = new IsoCanvas();
        iso.createTile({name:"Tile0", walkable:true, texture:Gfx.tile1});
        iso.createTile({name:"Tile1", walkable:false, texture:Gfx.tile2});
        
        iso.buildMap(map);
        
        layer.addListener(MouseEvent.MOUSE_DOWN, function(e){
            iso.getTarget();
        });
    
        layer.addListener(Event.ENTER_FRAME, function(){
            iso.update();
        });
    }
    
	Loader.load("images/iso/tile1.png", function(tile1){
        Gfx.tile1 = { texture:tile1, data:[0, 0, 60, 30]};
        Loader.load("images/iso/tile2.png", function(tile2){
            Gfx.tile2 = { texture:tile2, data:[0, 0, 60, 40]};
            Loader.load("images/iso/mouse.png", function(mouse){
                Gfx.mouse = { texture:mouse, data:[0, 0, 60, 30]};
                initIso();
            });
        })
    });
    
    
}

function IsoCanvas(){
	
	//declare game object that holds info
	var mapObject = {tileW:30, tileH:30};
	var mouse;
	
	this.mapObject = function(){
		return mapObject;
	};
	this.createTile = function(tileDetails){
		mapObject[tileDetails.name] = function () { };
		for(var params in tileDetails){
			mapObject[tileDetails.name].prototype[params] = tileDetails[params];
		}
	};
	this.mouse = function(){
		return mouse;
	};
	// char object, xtile and ytile are tile where chars center is
	//char = {xtile:2, ytile:1, speed:2, moving:false, width:16, height:16};
	//building the world
	this.buildMap = function(map){
		//attach empty mc to hold all the tiles and char
		//_root.attachMovie("empty", "tiles", 1);
		//attach empty mc to hold background tiles
		//_root.tiles.attachMovie("empty", "back", 0);
		//declare clip in the game object
		//game.clip = _root.tiles;
		//game.clip._x = 150;
		//get map dimensions
		
		var mapHeight = map.length;
		//loop to place tiles on layer
		for (var i = 0; i<mapHeight; ++i){
			var mapWidth = map[i].length;
			for (var j = 0; j<mapWidth; ++j){
				//name of new tile
				var name = "t_" + i + "_" + j;

				//make new tile object in the game
				mapObject[name] = new mapObject["Tile"+map[i][j]]();
               
				var tile = new Sprite(mapObject[name].texture);
				tile.name = name;
				tile.x = (j-i)*mapObject.tileW;
				tile.y = (j+i)*mapObject.tileW/2;
				if (mapObject[name].walkable){
					backLayer.addChild(tile);

				}else{
					tile.y -=10;
					
					layer.addChild(tile);
				}

				//tile.x += 150;
				//tile.y += 50;
				
				//calculate depth
				// game[name].depth = (j+i)*game.tileW/2*300+(j-i)*game.tileW+1;
				// //attach tile mc and place it
				// clip.attachMovie("tile", name, game[name].depth);
				// clip[name]._x = (j-i)*game.tileW;
				// clip[name]._y = (j+i)*game.tileW/2;
				// //send tile mc to correct frame
				// clip[name].gotoAndStop(game[name].frame);
			}
		}
		//attach mouse cursor
		//_root.attachMovie("mouse", "mouse", 2);

		mouse = new Sprite(Gfx.mouse);
		mouse.name = "mouse";
		layer.addChild(mouse);

		// var ob = char;
		// //calculate starting position
		// ob.x = ob.xtile*game.tileW;
		// ob.y = ob.ytile*game.tileW;
		// //calculate position in isometric view
		// ob.xiso = ob.x-ob.y;
		// ob.yiso = (ob.x+ob.y)/2;
		// //calculate depth
		// ob.depthshift = (game.tileW-ob.height)/2;
		// ob.depth = (ob.yiso-ob.depthshift)*300+ob.xiso+1;
		// //add the character mc
		// game.clip.attachMovie("char", "char", ob.depth);
		// //declare clip in the game object
		// ob.clip = game.clip.char;
		// //place char mc
		// ob.clip._x = ob.xiso;
		// ob.clip._y = ob.yiso;
		// ob.clip.gotoAndStop(ob.frame);
	}
// function moveChar(ob)
// {
// 	//is char in the center of tile
// 	if ((ob.x)%game.tileW == 0 and (ob.y)%game.tileW == 0)
// 	{
// 		//calculate the tile where chars center is
// 		ob.xtile = Math.floor(ob.x/game.tileW);
// 		ob.ytile = Math.floor(ob.y/game.tileH);
// 		//choose direction
// 		//right
// 		if (game["t_"+ob.ytile+"_"+(ob.xtile+1)].walkable and game.targetx>ob.xtile)
// 		{
// 			ob.dirx = 1;
// 			ob.diry = 0;
// 			//left
// 		}
// 		else if (game["t_"+ob.ytile+"_"+(ob.xtile-1)].walkable and game.targetx<ob.xtile)
// 		{
// 			ob.dirx = -1;
// 			ob.diry = 0;
// 			//up
// 		}
// 		else if (game["t_"+(ob.ytile+1)+"_"+ob.xtile].walkable and game.targety>ob.ytile)
// 		{
// 			ob.dirx = 0;
// 			ob.diry = 1;
// 			//down
// 		}
// 		else if (game["t_"+(ob.ytile-1)+"_"+ob.xtile].walkable and game.targety<ob.ytile)
// 		{
// 			ob.dirx = 0;
// 			ob.diry = -1;
// 			//none
// 		}
// 		else
// 		{
// 			ob.moving = false;
// 			return;
// 		}
// 	}
// 	//move
// 	ob.y += ob.speed*ob.diry;
// 	ob.x += ob.speed*ob.dirx;
// 	//calculate position in isometric view
// 	ob.xiso = ob.x-ob.y;
// 	ob.yiso = (ob.x+ob.y)/2;
// 	//update char position
// 	ob.clip._x = ob.xiso;
// 	ob.clip._y = ob.yiso;
// 	//calculate depth
// 	ob.depth = (ob.yiso-ob.depthshift)*300+(ob.xiso)+1;
// 	ob.clip.swapDepths(ob.depth);
// 	//face the direction
// 	ob.clip.gotoAndStop(ob.dirx+ob.diry*2+3);
// 	return (true);
// }
	this.getTarget = function(){
		

		var tile = "t_" + (mapObject.mouseY) + "_" + (mapObject.mouseX)
		console.log(tile);

		//must click on walkable tile
		try{
			if (mapObject[tile].walkable)
			{
				//update target tile
				mapObject.targetX = mapObject.mouseX;
				mapObject.targetY = mapObject.mouseY;
				//get moving
				//char.moving = true;
				console.log(tile);
			}


		}catch(e){
			console.log(e)
		}
	}
	this.update = function(){
		//convert mouse coordinates from isometric back to normal
		var mouseY = ((2 * layer.mouseY - layer.mouseX)/2);
		var mouseX = (layer.mouseX + mouseY);

		//trace(xmouse + " " + ymouse)
		//find on which tile mouse is
		
		mapObject.mouseY = Math.round(mouseY/mapObject.tileW);
		mapObject.mouseX = Math.round(mouseX/mapObject.tileW) - 1;

		var tile = "t_" + (mapObject.mouseY) + "_" + (mapObject.mouseX);

		try{
			if(mapObject[tile].walkable){
				mouse.x = (mapObject.mouseX - mapObject.mouseY) * mapObject.tileW;
				mouse.y = ((mapObject.mouseX + mapObject.mouseY) * mapObject.tileW/2)
				
			}
		}catch(e){

		}
		
		//var ob = char;
		//move char
		//if (!ob.moving)
		//{
			//stop walk animation
		//	ob.clip.char.gotoAndStop(1);
		//}
		//else
		//{
		//	moveChar(ob);
			//walk animation
		//	ob.clip.char.play();
		//}
	}
}