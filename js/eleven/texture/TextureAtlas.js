

function TextureAtlas(texture, json) {
    var thisClass = this;
    var texture = texture;
    var json = json;
    var animations = json.animations;
    var frames = json.frames;
    this.getTexture = function(name) {
        var key = animations[name];
        return { texture:texture, data:frames[key]};
    }
    this.getTextures = function(names) {
        var textureData = [];
        for(var i = 0; i < names.length; ++i) {
            textureData.push(thisClass.getTexture(names[i]).data);
        }
        return { texture:texture, data:textureData };
    }
}
var Texture = {
    fromImage: function(image, data) {
        return { texture:image, data:data};
    }
};