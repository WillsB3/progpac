$(function() {

    // Level View
    if( $("#level").length ) {

	function setup_code_counter() {
	    var $code_size = $('.code-size');
	    var $code_maxsize = $('.code-maxsize');
	    var code = $('.editor textarea').val();

	    var code_length = $.map(code.split("\n"), function(element) {
		return element.replace(/[\s:]/g,"");
	    }).join("").length;

	    $code_size.html(code_length);

	    if (parseInt($code_size.html(),10) > parseInt($code_maxsize.html(),10)) {
		$code_size.css('color', "#B94A48");
	    } else {
		$code_size.css('color', "#468847");
	    }
	}

	setup_code_counter();

	$('.editor textarea').on('keyup', function() {
            setup_code_counter();
	});

	$('form').ajaxForm({
    	    success: function(response) {

    		if (response.errors.length) {
    		    // $('.error').show();
    		    // $('.error .message').text(response.errors.join());

    		} else {

		    console.log(response.code);
		    console.log(response.success);
		    if (response.success) {
			game.animate_post = function() {

			    $('.modal a.next-level')
				.attr('href', response.next_level);
			    $('.modal').modal('show');

			}
		    }
    		    game.render_dynamic(response.code);

    		}
    	    }
	});
    }

})
