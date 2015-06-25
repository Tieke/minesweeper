function Minesweeper() {
	this.gameboard = this.generateBoard();
	this.directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
}


Minesweeper.prototype.generateBoard = function() {
	var board = [
				[0, 'b', 0],
				['b', 0, 0],
				[0, 0, 0]
			];

	return board;
};

Minesweeper.prototype.populateBoard = function() {
	for ( i = 0; i < this.gameboard.length; i++ ) {
		for ( j = 0; j < this.gameboard[i].length; j++ ) {
			if ( this.gameboard[i][j] !== 'b' ) {
				this.gameboard[i][j] = this.countBombsSurroundingSquare(i, j);
			}
		}
	}
};

Minesweeper.prototype.renderBoard = function() {
	var printedBoard = "";
	for (i=0; i<this.gameboard.length; i++) {
		printedBoard += "<div id='row" + (i+1) + "'>";
		for (j=0;j<this.gameboard[i].length; j++) {
			printedBoard += "<div class='cell" + (j+1) ;
			switch(this.gameboard[i][j]){
				case 0:
				printedBoard += " unclicked zero'></div>";
				break;
				case 1:
				printedBoard += " unclicked one'></div>";
				break;
				case 2:
				printedBoard += " unclicked two'></div>";
				break;
				case 3:
				printedBoard += " unclicked three'></div>";
				break;
				case 4:
				printedBoard += " unclicked four'></div>";
				break;
				case 5:
				printedBoard += " unclicked five'></div>";
				break;
				case 6:
				printedBoard += " unclicked six'></div>";
				break;
				case 7:
				printedBoard += " unclicked seven'></div>";
				break;
				case 8:
				printedBoard += " unclicked eight'></div>";
				break;
				case 'b':
				printedBoard += " unclicked bomb'></div>";
				break;
			}
		}
		printedBoard += "</div>";
	}
	$('#board').append(printedBoard);
}


Minesweeper.prototype.squareContainsBomb = function(row, column) {
	if ( this.gameboard[row][column] === 'b' ) {
		return true;
	} else {
		return false;
	}
};


Minesweeper.prototype.countBombsSurroundingSquare = function(row, column) {
	var square = this.gameboard[row][column];
	var neighboursWithBombs = 0;

	for ( var i = 0; i < this.directions.length; i++ ) {
		var direction = this.directions[i];
		var directRow = direction[0];
		var directColumn = direction[1];

		if (this.isInBounds(row + directRow, column + directColumn)) {
			if (this.squareContainsBomb([row + directRow], [column + directColumn])) {
				neighboursWithBombs++;
			}
		}
	}
	return neighboursWithBombs;
};


Minesweeper.prototype.isInBounds = function(row, column) {
  return row >= 0 && row < this.gameboard.length && column >= 0 && column < this.gameboard.length;
};

Minesweeper.prototype.unCoverClearSquares = function(row, column) {
	var square = this.gameboard[row][column];
	console.log("In function")
	for ( var i= 0; i <= this.directions.length; i++) {

		if (minesweeper.countBombsSurroundingSquare(row, column) == 0) {// No neightbours has any bombs 
			$(this).removeClass('unclicked').addClass('clicked')
			unCoverClearSquares($(this));
		};

	};
};

Minesweeper.prototype.findCoordinates = function(current_this) {
	// Find the x and y coordinates of the click cell - this
	// this has cell id
	var cell_id_temp = $(current_this).attr('class')
	// parent has row id
	var cell_id = "cell" + (cell_id_temp[4]) + (cell_id_temp[5])
	var row_id = $(current_this).parent().attr('id');
	return cell_id, row_id
};


$(document).ready(function (){
	var minesweeper = new Minesweeper();
	// console.log(minesweeper.gameboard);
	minesweeper.populateBoard();
	// console.log(minesweeper.gameboard)
	minesweeper.renderBoard();
	// console.log(minesweeper.countBombsSurroundingSquare(0,0));

	$('#board').on('mousedown', '.unclicked', function (event){

		if (event.which === 1){
			$('#face').css('background-image','url(images/faceSmile.jpg)');
			$(this).removeClass('unclicked').addClass('clicked');
			minesweeper.findCoordinates($(this));
			// minesweeper.unCoverClearSquares($(this));
			if ($(this).hasClass('bomb')){
				$('#face').css('background-image','url(images/faceLose.jpg)');
				$('.bomb').show()
				alert('YOU LOSE')
			};
			if ($(this).hasClass()){
				$(this).show();
			};
		}
	    if (event.which === 3){
	    	$('#face').css('background-image','url(images/faceO.jpg)');
        	if ($(this).hasClass('unclicked')){
        		$(this).toggleClass('flag');
        	}
    	}
	});

});
