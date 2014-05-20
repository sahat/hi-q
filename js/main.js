$(document).ready(function() {

  // Click on Peg
  $('.peg').click(function() {
    $('.peg').not(this).removeClass('active');
    $(this).toggleClass('active');
  });

  $('.cell').not('.peg').click(function(e) {
    if ($('.peg.active').length) {
      var x = $('.peg.active').data('x');
      var y = $('.peg.active').data('y');
      jump(x, y, 0);
    } else {
      console.log('No peg is selected.')
    }
  });

  var RIGHT = 0;
  var TOP = 1;
  var LEFT = 2;
  var BOTTOM = 3;
  var OCCUPIED = 1;
  var EMPTY = 2;

  // Internal state
  var board = [];

  $('.row').each(function(rowIndex, row) {
    board.push([]);

    $(this).find('.cell').each(function(cellIndex, cell) {


      if ($(cell).hasClass('hidden')) {
        board[rowIndex].push(0);
        $(cell).attr({ 'data-x': rowIndex, 'data-y': cellIndex })
      } else if (!$(cell).hasClass('peg')) {
        board[rowIndex].push(2);
        $(cell).attr({ 'data-x': rowIndex, 'data-y': cellIndex })
      } else {
        board[rowIndex].push(1);
//        $(cell).append(rowIndex + ',' + cellIndex);
        $(cell).attr({ 'data-x': rowIndex, 'data-y': cellIndex })
      }
    });
  });
  console.log(board);

//  var numPegs = $peg.length;
//
//  function findSolution(start, final, path) {
//    for (var i = 0; i < numPegs; i++) {
//      console.log($('.peg').index())
//
//    }
//  }

//  findSolution();
//
//  console.log(boardLength)
//
  function validMove(x, y, newX, newY) {
    return 0 <= x && x < board.length
      && 0 <= y && y < board[x].length
      && 0 <= newX && newX < board.length
      && 0 <= newY && newY < board[newX].length
      && board[newX][newY] == EMPTY
      && board[(x + newX) / 2][(y + newY) / 2] == OCCUPIED
      && board[x][y] == OCCUPIED;
  }

  function setPeg(x, y) {
    board[x][y] = OCCUPIED;
    var $cell = $('.cell[data-x=' + x + '][data-y=' + y + ']');
    $('.peg').removeClass('active');
    $cell.addClass('peg appear active');
    $cell.append('●');
  }

  function clearField(x, y) {
    board[x][y] = EMPTY;
    var $cell = $('.cell[data-x=' + x + '][data-y=' + y + ']');
    $cell.removeClass('peg').empty();
  }

  function jumpBack(x, y, direction) {
    var newX = getNewX(x, direction);
    var newY = getNewY(y, direction);

    clearField(newX, newY);
    setPeg(x, y);
    setPeg((x + newX) / 2, (y + newY) / 2);
  }

  function getNewX(row, direction) {
    var newX = row;

    switch (direction) {

      case TOP:
        newX -= 2;
        break;
      case BOTTOM:
        newX += 2;
    }
    return newX;
  }

  function getNewY(col, direction) {
    var newY = col;

    switch (direction) {
      case RIGHT:
        newY += 2;
        break;
      case LEFT:
        newY -= 2;
    }

    return newY;
  }

  function jump(x, y, direction) {
    var newX = getNewX(x, direction);
    var newY = getNewY(y, direction);
    console.log(x, y, newX, newY)
    if (validMove(x, y, newX, newY)) {
      setPeg(newX, newY);
      clearField(x, y);
      clearField((x + newX) / 2, (y + newY) / 2);

      return true;
    }
    console.log('Not a valid move.')
    return false;
  }
});