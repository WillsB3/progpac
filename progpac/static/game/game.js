goog.provide('game');

//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.MoveBy');
goog.require('lime.animation.ScaleBy');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.Loop');
goog.require('lime.animation.Sequence');
goog.require('lime.audio.Audio');

function select_guy_sprite(direction, boy) {
    debugger;
    switch(direction) {

    case 0:
	boy.setFill(STATIC_URL + 'assets/guy_back.png')
	break;

    case 1:
	boy.setFill(STATIC_URL + 'assets/guy_left.png')
	break;

    case 2:
	boy.setFill(STATIC_URL + 'assets/guy_front.png')
	break;

    case 3:
	boy.setFill(STATIC_URL + 'assets/guy_right.png')
	break;
    }
}


function move_animation(code) {

    if (code.length == 0) {
	return null;
    }

    var move_down = new lime.animation.MoveBy(0, tile_h/2)
    var move_right = new lime.animation.MoveBy(tile_w, 0)
    var move_up = new lime.animation.MoveBy(0, -tile_h/2)
    var move_left = new lime.animation.MoveBy(-tile_w, 0)

    var moves = [move_down, move_right, move_up, move_left];

    goog.events.listen(move_down, lime.animation.Event.STOP, function(){
	select_guy_sprite(direction, boy)
    });
    goog.events.listen(move_up, lime.animation.Event.STOP, function(){
	select_guy_sprite(direction, boy)
    });
    goog.events.listen(move_right, lime.animation.Event.STOP, function(){
	select_guy_sprite(direction, boy)
    });
    goog.events.listen(move_left, lime.animation.Event.STOP, function(){
	select_guy_sprite(direction, boy)
    });


    var moves_list = [];

    var direction = 0;

    $.each(code, function(i, element) {

	if (element == 's') {
	    moves_list.push( moves[
		(direction > 0 ? direction : direction+4) % 4
	    ])
	}
	if (element == 'r') {
	    direction--;
	}
	if (element == 'l') {
	    direction++;
	}
    });

    moves_list = $.map(moves_list, function(element) {
	return element.setDuration(0.5).enableOptimizations()
    })

    if (moves_list.length == 1) {
	return moves_list[0]
    }

    return new lime.animation.Sequence(
	moves_list
    );
}

function generate_tile(tile_image, x, y) {

    return new lime.Sprite()
	.setSize(tile_w, tile_h)
	.setFill(STATIC_URL + tile_image)
	.setPosition( tile_y * y, tile_x * x)
}

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

game.start = function($element, LEVEL, CODE){

    tile_w = $element.width() / LEVEL[0].length;
    tile_h = tile_w * 1.7;
    tile_x = tile_w * 0.84;
    tile_y = tile_h * 0.585;
    position_y = tile_h - tile_h / 2;
    position_x = tile_w - tile_w / 2;

    $element.height(tile_x * LEVEL.length + tile_w);

    director = new lime.Director($('#map').get(0))
    scene = new lime.Scene()

    var target = new lime.Layer()
	.setPosition(position_x, position_y);

    var target2 = new lime.Layer()
	.setPosition(position_x, position_y - (tile_h * 0.24));

    target3 = new lime.Layer()
	.setPosition(position_x, position_y - (tile_h * 0.24));

    var shadows = new lime.Layer()
    	.setPosition(position_x, position_y)

    var shadows_back = new lime.Layer()
    	.setPosition(position_x, position_y)

    boy = null;
    $.each(LEVEL, function(i, line) {
    	$.each(line, function(j, element) {

	    target.appendChild(
	    	generate_tile('assets/Grass Block.png', i, j)
	    )

	    if (element == 'o') {
    	    	target3.appendChild(
	    	    generate_tile('assets/Star.png', i, j)
	    	);
    	    }

	    if (element == 'u') {
    		target3.appendChild(
		    boy = generate_tile('assets/guy_front.png', i, j)
		)
    	    }

    	    if (element == '*') {
    		target2.appendChild(
		    generate_tile('assets/Wall Block.png', i, j)
		)
    	    }

	    if (element == '-') {
    	    	target2.appendChild(
	    	    generate_tile('assets/Stone Block.png', i, j)
	    	)
    	    }

	    try {
		if (is_field(element) && is_obstacle(LEVEL[i-1][j]) ) {
	    	    shadows.appendChild(
			generate_tile('assets/Shadow North.png', i, j)
	    	    )
		}

		if (is_field(element) && is_obstacle(LEVEL[i+1][j]) ) {
	    	    shadows_back.appendChild(
	    		generate_tile('assets/Shadow South.png', i, j)
	    	    )
		}

		if (is_field(element) && is_obstacle(LEVEL[i][j-1])) {
	    	    shadows_back.appendChild(
	    		generate_tile('assets/Shadow West.png', i, j)
	    	    )
		}

		if (is_field(element) && is_obstacle(LEVEL[i][j+1])) {
	    	    shadows_back.appendChild(
	    		generate_tile('assets/Shadow East.png', i, j)
	    	    )
		}

		if (is_field(element) && is_obstacle(LEVEL[i+1][j+1]) && !is_obstacle(LEVEL[i][j+1]) ) {
	    	    shadows_back.appendChild(
	    		generate_tile('assets/Shadow South East.png', i, j)
	    	    )
		}

		if (is_field(element) && is_obstacle(LEVEL[i+1][j-1]) && !is_obstacle(LEVEL[i][j-1])) {
	    	    shadows_back.appendChild(
	    		generate_tile('assets/Shadow South West.png', i, j)
	    	    )
		}


		if (is_field(element) && is_obstacle(LEVEL[i-1][j-1]) && !is_obstacle(LEVEL[i][j-1]) && !is_obstacle(LEVEL[i-1][j])) {
	    	    shadows_back.appendChild(
	    		generate_tile('assets/Shadow North West.png', i, j)
	    	    )
		}


		if (is_field(element) && is_obstacle(LEVEL[i-1][j+1]) && !is_obstacle(LEVEL[i][j+1]) && !is_obstacle(LEVEL[i-1][j]) ) {
	    	    shadows_back.appendChild(
	    		generate_tile('assets/Shadow North East.png', i, j)
	    	    )
		}
	    } catch (err) {}

    	});
    });

    var animation = move_animation(CODE)

    if (animation) {
	animation.addTarget(boy).play();
    }

    scene.appendChild(target);
    scene.appendChild(shadows_back);
    scene.appendChild(target2);
    scene.appendChild(target3);
    scene.appendChild(shadows);

    director.makeMobileWebAppCapable();

    director.replaceScene(scene);
}

goog.exportSymbol('game.start', game.start);

$(document).ready(function() {
    game.start($('#map'), LEVEL, CODE)
});
