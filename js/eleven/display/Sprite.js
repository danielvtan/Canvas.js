
Sprite.prototype = new DisplayObject();
Sprite.prototype.constructor = Sprite;
function Sprite()
{
    DisplayObject.apply(this, arguments);
    this.width = this.texture.data[2];
    this.height = this.texture.data[3];

	var thisClass = this;
}
