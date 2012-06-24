goog.provide('helloworld');

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


function move_animation(code) {

    if (code.length == 0) {
	return null;
    }

    var moves = [
	new lime.animation.MoveBy(0, tile_h/2),
	new lime.animation.MoveBy(-tile_w, 0),
	new lime.animation.MoveBy(0, -tile_w),
	new lime.animation.MoveBy(tile_h/2, 0)
    ];

    var moves_list = [];

    var direction = 2;

    $.each(code, function(i, element) {

	if (element == 's') {
	    moves_list.push( moves[ Math.abs(direction % 4) ])
	}
	if (element == 'r') {
	    direction--;
	}
	if (element == 'l') {
	    direction++;
	}
    });

    moves_list = $.map(moves_list, function(element) {
	return element.setDuration(0.5)
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

helloworld.start = function($element, LEVEL, CODE){

    tile_w = $element.width() / LEVEL[0].length;
    tile_h = tile_w * 1.7;
    tile_x = tile_w * 0.84;
    tile_y = tile_h * 0.585;
    position_y = tile_h - tile_h / 2;
    position_x = tile_w - tile_w / 2;

    $element.height(tile_x * LEVEL.length + tile_w);

    var director = new lime.Director($('#map').get(0))
    var scene = new lime.Scene()

    var target = new lime.Layer()
	.setPosition(position_x, position_y);

    var target2 = new lime.Layer()
	.setPosition(position_x, position_y - (tile_h * 0.24));

    var target3 = new lime.Layer()
	.setPosition(position_x, position_y + (tile_h * 0.24));

    var shadows = new lime.Layer()
    	.setPosition(position_x, position_y)
    var shadows_back = new lime.Layer()
    	.setPosition(position_x, position_y)

    var boy = null;
    $.each(LEVEL, function(i, line) {
    	$.each(line, function(j, element) {

	    if (element == 'o') {
    	    	target3.appendChild(
	    	    generate_tile('assets/Star.png', i / 1.2, j)
	    	);
    	    }

	    if (element == 'u') {
		boy = generate_tile('assets/Character Boy.png', i, j)
    		target2.appendChild(boy)
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

	    target.appendChild(
	    	generate_tile('assets/Grass Block.png', i, j)
	    )

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
	animation.addTarget(boy)
	    .play();
    }

    scene.appendChild(target);
    scene.appendChild(shadows_back);
    scene.appendChild(target3);
    scene.appendChild(target2);
    scene.appendChild(shadows);

    director.makeMobileWebAppCapable();

    director.replaceScene(scene);
}

//this is required for outside access after
//code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('helloworld.start', helloworld.start);

$(document).ready(function() {
    helloworld.start($('#map'), LEVEL, CODE)
});
