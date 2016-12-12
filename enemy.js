function Enemy (x, y, ctx) {  
    this.x = x;
    this.y = y;
    this.r = 10;
    this.color = "pink";
    this.ctx = ctx;
    this.counter = 0;
    this.createGhost = function () {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      this.ctx.arc(this.x, this.y, this.r, 2*Math.PI, false);
      this.ctx.closePath();
      this.ctx.fill();
    };

    this.updateValue = function() {
      for (var i = 0; i < 1; i++) {
        if (this.counter === 0) {
          this.x = 20;
          this.y = 20;
          this.counter++
        } else {
          this.x = followPacman[i].pacmanx;
          this.y = followPacman[i].pacmany;
          followPacman.splice(i, 1)
        }
      }
    }
}
