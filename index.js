// # Rectangle
// An object representing a rectangle.
// This object has four properties: x, y, w, h.
// x and y represent a corner of this rectangle.
// w and h represent this rectangle's width and height respectively.
// The positive y axis is assumed to point down.
// Allows negative widths and heights, but its highly unrecommended to use them.
// x and y coordinate usually represents the top-left corner, but that can
// change if you use negative widths and heights.

// Written by [Rahat Ahmed](http://rahatah.me/d).

var Vector2 = require('vector2-node');

// ## Rectangle
// ### Rectangle(Rectangle)
// ### Rectangle(Vector2, Vector2)
// ### Rectangle(Vector2, w, h)
// ### Rectangle(x, y, w, h)
// Constructor for Rectangle
function Rectangle(x, y, w, h)
{
	this.set(x, y, w ,h);
}

// ## set
// ### set(Rectangle)
// ### set(Vector2, Vector2)
// ### set(Vector2, w, h)
// ### set(x, y, w, h)
// Sets this rectangle to the given values.

Rectangle.prototype.set = function(x, y, w, h)
{
	if(x instanceof Rectangle)
	{
		this.x = x.x;
		this.y = x.y;
		this.w = x.w;
		this.h = x.h;
	}
	else if(x instanceof Vector2)
	{
		this.x = x.x;
		this.y = x.y;
		if(y instanceof Vector2)
		{
			this.w = y.x;
			this.h = y.y;
		}
		else
		{
			this.w = y;
			this.h = w;
		}
	}
	else
	{
		this.x = x || 0;
		this.y = y || 0;
		this.w = w || 0;
		this.h = h || 0;
	}
	return this;
};

// ## position
// ### position(Rectangle)
// Sets this rectangle's x and y to the same x and y of the
// given Rectangle.
// Returns **this Rectangle** for chaining.
// ### position(Vector2)
// Sets this rectangle's x and y to that of the given Vector2.
// Returns **this Rectangle** for chaining.
// ### position(x, y)
// Sets this rectangle's x and y to that of the given x and y values.
// Returns **this Rectangle** for chaining.
// ### position()
// Returns the **position** Vector2 containing this Rectangle's
// x and y values.
Rectangle.prototype.position = function(x, y) {
	if(x instanceof Rectangle || x instanceof Vector2)
	{
		this.x = x.x;
		this.y = x.y;
		return this;
	}
	else if(x !== undefined)
	{
		this.x = x;
		this.y = y;
		return this;
	}
	return new Vector2(this.x, this.y);
};

// ## size
// ### size(Rectangle)
// Sets this rectangle's w and h to the same w and h of the
// given Rectangle.
// Returns **this Rectangle** for chaining.
// ### size(Vector2)
// Sets this rectangle's w and h to that of the given Vector2.
// Returns **this Rectangle** for chaining.
// ### size(w, h)
// Sets this rectangle's w and h to that of the given w and h values.
// Returns **this Rectangle** for chaining.
// ### size()
// Returns the **size** Vector2 containing this Rectangle's
// w and h values.
Rectangle.prototype.size = function(w, h) {
	if(w instanceof Rectangle)
	{
		this.w = w.w;
		this.h = w.h;
		return this;
	}
	if(w instanceof Vector2)
	{
		this.w = w.x;
		this.h = w.y;
		return this;
	}
	else if(w !== undefined)
	{
		this.w = w;
		this.h = h;
		return this;
	}
	// TODO: account for negative size
	return new Vector2(this.w, this.h);
};

// ## top()
// Returns the top bound of this Rectangle.
Rectangle.prototype.top = function() {
	return (this.h >= 0) ? this.y : this.y + this.h;
};

// ## bottom()
// Returns the bottom bound of this Rectangle.
Rectangle.prototype.bottom = function() {
	return (this.h >= 0) ? this.y + this.h : this.y;
};

// ## left()
// Returns the left bound of this Rectangle.
Rectangle.prototype.left = function() {
	return (this.w >= 0) ? this.x : this.x + this.w;
};

// ## right()
// Returns the right bound of this Rectangle.
Rectangle.prototype.right = function() {
	return (this.h >= 0) ? this.x + this.w : this.x;
};

