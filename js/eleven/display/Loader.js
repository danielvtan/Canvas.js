var Loader = new Loader();
function Loader() {
    
    this.load = function(url, onImageLoad) {
        var image = new Image();
		image.src = url;
		image.onload = function() {
            onImageLoad(image);
        };
    }
}