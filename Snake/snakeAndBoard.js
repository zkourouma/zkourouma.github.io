
function Snake(boardSize){
  this.body = [[Math.floor(boardSize/2), Math.floor(boardSize/2)]];
  this.direction = {
    x: 0,
    y: 0
  };
};

Snake.prototype.turn = function(direction) {
  var that = this;
  switch(direction){
  case'north':
    if(that.direction.y === 1){
    }
    else{
      that.direction.x = 0
      that.direction.y = -1
      }
      break;
  case 'south':
    if(that.direction.y === -1){
    }
    else{
      that.direction.x = 0
      that.direction.y = 1
      }
      break;
  case 'east':
    if (that.direction.x === -1){
    }
    else{
      that.direction.x = 1
      that.direction.y = 0
      }
      break;
  case 'west':
    if (that.direction.x === 1){
    }
    else{
      that.direction.x = -1
      that.direction.y = 0
      }
      break;
  }
};

Snake.prototype.step = function() {
  var that = this;
  var transfer
  if(this.body.length > 1){
    transfer = that.body.pop();
    transfer[1] = that.body[0][1] + that.direction.x;
    transfer[0] = that.body[0][0] + that.direction.y;
    that.body.unshift(transfer);
  }
  else{
    that.body[0][0] += that.direction.y;
    that.body[0][1] += that.direction.x;
  }
};

Snake.prototype.grow = function() {
  var newTail = [_.last(this.body)[0], _.last(this.body)[1]];
  this.body.push(newTail);
};


function Board(size){
  this.size = size;
  this.apple = [Math.floor(Math.random() * size), Math.floor(Math.random() * size)];
  this.gameSession = undefined;
  
  this.body = function(){
    var arr = [];
    
    for (var i = 0; i < size; i++) {
      var subArr = []
      
      for (var i = 0; i < size; i++) {
        subArr.push([j,i])
      };
      arr.push(subArr)
    };
    return arr
  }

  this.score = 0;
}

Board.prototype.step = function(snake, timer) {
  var that = this;
  snake.step();
  if (!this.checkForWall(snake)){
    window.clearInterval(that.timer);
    that.gameover();
    clearInterval(thisGame);
    return;
  }
  if (snake.body.length > 1 && this.checkForSelf(snake)){
   window.clearInterval(that.timer);
   that.gameover();
   clearInterval(thisGame);
   return;
  }
  if (this.checkForApple(snake)){
    snake.grow();
    that.newApple(snake);
    that.score += 10;
  }
};

Board.prototype.checkForWall = function(snake) {
  return (snake.body[0][0] >= 0 && snake.body[0][0] < this.size &&
    snake.body[0][1] >= 0 && snake.body[0][1] < this.size)
};

Board.prototype.checkForSelf = function(snake) {
  var hit = false
  for (var i = 1; i < snake.body.length; i++) {
    if (snake.body[i][0] === snake.body[0][0] && 
        snake.body[i][1] === snake.body[0][1]){
      hit = true;
    }
  }
  return hit
};

Board.prototype.pauseToggle = function(snake) {
  if (this.gameSession !== undefined){
    clearInterval(this.gameSession);
    this.gameSession = undefined;
  }
  else{
    this.gameSession = this.gameLoop(snake);
  }
};

Board.prototype.checkForApple = function(snake) {
  return (snake.body[0][0] == this.apple[0] && snake.body[0][1] == this.apple[1])
};

Board.prototype.newApple = function(snake) {
  var that = this; 
  var appl = [Math.floor(Math.random() * that.size), Math.floor(Math.random() * that.size)]

  while (_.contains(snake.body, appl)){
    appl = [Math.floor(Math.random() * that.size), Math.floor(Math.random() * that.size)];
  }
  return this.apple = appl;
};

Board.prototype.start = function(snake) {
  this.gameSession = this.gameLoop(snake);
};

Board.prototype.gameover = function() {
  clearInterval(this.gameSession);
  $('#container').fadeTo('slow', 0.5);
  $('#score').html('You lost... Score: ' + this.score).css('font-family', 'sans-serif');
};

Board.prototype.gameLoop = function(snake) {
  var that = this;

  STEP_TIME_MILLIS = 60;

  var thisGame = window.setInterval(function(){
    that.draw(snake);
    that.step(snake);
    }, 
  
    STEP_TIME_MILLIS);
  
  return thisGame;
};

Board.prototype.draw = function(snake) {
  var that = this;
  $('.game').removeClass('snake');
  $('.game').removeClass('apple');

  snake.body.forEach(function(val, i, arr){
    $('#\\[' + val[0] + '\\,' + val[1] + '\\]' ).addClass('snake');
    }
  );
  
  var appl = this.apple
  $('#\\[' + appl[0] + '\\,' + appl[1] + '\\]').addClass('apple');

   $('#score').html("Score:  " + that.score).css('font-family', 'sans-serif');
};