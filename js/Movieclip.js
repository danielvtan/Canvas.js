
var layer;
function MovieClipTest(){
    
    var lanceArr = [];
    for(var i = 1; i < 73; ++i) {
        if(i < 10)
            lanceArr.push("lance000" + i);
        else
             lanceArr.push("lance00" + i);
    }
    
    var robotTexture;
    Loader.load("assets/lance/lance.png", function(robotImage){
        Ajaxer.get("assets/lance/lance.json", function(e){
            var json = eval('(' + e + ')');
            var textAtlas = new TextureAtlas(robotImage, json);
            textAtlas.getTexture("robot1");
            //robotTexture = textAtlas.getTextures(["robot1", "robot2","robot3", "robot4", "robot5", "robot6", "robot7", "robot8", "robot9", "robot10"]);
            robotTexture = textAtlas.getTextures(lanceArr);
            initApp();
        })
    });
    
    function initApp() {
            
        Renderer.start(60);
        
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
    
        var clip = new MovieClip(robotTexture);
        clip.name = "clip";
        clip.x = 100;
        clip.y = 0;
        clip.showBounds = true;
        clip.scaleX = clip.scaleY = 1.5;
        clip.frameDelay = 2;
        clip.rotation = 45
        layer.addChild(clip);
        
        var clip2 = new MovieClip(robotTexture);
        clip2.name = "clip2";
        //clip2.x = 100;
        //clip2.y = 50;
        clip2.x = clip2.width;
        clip2.showBounds = true;
        clip2.scaleX = -1;
        clip2.frameDelay = 1;
        layer.addChild(clip2);
        
        var clip3 = new MovieClip(robotTexture);
        clip3.name = "clip3";
        clip3.x = 50;
        clip3.y = 100;
        clip3.frameDelay = 2;
        
        clip3.alpha = .5;
        clip3.showBounds = true;
        //layer.addChild(clip3);
        
        init();
        
        var isJumping = false;
        var jump = 300;
        function init(){
            
            addEvents();	
        }
        function addEvents(){
            layer.addListener(Event.ENTER_FRAME, onEnterFrame);
            layer.addListener(MouseEvent.MOUSE_OVER, onStageOver);
            
            layer.addListener(KeyboardEvent.KEY_DOWN, onKeyDown);
            
            clip.addListener(MouseEvent.MOUSE_DOWN, onClipClick);
            clip2.addListener(MouseEvent.MOUSE_DOWN, onClipClick);
            clip2.buttonMode = true;
            
            //clip3.buttonMode = true;
            //clip3.addListener(MouseEvent.MOUSE_OVER, onMouseOver);
            //clip3.addListener(MouseEvent.MOUSE_OUT, onMouseOut);
            
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
                //clip3.x = 0;	
            }else{
                //clip3.x += 3;		
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
            
            
            
            
            clip.rotation += 1;
        }
    }
}