// ## copy()
// ## clone()
// Returns a new identical Rectangle
Rectangle.prototype.copy = Rectangle.prototype.clone = function() {
	return new Rectangle(this.x, this.y, this.w, this.h);
};

// ## isStandard()
// A standard Rectangle has a non-negative width and height.
// Returns true if both the width and height of this Rectangle are non-negative
Rectangle.prototype.isStandard = function() {
	return this.w >= 0 && this.h >= 0;
};

// ## makeStandard()
// If this Rectangle is non-standard, makes width/height positive
// and adjusts x and y accordingly. Will not affect a standard
// Rectangle.
// Returns this Rectangle for chaining.
Rectangle.prototype.makeStandard = function() {
	if(this.w < 0)
	{
		this.x += this.w;
		this.w *= -1;
	}
	if(this.h < 0)
	{
		this.y += this.h;
		this.h *= -1;
	}
	return this;
};

// ## translate(Vector2)
// ## translate(x, y)
// Translates this Rectangle's position by the given coordinates,
// relative to its current position.
// Returns this Rectangle for chaining.
Rectangle.prototype.translate = function(x, y) {
	if(x instanceof Vector2)
	{
		this.x += x.x;
		this.y += x.y;
		return this;
	}
	this.x += x;
	this.y += y;
	return this;
};

// ## scale(Vector2)
// ## scale(x, y)
// Scales this Rectangle's size by the given scales.
// This Rectangle will be anchored to its x,y coordinate.
// Returns this Rectangle for chaining.
Rectangle.prototype.scale = function(x, y) {
	if(x instanceof Vector2)
	{
		this.w *= x.x;
		this.h *= x.y;
		return this;
	}
	this.w *= x;
	this.h *= y;
	return this;
};

// ## equals
// Note: If two rectangles are identical but have different x,y,w,h because
// of negative sizes, they are **not** equal! If you want to check equality
// regardless of negative sizes, use equivalent()
// ### equals(Rectangle)
// Returns false if this and another Rectangle are equal.
// ### equals(Rectangle, epsilon)
// Returns false if this and another Rectangle are equal within an epsilon.
// ### equals(Vector1, Vector1)
// Returns false if this Rectangle's position matches the first Vector1
// and its size matches the second Vector1
// ### equals(Vector1, Vector1, epsilon)
// Returns false if this Rectangle's position matches the first Vector1
// and its size matches the second Vector1, within an epsilon
// ### equals(Vector1, w, h)
// Returns false if this Rectangle's position matches the Vector1,
// and its width and height match w and h respectively.
// ### equals(Vector1, w, h, epsilon)
// Returns false if this Rectangle's position matches the Vector1,
// and its width and height match w and h respectively within an epsilon
// ### equals(x, y, w, h)
// Returns false if this Rectangle's values matches the ones given.
// ### equals(x, y, w, h, epsilon)
// Returns false if this Rectangle's values matches the ones given
// within an epsilon.
Rectangle.prototype.equals = function(x, y, w, h, epsilon) {
	if(x instanceof Rectangle)
		return this.position().equals(x.position(), y) && this.size().equals(x.size(), y);
	else if(x instanceof Vector2)
	{
		if(y instanceof Vector2)
			return this.position().equals(x, w) && this.size().equals(y, w);
		else
			return this.position().equals(x, h) && this.size().equals(y, w, h);
	}
	return this.position().equals(x, y, epsilon) && this.size().equals(w, h, epsilon);
};

// ## equivalent
// ### equivalent(Rectangle)
// ### equivalent(Rectangle, epsilon)
// ### equivalent(Vector2, Vector2)
// ### equivalent(Vector2, Vector2, epsilon)
// ### equivalent(Vector2, w, h)
// ### equivalent(Vector2, w, h, epsilon)
// ### equivalent(x, y, w, h)
// ### equivalent(x, y, w, h, epsilon)
// Same as equals, except identical rectangles that differ
// in x,y,w,h because of negative w or h are considered
// equivalent.
Rectangle.prototype.equivalent = function(x, y, w, h, epsilon) {
	var standardThis = this.copy().makeStandard(),
		that = new Rectangle(x, y, w, h).makeStandard();
	if(x instanceof Rectangle)
		epsilon = y;
	else if(x instanceof Vector2)
		if(y instanceof Vector2)
			epsilon = w;
		else
			epsilon = h;
	return standardThis.position().equals(that.position(), epsilon) && standardThis.size().equals(that.size(), epsilon);
};

