goog.provide('game');

//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');

goog.require('lime.animation.MoveBy');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.FadeTo');



game.inits = function(element, level) {

    this.Turn = function(direction) {
    lime.animation.Animation.call(this);
	this.direction = (direction > 0 ? direction : direction+4) % 4
    };
    goog.inherits(this.Turn, lime.animation.Animation);

    this.Turn.prototype.update = function(t, target) {
	if (this.status_ == 0) return;

	var face_list = [
	    STATIC_URL + 'assets/guy_front.png',
	    STATIC_URL + 'assets/guy_right.png',
	    STATIC_URL + 'assets/guy_back.png',
	    STATIC_URL + 'assets/guy_left.png'
	]
	target.setFill(face_list[this.direction])
    };


    this.element = element;
    this.level = level;

    this.tile_w = element.width() / this.level[0].length;
    this.tile_h = this.tile_w * 1.7;
    this.tile_x = this.tile_w * 0.84;
    this.tile_y = this.tile_h * 0.585;

    this.position_y = this.tile_h - this.tile_h / 2;
    this.position_x = this.tile_w - this.tile_w / 2;

    this.animations = [
	this.move_down = new lime.animation.MoveBy(0, this.tile_h/2),
	this.move_right = new lime.animation.MoveBy(this.tile_w, 0),
	this.move_up = new lime.animation.MoveBy(0, -this.tile_h/2),
	this.move_left = new lime.animation.MoveBy(-this.tile_w, 0)
    ]

    this.element.height(this.tile_x * this.level.length + this.tile_w);

    this.director = new lime.Director($('#map').get(0));
    this.scene = new lime.Scene();

    // Static Layers
    this.ground_layer = new lime.Layer()
    	.setPosition(this.position_x, this.position_y);

    this.blocks_layer = new lime.Layer()
    	.setPosition(this.position_x, this.position_y - (this.tile_h * 0.24));

    this.scene.appendChild(this.ground_layer);
    this.scene.appendChild(this.blocks_layer);

    // Shadows Layers
    this.shadows = new lime.Layer()
    	.setPosition(this.position_x, this.position_y);

    this.shadows_back = new lime.Layer()
    	.setPosition(this.position_x, this.position_y);

    this.scene.appendChild(this.shadows);
    this.scene.appendChild(this.shadows_back);

    // Game Layers
    this.game_layer = new lime.Layer()
    	.setPosition(this.position_x, this.position_y - (this.tile_h * 0.24));

    this.scene.appendChild(this.game_layer);

    this.guy = undefined;

    this.stars = []

    var self = this;
    $.each(this.animations, function(i, animation) {
	goog.events.listen(animation, lime.animation.Event.STOP, function(e){
	    self.animate_starts();
	});
    })
}

game.animate_starts = function() {
    var self = this;
    $.each(this.stars, function(i,star) {
	var distance = goog.math.Coordinate.distance(
	    star.getPosition(), self.guy.getPosition()
	)

	if (distance < self.tile_w/2) {
	    star.runAction(
		new lime.animation.FadeTo(0).setDuration(0.1)
	    );
	}
    });
}

game.put_block = function(tile_image, x, y) {
    return new lime.Sprite()
	.setFill(STATIC_URL + tile_image)
	.setSize(this.tile_w, this.tile_h)
	.setPosition(this.tile_y * y, this.tile_x * x);
}


