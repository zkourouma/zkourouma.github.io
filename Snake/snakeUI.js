$(function () {
 var game = new Board(50);
 var snake = new Snake(game.size);
 
 $('body').append("<div id='container'>");
 $('body').append("<p id='score'>");
 $('body').prepend("<h3 id='snake'>Snake!</h3>");
 
 for (var i = 0; i < game.size; i++) {
   for (var j = 0; j < game.size; j++) {
     $('#container').append('<div id=[' + i + ',' + j + '] class="game"></div>')
   };
 };

 game.start(snake);

  $('html').keydown(function(event){
    switch(event.keyCode){
      case 38:
        snake.turn('north')
        break;
      case 40:
        snake.turn('south')
        break;
      case 37:
        snake.turn('west')
        break;
      case 39:
        snake.turn('east')
        break;
      case 32:
        game.pauseToggle(snake);
        break;
      default: 
    }
  });

});