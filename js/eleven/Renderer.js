/**
*	eleven js
*	@author Daniel Tan
*   @email daniel@eleventap.com
*	
*/

var Renderer = new Renderer();
function Renderer(){
	
	this.FPS;
    var thisClass = this;
	var frames;
		
	this.layers = new Array();
	
	this.addLayer = function(layer){
		layer.renderer = thisClass;
		thisClass.layers.push(layer);
	};
	this.removeLayer = function(layer){
		thisClass.layers.splice(thisClass.layers.indexOf(layer), 0);
	};
	this.start = function(fps){
		thisClass.stop();
		thisClass.FPS = fps;
		frames = setInterval(function(){
			thisClass.renderLayers();
		}, 1000 / thisClass.FPS);
	};
	this.renderLayers = function(){
		var totalFrames = thisClass.layers.length;
        for(var i = 0; i < totalFrames; ++i){
            thisClass.layers[i].draw();
        }
	};
	this.stop = function(){
		clearInterval(frames);	
	};
}