game.render_shadows = function() {

    function is_field(element) {
	try {
	    if ( $.inArray(element, ['.','u','o']) > -1 )
		return true
	} catch(err) {}
	return false
    }

    function is_obstacle(element) {
	try {
	    if ( $.inArray(element, ['*','-','#']) > -1 )
		return true
	} catch(err) {}
	return false
    }

    var self = this;
    $.each(this.level, function(i, line) {
    	$.each(line, function(j, element) {

	    try {
		if (is_field(element) && is_obstacle(self.level[i-1][j]) ) {
		    self.shadows.appendChild(
			self.put_block('assets/Shadow North.png', i, j)
		    )
		}

		if (is_field(element) && is_obstacle(self.level[i+1][j]) ) {
		    self.shadows_back.appendChild(
	    		self.put_block('assets/Shadow South.png', i, j)
		    )
		}

		if (is_field(element) && is_obstacle(self.level[i][j-1])) {
		    self.shadows_back.appendChild(
	    		self.put_block('assets/Shadow West.png', i, j)
		    )
		}

		if (is_field(element) && is_obstacle(self.level[i][j+1])) {
		    self.shadows_back.appendChild(
	    		self.put_block('assets/Shadow East.png', i, j)
		    )
		}

		if (is_field(element) && is_obstacle(self.level[i+1][j+1]) && !is_obstacle(self.level[i][j+1]) ) {
		    self.shadows_back.appendChild(
	    		self.put_block('assets/Shadow South East.png', i, j)
		    )
		}

		if (is_field(element) && is_obstacle(self.level[i+1][j-1]) && !is_obstacle(self.level[i][j-1])) {
		    self.shadows_back.appendChild(
	    		self.put_block('assets/Shadow South West.png', i, j)
		    )
		}


		if (is_field(element) && is_obstacle(self.level[i-1][j-1]) && !is_obstacle(self.level[i][j-1]) && !is_obstacle(self.level[i-1][j])) {
		    self.shadows_back.appendChild(
	    		self.put_block('assets/Shadow North West.png', i, j)
		    )
		}


		if (is_field(element) && is_obstacle(self.level[i-1][j+1]) && !is_obstacle(self.level[i][j+1]) && !is_obstacle(self.level[i-1][j]) ) {
		    self.shadows_back.appendChild(
	    		self.put_block('assets/Shadow North East.png', i, j)
		    )
		}
	    } catch (err) {}
	});
    });

}

game.render_static = function() {

    var self = this;
    $.each(this.level, function(i, line) {
    	$.each(line, function(j, element) {

    	    self.ground_layer.appendChild(
    		self.put_block('assets/Grass Block.png', i, j)
    	    );

    	    if (element == '*') {
    		self.blocks_layer.appendChild(
		    self.put_block('assets/Wall Block.png', i, j)
		)
    	    }

	    if (element == '-') {
    	    	self.blocks_layer.appendChild(
	    	    self.put_block('assets/Stone Block.png', i, j)
	    	)
    	    }
    	});
    });

    this.render_shadows();
}

game.render_dynamic = function(code) {
    this.game_layer.removeAllChildren();

    this.stars = [];

    var self = this;
    $.each(this.level, function(i, line) {
    	$.each(line, function(j, element) {

	    if (element == 'o') {
		var star = self.put_block('assets/Star.png', i, j);

    	    	self.game_layer.appendChild(star);
		self.stars.push(star);

    	    } else if (element == 'u') {
		guy = self.put_block('assets/guy_front.png', i, j);
    	    	self.game_layer.appendChild(guy);
	    }

    	});
    });

    this.guy = guy;

    if (code) {
    	this.animate(code)
    }
};

game.generate_animation = function(code) {
    var moves_list = [];
    var direction = 0;

    var self = this;
    $.each(code.replace("@",""), function(i, element) {

	if (element == 's') {
	    var animation = self.animations[
		(direction > 0 ? direction : direction+4) % 4
	    ].setDuration(0.3)
	}
	if (element == 'r') {
	    var animation = new self.Turn(--direction).setDuration(0.1)
	}
	if (element == 'l') {
	    var animation = new self.Turn(++direction).setDuration(0.1)
	}

	moves_list.push(animation)

    });

    return moves_list;
}

game.animate = function(code) {
    this.animation_steps = this.generate_animation(code);

    if (this.animation_steps.length == 1) {
	var animation = this.animation_steps[0];
    } else {
	var animation = new lime.animation.Sequence(this.animation_steps)
    }

    animation.addTarget(this.guy).play();

    var self = this;
    goog.events.listen(animation, lime.animation.Event.STOP, function(e){
	if (self.animate_post) {
	    self.animate_post();
	}
    });

}

game.post_render = function() {
    $('.editor textarea').height(this.element.height() - 125);
}

goog.exportSymbol('game.start', game.start);

$(document).ready(function() {

    if (LEVEL) {
	game.inits($('#map'), LEVEL);

	game.render_static();
	game.render_dynamic();
	game.post_render();

	game.director.replaceScene(game.scene);
	game.director.makeMobileWebAppCapable();
    }

});
