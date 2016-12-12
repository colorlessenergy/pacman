var pacman;
var ghost;
var gridField = [];
var detectCollision = false;
var followPacman = [];
var gameover = false;
var p = document.getElementById("p");

window.addEventListener("keyup", move);
function setUp () {
  var canvas = document.getElementById("pacman-board");
  var ctx = canvas.getContext("2d");
  var walls = 50;
  canvas.style.backgroundColor = "#03196E";

  // for (var j =0; j < gridField.length; i++) {
  //   if (!gridField.wallBuilt) {
  //     pacman = new pacmanCreator (gridField[j].startingX+20, gridField[j].startingY+20, 10, ctx);
  //   }
  // }
  grid(ctx);
  pacman = new pacmanCreator (gridField[0].startingX+20, gridField[0].startingY+20, 10, ctx);
  ghost = new Enemy (-40, -40, ctx);
  for (var i = 0; i < walls; i++) {

    createWall(ctx)
  }
  checkWalls(ctx);
  var food = new Food(ctx);

  var displayAll = setInterval(function(){
    enemyCollidePlayer();
    if (gameover) {
      clearInterval(displayAll);
      clearInterval(moveGhost);
      p.innerHTML = "refresh page to start again";
    }
    ctx.clearRect(0, 0, 400, 400);
    food.createFood();
    draw(ctx);
    console.log(gameover);


  }, 10);

  var moveGhost = setInterval(function () {
    ghost.updateValue();
    ghost.createGhost();

  }, 1500)

};


function draw (ctx) {
  ghost.createGhost();
  pacman.createPacman();
  rebuildWalls(ctx);
  checkFruitCollision(ctx);

}


// createRect(x, y, width, height);
// need to store the data of the x, y to manipulate and create walls later
function grid(ctx) {
  var startingPointX1 = 0;
  var startingPointY1 = 0;
  var moveX = 40;
  var moveY = 40;
  for (var l = 0; l < 10; l++) {
    for (var i = 0; i < 400; i += 40) {

      if (startingPointX1 === 400) {
        // don't want to put 400 in the array of walls
      } else {
        gridField.push({
          "startingX": startingPointX1,
          "startingY": startingPointY1,
          "wallBuilt": false,
          "hasFood": false,
          "fruitEaten": false
        });
      }
      startingPointX1 += 40;
    }
    startingPointX1 = 0;
    startingPointY1 += 40;


  }

}

function createWall (ctx) {
  var randomWall = Math.floor(Math.random() * 100);
  gridField[randomWall].wallBuilt = true;
  ctx.rect(gridField[randomWall].startingX, gridField[randomWall].startingY, 40, 40);
  ctx.fillStyle = "black";
  ctx.fill();
};

// need a better way to choose the wall positions

function checkWalls (ctx) {
  for (var i = 0; i < gridField.length; i++) {
    if (!gridField[i].wallBuilt) {
      // if top right bottom left
      if (gridField[i+10] && gridField[i-10] && gridField[i+1] && gridField[i-1] && gridField[i+10].wallBuilt && gridField[i-10].wallBuilt && gridField[i-1].wallBuilt && gridField[i+1].wallBuilt) {
          ctx.beginPath();
          ctx.rect(gridField[i+10].startingX, gridField[i+10].startingY, 40, 40);
          ctx.rect(gridField[i-10].startingX, gridField[i-10].startingY, 40, 40);
          ctx.rect(gridField[i+1].startingX, gridField[i+1].startingY, 40, 40);
          ctx.rect(gridField[i-1].startingX, gridField[i-1].startingY, 40, 40);
          gridField[i+10].wallBuilt = false;
          gridField[i-10].wallBuilt = false;
          gridField[i+1].wallBuilt = false;
          gridField[i-1].wallBuilt = false;
          ctx.fillStyle = "black";


          ctx.fill();
          ctx.closePath();
        }
        // bottom right
        if (gridField[i-10] && gridField[i+1]) {
          if (gridField[i-10].wallBuilt && gridField[i+1].wallBuilt) {
            ctx.beginPath();
            ctx.rect(gridField[i+1].startingX, gridField[i+1].startingY, 40, 40);
            ctx.rect(gridField[i-10].startingX, gridField[i-10].startingY, 40, 40);
            gridField[i-10].wallBuilt = false;
            gridField[i+1].wallBuilt = false;
            ctx.fillStyle = "black";

            ctx.fill();
            ctx.closePath();
          }
          //top left
        }
        if (gridField[i+10] && gridField[i-1]) {
          if (gridField[i+10].wallBuilt && gridField[i-1].wallBuilt) {
            ctx.beginPath();
            ctx.rect(gridField[i+10].startingX, gridField[i+10].startingY, 40, 40);
            ctx.rect(gridField[i-1].startingX, gridField[i-1].startingY, 40, 40);
            gridField[i+10].wallBuilt = false;
            gridField[i-1].wallBuilt = false;

            ctx.fillStyle = "black";
            ctx.fill();
            ctx.closePath();
          }
        }

      }
    }

  }

  function rebuildWalls(ctx) {
   for (var i = 0; i < gridField.length; i++) {
     if (gridField[i].wallBuilt) {
       ctx.rect(gridField[i].startingX, gridField[i].startingY, 40, 40);
       ctx.fillStyle = "black";

       ctx.fill();
     }
   }
  }

  function checkcollision () {
    for (var i = 0; i < gridField.length; i++) {
      if (gridField[i].wallBuilt) {
        if (gridField[i].startingX+20 === pacman.x && gridField[i].startingY+20 === pacman.y) {
           return detectCollision = true;
        }
      } else if (pacman.x > 380 || pacman.y > 380 || pacman.x < 0 || pacman.y < 0) {
        return detectCollision = true;
      }
    }
  }

  function checkFruitCollision (ctx) {
    for (var i = 0; i < gridField.length; i++) {
        if (gridField[i].hasFood && gridField[i].startingX+20 === pacman.x && gridField[i].startingY+20 === pacman.y) {
          gridField[i].fruitEaten = true;
          ctx.beginPath();
          ctx.arc(pacman.x, pacman.y, 10, 2*Math.PI, false);
          ctx.fillStyle = "orange";
          ctx.fill();
          ctx.closePath();
        }
    }
  }

  function enemyCollidePlayer () {
    if (ghost.x === pacman.x && ghost.y === pacman.y) {

      return gameover = true;
    }
  }



  function move(evt) {

    switch (evt.keyCode) {
      // up
      case 38:
      pacman.y -= 40;
      checkcollision();
      // console.log(pacman.y + " y");
      if (detectCollision) {
        pacman.y += 40;
        detectCollision = false;
      }


      break;
      // left
      case 37:
      pacman.x -= 40;
      checkcollision();
      if (detectCollision) {
        pacman.x += 40;
        detectCollision = false;
      }

      // console.log(pacman.x + " x");
      break;
      // right
      case 39:
      pacman.x += 40;
      checkcollision();
      if (detectCollision) {
        pacman.x -= 40;
        detectCollision = false;
      }

      // console.log(pacman.x + " x");
      break;
      // down
      case 40:
      pacman.y += 40;
      checkcollision();
      if (detectCollision) {
        pacman.y -= 40;
        detectCollision = false;
      }

      // console.log(pacman.y + " y");
    }

    followPacman.push({
      "pacmanx": pacman.x,
      "pacmany":pacman.y
    });

  }



setUp();
