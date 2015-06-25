function Minesweeper() {

}


Minesweeper.prototype.generateBoard = function() {
	var board = [
				[2,'b',2],
				['b',2,1],
				[1,1,0]
				];
				return board;
}



Minesweeper.prototype.renderBoard = function(board) {
	var printedBoard = "";
	console.log(board.length);
	for (i=0; i<board.length; i++) {
		printedBoard += "<div id='row" + (i+1) + "'>";
	console.log("1");
		for (j=0;j<board[i].length; j++) {
			switch(board[i][j]){
				case 0:
				printedBoard += "<div class='unclicked zero'></div>";
				break;
				case 1:
				printedBoard += "<div class='unclicked one'></div>";
				break;
				case 2:
				printedBoard += "<div class='unclicked two'></div>";
				break;
				case 3:
				printedBoard += "<div class='unclicked three'></div>";
				break;
				case 4:
				printedBoard += "<div class='unclicked four'></div>";
				break;
				case 5:
				printedBoard += "<div class='unclicked five'></div>";
				break;
				case 6:
				printedBoard += "<div class='unclicked six'></div>";
				break;
				case 7:
				printedBoard += "<div class='unclicked seven'></div>";
				break;
				case 8:
				printedBoard += "<div class='unclicked eight'></div>";
				break;
				case 'b':
				printedBoard += "<div class='unclicked bomb'></div>";
				break;
			}
		}
		printedBoard += "</div>";
		console.log("Look at me");
		console.log(printedBoard);
	}
	$('#board').append(printedBoard);
}

$(document).ready(function (){
	var minesweeper = new Minesweeper();
	var gameboard = minesweeper.generateBoard();
	console.log(gameboard);
	minesweeper.renderBoard(gameboard);

	$('.board').on('click', '.unclicked', function (event){
		switch (event.which) {
	        case 1:
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
	            break;
	        case 3:
	        	// only if has class unclicked
	        	if ($(this).hasClass('unclicked')){
	        		// add class flag, toggle
	        		$('.flag').toggle();
	        	}
	            break;
	        default:
            	alert('Something strange is happening!');
    	}
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
