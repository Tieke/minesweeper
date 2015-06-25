$(document).ready(function (){

	$('.board').on('click', '.unclicked', function (){
		// change class from .unclicked to .clicked
		$(this).switchClass('unclicked', 'clicked')
		// if has class bomb >> lose game
		if ($(this).hasClass('bomb')){
			$('.bomb').show()
			alert('YOU LOSE')
		};
		// show() what is in that square
		if ($(this).hasClass()){
			$(this).show();
		};
	});

});

// css classes: 
// - bomb
// - number of bombs: one, two etc.
// - guess
// - flag
// - clicked
// - unclicked
// - row1
// - row2
// - row3
// - board