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
			switch(this.gameboard[i][j]){
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

var timer = new (function() {
    var $stopwatch, 
        incrementTime = 70, 
        currentTime = 0,
        updateTimer = function() {
            $stopwatch.html(formatTime(currentTime));
            currentTime += incrementTime / 10;
        },
        init = function() {
            $stopwatch = $('#stopwatch');
            timer.Timer = $.timer(updateTimer, incrementTime, true);
        };
    this.resetStopwatch = function() {
        currentTime = 0;
        this.Timer.stop().once();
    };
    $(init);
});

$(document).ready(function (){
	var minesweeper = new Minesweeper();
	minesweeper.populateBoard();
	minesweeper.renderBoard();

	$('#board').on('mousedown', '.unclicked', function (event){

		if (event.which === 1){
			$('#face').css('background-image','url(images/faceSmile.jpg)');
			$(this).removeClass('unclicked').addClass('clicked');

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
