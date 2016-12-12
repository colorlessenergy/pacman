function Food (ctx) {
  this.ctx = ctx;
  this.counter = 0;
  
  this.createFood = function () {
    for (var i = 0; i < gridField.length; i++) {
      if (!gridField[i].wallBuilt && !gridField[i].fruitEaten) {
        this.ctx.beginPath();
        this.ctx.arc(gridField[i].startingX+20, gridField[i].startingY+20, 2, 0, 2*Math.PI, false);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        gridField[i].hasFood = true;
        this.ctx.closePath();
      }
    }
  }
}
