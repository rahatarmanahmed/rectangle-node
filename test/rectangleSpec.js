var Rectangle = require('../index.js'),
	Vector2 = require('vector2-node');
var epsilon = 0.0000000001;

describe("Rectangle test suite:", function() {
	var a, b, c, d, e, f;
	beforeEach(function() {
		// Rectangle matcher
		this.addMatchers({
			toBeRectangle : function(x, y, w, h) {
				return this.actual.equals(x, y, w, h, epsilon);
			},
			toBeStandardRectangle : function(x, y, w, h) {
				return this.actual.copy().makeStandard().equals(x, y, w, h, epsilon);
			},
			toBeVector: function(x, y) {
				return this.actual.equals(x, y, epsilon);
			}
		});
		// Arbitrary test values
		a = new Rectangle();
		b = new Rectangle(1, 2, 3, 4);
		c = new Rectangle(new Rectangle(-2, 3, 2, 2));
		d = new Rectangle(new Vector2(1, 2), new Vector2(3, 4));
		e = new Rectangle(new Vector2(-1, -2), 3, 4);
		f = new Rectangle(4, 6, -3, -4);
	});

	it("constructor/set", function() {
		expect(a).toBeRectangle(0, 0, 0, 0);
		expect(b).toBeRectangle(1, 2, 3, 4);
		expect(c).toBeRectangle(-2, 3, 2, 2);
		expect(d).toBeRectangle(1, 2, 3, 4);
		expect(e).toBeRectangle(-1, -2, 3, 4);
		expect(f).toBeRectangle(4, 6, -3, -4);
	});

	describe("position", function() {
		it("get", function() {
			expect(a.position()).toBeVector(0, 0);
			expect(b.position()).toBeVector(1, 2);
			expect(c.position()).toBeVector(-2, 3);
			expect(d.position()).toBeVector(1, 2);
			expect(e.position()).toBeVector(-1, -2);
			expect(f.position()).toBeVector(4, 6);
		});

		it("set", function() {
			expect(a.position(1, 2)).toBeRectangle(1, 2, 0, 0);
			expect(a.position(new Vector2(-3, 4))).toBeRectangle(-3, 4, 0, 0);
			expect(a.position(b)).toBeRectangle(1, 2, 0, 0);
		});
	});

	describe("size", function() {
		it("get", function() {
			expect(a.size()).toBeVector(0, 0);
			expect(b.size()).toBeVector(3, 4);
			expect(c.size()).toBeVector(2, 2);
			expect(d.size()).toBeVector(3, 4);
			expect(e.size()).toBeVector(3, 4);
			expect(f.size()).toBeVector(-3, -4);
		});

		it("set", function() {
			expect(a.size(5, 6)).toBeRectangle(0, 0, 5, 6);
			expect(a.size(new Vector2(-3, 4))).toBeRectangle(0, 0, -3, 4);
			expect(a.size(b)).toBeRectangle(0, 0, 3, 4);
		});
	});

	describe("top", function() {
		it("get", function() {
			expect(a.top()).toBe(0);
			expect(b.top()).toBe(2);
			expect(c.top()).toBe(3);
			expect(d.top()).toBe(2);
			expect(e.top()).toBe(-2);
			expect(f.top()).toBe(2);
		});
	});

	describe("bottom", function() {
		it("get", function() {
			expect(a.bottom()).toBe(0);
			expect(b.bottom()).toBe(6);
			expect(c.bottom()).toBe(5);
			expect(d.bottom()).toBe(6);
			expect(e.bottom()).toBe(2);
			expect(f.bottom()).toBe(6);
		});
	});

	describe("left", function() {
		it("get", function() {
			expect(a.left()).toBe(0);
			expect(b.left()).toBe(1);
			expect(c.left()).toBe(-2);
			expect(d.left()).toBe(1);
			expect(e.left()).toBe(-1);
			expect(f.left()).toBe(1);
		});
	});

	describe("right", function() {
		it("get", function() {
			expect(a.right()).toBe(0);
			expect(b.right()).toBe(4);
			expect(c.right()).toBe(0);
			expect(d.right()).toBe(4);
			expect(e.right()).toBe(2);
			expect(f.right()).toBe(4);
		});
	});

	it("copy/clone", function(){
		expect(b.copy()).toBeRectangle(1, 2, 3, 4);
		expect(b.clone()).toBeRectangle(1, 2, 3, 4);
		var z = b.clone().set(666, 666, 666, 666);
		expect(b).toBeRectangle(1, 2, 3, 4);
		expect(z).toBeRectangle(666, 666, 666, 666);
	});

	it("isStandard", function() {
		expect(a.isStandard()).toBeTruthy();
		expect(b.isStandard()).toBeTruthy();
		expect(c.isStandard()).toBeTruthy();
		expect(d.isStandard()).toBeTruthy();
		expect(e.isStandard()).toBeTruthy();
		expect(f.isStandard()).toBeFalsy();
	});

	it("makeStandard", function() {
		expect(a.makeStandard()).toBeRectangle(0, 0, 0, 0);
		b.makeStandard();
		expect(b).toBeRectangle(1, 2, 3, 4);
		expect(f).toBeStandardRectangle(1, 2, 3, 4);
	});

	it("translate", function() {
		a.translate(100, -100);
		expect(a).toBeRectangle(100, -100, 0, 0);
		expect(b.translate(5, 5)).toBeRectangle(6, 7, 3, 4);
		expect(f.translate(5, 5)).toBeStandardRectangle(6, 7, 3, 4);

	});

	it("scale", function() {
		a.scale(100, -100);
		expect(a).toBeRectangle(0, 0, 0, 0);
		expect(b.scale(5, 5)).toBeRectangle(1, 2, 15, 20);
		expect(d.scale(1/5, 1/5)).toBeRectangle(1, 2, 3/5, 4/5);
	});

	describe("equals", function() {
		it("other Rectangle", function(){
			expect(b.equals(a)).toBeFalsy();
			expect(b.equals(d)).toBeTruthy();
			expect(b.equals(new Rectangle(1.000000000001, 2.000000000001,
											3, 4.000000000001), epsilon)).toBeTruthy();
		});
		it("two Vector2's", function() {
			expect(b.equals(new Vector2(1, 2), new Vector2(3, 4))).toBeTruthy();
			expect(b.equals(new Vector2(-1, 2), new Vector2(3, 4))).toBeFalsy();
			expect(b.equals(new Vector2(1, 2), new Vector2(-3, 4))).toBeFalsy();
			expect(b.equals(new Vector2(1.000000000001, 2.000000000001),
							new Vector2(3.000000000001, 4.000000000001), epsilon)).toBeTruthy();
		});
		it("one Vector2, two scalars", function() {
			expect(b.equals(new Vector2(1, 2), 3, 4)).toBeTruthy();
			expect(b.equals(new Vector2(-1, 2), 3, 4)).toBeFalsy();
			expect(b.equals(new Vector2(1, 2), -3, 4)).toBeFalsy();
			expect(b.equals(new Vector2(1.000000000001, 2.000000000001),
							3.000000000001, 4.000000000001, epsilon)).toBeTruthy();
		});
		it("four scalars", function() {
			expect(b.equals(1, 2, 3, 4)).toBeTruthy();
			expect(b.equals(-1, 2, 3, 4)).toBeFalsy();
			expect(b.equals(1, 2, -3, 4)).toBeFalsy();
			expect(b.equals(1.000000000001, 2.000000000001,
							3.000000000001, 4.000000000001, epsilon)).toBeTruthy();
		});
	});

	it("perimeter", function() {
		expect(a.perimeter()).toBe(0);
		expect(b.perimeter()).toBe(14);
		expect(c.perimeter()).toBe(8);
		expect(f.perimeter()).toBe(14);
	});

	describe("center", function() {
		it("get", function() {
			expect(a.center()).toBeVector(0, 0);
			expect(b.center()).toBeVector(2.5, 4);
			expect(c.center()).toBeVector(-1, 4);
			expect(f.center()).toBeVector(2.5, 4);
		});

		it("set", function() {
			a.center(new Vector2(4, 5));
			expect(a).toBeRectangle(4, 5, 0, 0);
			expect(b.center(0, 0)).toBeRectangle(-1.5, -2, 3, 4);
			expect(c.center(10, 5)).toBeRectangle(9, 4, 2, 2);
			expect(f.center(0, 0)).toBeStandardRectangle(-1.5, -2, 3, 4);
		});

	});

	describe("contains", function() {
		it("center", function() { // The obvious test :P
			expect(a.contains(a.center())).toBeTruthy();
			expect(b.contains(b.center())).toBeTruthy();
			expect(c.contains(c.center())).toBeTruthy();
			expect(d.contains(d.center())).toBeTruthy();
			expect(e.contains(e.center())).toBeTruthy();
			expect(f.contains(f.center())).toBeTruthy();
		});

		it("rectangle", function() {
			expect(a.contains(b)).toBeFalsy();
			expect(b.contains(new Rectangle(2, 3, 1, 1))).toBeTruthy(); // inside
			expect(b.contains(new Rectangle(1, 2, 1, 1))).toBeTruthy(); // touches edge
			expect(b.contains(new Rectangle(100, 100, 1, 1))).toBeFalsy(); // completely outside
			expect(b.contains(new Rectangle(2, 3, 100, 100))).toBeFalsy(); // part inside part outside
			// Should work with negative numbers too
			expect(f.contains(new Rectangle(2, 3, 1, 1))).toBeTruthy(); // inside
			expect(f.contains(new Rectangle(1, 2, 1, 1))).toBeTruthy(); // touches edge
			expect(f.contains(new Rectangle(100, 100, 1, 1))).toBeFalsy(); // completely outside
			expect(f.contains(new Rectangle(2, 3, 100, 100))).toBeFalsy(); // part inside part outside
		});
	});

	describe("aspectRatio", function(){
		it("get", function() {
			expect(a.aspectRatio()).toBeNaN();
			expect(b.aspectRatio()).toBe(3/4);
			expect(c.aspectRatio()).toBe(1);
			expect(d.aspectRatio()).toBe(3/4);
			expect(e.aspectRatio()).toBe(3/4);
			expect(f.aspectRatio()).toBe(3/4);
		});
		it("set", function() {
			a.aspectRatio(16/9);
			expect(a.w).toBeNaN();
			expect(a.h).toBeNaN();
			expect(b.aspectRatio(4/3)).toBeRectangle(1, 2, 4, 3);
			expect(b.aspectRatio(16/9)).toBeRectangle(1, 2, 4*(4/3)*Math.sqrt(0.75), 3*Math.sqrt(0.75));
			expect(f.aspectRatio(4/3)).toBeRectangle(4, 6, -4, -3);
			expect(f.aspectRatio(16/9)).toBeRectangle(4, 6, -4*(4/3)*Math.sqrt(0.75), -3*Math.sqrt(0.75));
		});
	});

	it("area", function() {
		expect(a.area()).toBe(0);
		expect(b.area()).toBe(12);
		expect(c.area()).toBe(4);
		expect(f.area()).toBe(12);
	});

	it("diagonal", function() {
		expect(a.diagonal()).toBe(0);
		expect(b.diagonal()).toBe(5);
		expect(c.diagonal()).toBe(Math.sqrt(8));
		expect(f.diagonal()).toBe(5);
	});

});