// ## perimeter()
// Returns the perimeter of this Rectangle.
Rectangle.prototype.perimeter = function() {
	return 2 * Math.abs(this.w) + 2 * Math.abs(this.h);
};

// ## center()
// Returns a Vector2 of the center of this Rectangle
// ## center(Vector2)
// ## center(x, y)
// Sets this Rectangle's position so that the input
// is where the Rectangle's center is.
Rectangle.prototype.center = function(x, y) {
	if(x instanceof Vector2)
		return this.position(x.x - this.w / 2,  x.y - this.h / 2);
	else if(x !== undefined)
		return this.position(x - this.w / 2, this.y = y - this.h / 2);
	return new Vector2(this.x + this.w / 2, this.y + this.h / 2);
};

// ## contains(Rectangle)
// Returns true if the given Rectangle fits entirely within this Rectangle.
// ## contains(Vector2)
// ## contains(x, y)
// Returns true if the given point is inside or on the edge of
Rectangle.prototype.contains = function(x, y) {
	if(x instanceof Rectangle)
		return this.contains(x.position()) && this.contains(x.position().add(x.size()));
	if(x instanceof Vector2)
		return this.left() <= x.x && x.x <= this.right() &&
				this.top() <= x.y && x.y <= this.bottom();
	return this.left() <= x && x <= this.right() &&
			this.top() <= y && y <= this.bottom();
};

// ## aspectRatio()
// Returns the aspect ratio of this Rectangle (width/height).
// ## aspectRatio(r)
// Adjusts the width and height to match the given ratio r.
// As with scale, this Rectangle will be anchored to x, y.
// The Rectangle **MUST** have a non-zero area.
// Changing the aspect ratio of a zero area Rectangle (a line or point),
// is undefined, will set w and h to NaN, and will break other methods.
// Returns this Rectangle for chaining.

Rectangle.prototype.aspectRatio = function(r) {
	if(r !== undefined)
	{
		var ratioRatio = this.aspectRatio() / r;
		return this.scale(1 / ratioRatio * Math.sqrt(ratioRatio),
							Math.sqrt(ratioRatio));
	}
	return Math.abs(this.w / this.h);
};

// ## area()
// Returns the area of this Rectangle.
Rectangle.prototype.area = function() {
	return Math.abs(this.w * this.h);
};

// ## diagonal()
// Returns the length of this Rectangle's diagonal.
Rectangle.prototype.diagonal = function() {
	return Math.sqrt(this.w * this.w + this.h * this.h);
};

// ## overlaps(Rectangle)
// ## overlaps(Vector2, Vector2)
// ## overlaps(Vector2, w, h)
// ## overlaps(x, y, w, h)
Rectangle.prototype.overlaps = function(x, y, w ,h) {
	if(x instanceof Rectangle)
		return this.x < x.x + x.w && this.x + this.w > x.x && 
				this.y < x.y + x.h && this.y + this.h > x.y;
	else if(x instanceof Vector2)
		if(y instanceof Vector2)
			return this.x < x.x + y.x && this.x + this.w > x.x && 
				this.y < x.y + y.y && this.y + this.h > x.y;
		else
			return this.x < x.x + y && this.x + this.w > x.x && 
				this.y < x.y + w && this.y + this.h > x.y;
	else
		return this.x < x + w && this.x + this.w > x && 
				this.y < y + h && this.y + this.h > y;
};

// ## intersection(Rectangle)
// Returns a new Rectangle representing the overlapping area of the two rectangles
// Returns null if the two rectangles do not overlap.
Rectangle.prototype.intersection = function(r) {
	var x, y, dx, dy;
	if (this.x < r.x) x =    r.x, dx = this.x + this.w - r.x;
	else              x = this.x, dx = r.x    + r.w    - this.x;
	if (dx < 0) return null;

	if (this.y < r.y) y =    r.y, dy = this.y + this.h - r.y;
	else              y = this.y, dy = r.y    + r.h    - this.y;
	if (dy < 0) return null;

	return new Rectangle(x, y, dx, dy);
}

module.exports = Rectangle;
