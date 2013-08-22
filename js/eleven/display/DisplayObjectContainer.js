
DisplayObjectContainer.prototype = new DisplayObject();
DisplayObjectContainer.prototype.constructor = DisplayObjectContainer;
function DisplayObjectContainer() {
    DisplayObject.apply(this, arguments);
    
    var thisClass = this;
    
    this.texture = null;
    
    this.gameObjects = [];
    
    this.addChild = function(gameObject) {
        thisClass.gameObjects.push(gameObject);
		gameObject.parent = thisClass;
		
        Renderer.renderLayers();
    }
	this.removeChild = function(gameObject) {
		for(x in thisClass.gameObjects){
            if(thisClass.gameObjects[x] == gameObject){
                thisClass.gameObjects.splice(x,1);
                delete thisClass.gameObjects[x];
				return;
            }
        }
        Renderer.renderLayers();
    }
	this.getChild = function(gameObject) {
		for(x in thisClass.gameObjects){
            if(thisClass.gameObjects[x].name == gameObject.name){
				return thisClass.gameObjects[x];
            }
        }
	}
}