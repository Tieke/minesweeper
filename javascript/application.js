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

$(document).ready(function() {
	var minesweeper = new Minesweeper();
	var gameboard = minesweeper.generateBoard();
	console.log(gameboard);
	minesweeper.renderBoard(gameboard);

});