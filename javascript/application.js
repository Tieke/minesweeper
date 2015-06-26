function Minesweeper(side_length) {
	this.gameboard = this.generateBoard(side_length);
	this.directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
	this.bombsLeftOnBoard = 0;
}

Minesweeper.prototype.prepareBoard = function(bomb_ratio) {
	this.addBombsToBoard(bomb_ratio);
	this.populateBoard();
	this.renderBoard();
}

Minesweeper.prototype.generateBoard = function(side_length) {
	var board = new Array();
		for ( i = 0; i < side_length; i++ ) {
			board.push(new Array(side_length));
		}

	return board;
};

Minesweeper.prototype.addBombsToBoard = function(bomb_ratio) {
	for ( i = 0; i < this.gameboard.length; i++ ) {
		for ( j = 0; j < this.gameboard[i].length; j++ ) {
			if (Math.random() > (1 - bomb_ratio)) {
				this.gameboard[i][j] = 'b';
				this.bombsLeftOnBoard += 1;
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
		printedBoard += "<div id='row" + (i) + "'>";
		for (j=0;j<this.gameboard[i].length; j++) {
			printedBoard += "<div class='cell" + (j) ;
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



Minesweeper.prototype.unCoverClearSquares = function(coordinates_array) {
	// var square = this.gameboard[row][column];
	var row_id = coordinates_array[0];
	var cell_id = coordinates_array[1];
	console.log(row_id);
	console.log(cell_id);
	for ( var i= 0; i < this.directions.length; i++) {
		var direction = this.directions[i];
		var rowId = row_id + direction[0];
		var  cellId = cell_id + direction[1];
		console.log(rowId);
		console.log(cellId);
		if (this.isInBounds( rowId, cellId )) {
			if (this.gameboard[rowId][cellId] === 0 ) {
				var cellToChange = '#row'+rowId +' .cell'+cellId
				$(cellToChange).removeClass('unclicked').addClass('clicked')
				this.gameboard[rowId][cellId] = 'X';
				this.unCoverClearSquares([rowId,cellId]);

			};
		};
				// 	var coordinates_array = [rowId,cellId];
				// };
	};
};

Minesweeper.prototype.unCoverNumberedSquares = function() {
	for ( var i=0; i < this.gameboard.length; i++) {
		for (var j=0; j < this.gameboard[i].length; j++) {
			if (this.gameboard[i][j] === 'X' ) {
				var cellToChange = '#row'+(i) +' .cell'+(j-1)
				$(cellToChange).removeClass('unclicked').addClass('clicked')
				var cellToChange1 = '#row'+(i) +' .cell'+(j+1)
				$(cellToChange1).removeClass('unclicked').addClass('clicked')
				var cellToChange = '#row'+(i-1) +' .cell'+(j-1)
				$(cellToChange).removeClass('unclicked').addClass('clicked')
				var cellToChange1 = '#row'+(i-1) +' .cell'+(j+1)
				$(cellToChange1).removeClass('unclicked').addClass('clicked')
				var cellToChange1 = '#row'+(i-1) +' .cell'+(j)
				$(cellToChange1).removeClass('unclicked').addClass('clicked')
				var cellToChange = '#row'+(i+1) +' .cell'+(j-1)
				$(cellToChange).removeClass('unclicked').addClass('clicked')
				var cellToChange1 = '#row'+(i+1) +' .cell'+(j+1)
				$(cellToChange1).removeClass('unclicked').addClass('clicked')
				var cellToChange1 = '#row'+(i+1) +' .cell'+(j)
				$(cellToChange1).removeClass('unclicked').addClass('clicked')
			};
		};
	};
};


Minesweeper.prototype.findCoordinates = function(current_this) {
	var cell_id_temp = $(current_this).attr('class')
	var cell_id = parseInt(cell_id_temp[4]);
	var row_id_temp = $(current_this).parent().attr('id');
	var row_id = parseInt(row_id_temp[3]);
	var coordinates_array = [row_id,cell_id];
	return coordinates_array;
};


$(document).ready(function (){
	var minesweeper;

	// Small beginner board for testing
	// $('#beginner').on('click', function(e){
	// 	e.preventDefault();
	// 	minesweeper = new Minesweeper(3);
	// 	minesweeper.prepareBoard(0.15625);
	// });

	$('#beginner').on('click', function(e){
		e.preventDefault();
		$('#intermediate').removeClass('selected');
		$(this).addClass('selected');
		$('#board').text("");
		minesweeper = new Minesweeper(8);
		minesweeper.prepareBoard(0.15625);
	});

	$('#intermediate').on('click', function(e){
		e.preventDefault();
		$('#beginner').removeClass('selected');
		$(this).addClass('selected');
		$('#board').text("");
		minesweeper = new Minesweeper(16);
		minesweeper.prepareBoard(0.15625);
	});

	var timer

	$('#board').one('click', function() {
		var userScore = 0 
  		timer = setInterval(function(){ 
			userScore ++; 
			$("#score").text(userScore);
		}, 1000);
	});

	function StopTimer() {
    	clearTimeout(timer);
	}

	$('#board').on('mousedown', '.unclicked', function (event){
		if (event.which === 1){
			$('#face').css('background-image','url(images/faceSmile_small.jpg)');
			$(this).removeClass('unclicked').addClass('clicked');
			if ($(this).hasClass('bomb')){
				$('#face').css('background-image','url(images/faceLose_small.jpg)');
				$('.bomb').show()
				StopTimer()
				alert('YOU LOSE')
			};
			var coordinates = minesweeper.findCoordinates($(this));
			minesweeper.unCoverClearSquares(coordinates);
			minesweeper.unCoverNumberedSquares();
			// if ($(this).hasClass()){
			// 	$(this).show();
			// };
		}
	    if (event.which === 3){
	    	$('#face').css('background-image','url(images/faceO_small.jpg)');
        	if ($(this).hasClass('unclicked')){
        		$(this).toggleClass('flag');
        		if ($(this).hasClass('bomb')){
        			minesweeper.bombsLeftOnBoard -= 1;
        			if ( minesweeper.bombsLeftOnBoard === 0 ) {
        				alert("Congratulations! You've won!");
        				$('#face').css('background-image','url(images/faceWin_small.jpg)');
        			}
        		}
        	}
    	}
	});

});
