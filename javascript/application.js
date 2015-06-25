function Minesweeper(side_length) {
	this.gameboard = this.generateBoard(side_length);
	this.directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
}

Minesweeper.prototype.generateBoard = function(side_length) {
	var board = new Array();
		for ( i = 0; i < side_length; i++ ) {
			board.push(new Array(side_length));
		}

	return board;
};

Minesweeper.prototype.addBombsToBoard = function() {
	for ( i = 0; i < this.gameboard.length; i++ ) {
		for ( j = 0; j < this.gameboard[i].length; j++ ) {
			if (Math.random() > 0.85) {
				this.gameboard[i][j] = 'b';
			} else {
				this.gameboard[i][j] = 0;
			}
		}
	}
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

		if (countBombsSurroundingSquare == 0) {// No neightbours has any bombs
			$(this).removeClass('unclicked').addClass('clicked')
			unCoverClearSquares($(this));
		};

	};
};


$(document).ready(function (){
	var minesweeper = new Minesweeper(5);
	minesweeper.addBombsToBoard();
	minesweeper.populateBoard();
	minesweeper.renderBoard();

	$('#board').on('mousedown', '.unclicked', function (event){

		if (event.which === 1){
			$('#face').css('background-image','url(images/faceSmile.jpg)');
			$(this).removeClass('unclicked').addClass('clicked');
			console.log($(this))
			minesweeper.unCoverClearSquares($(this));
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
