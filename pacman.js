function pacmanCreator (x, y, r, ctx) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.ctx = ctx;
  this.pacman = this;  
  this.createPacman = function () {

    this.ctx.beginPath();
    this.ctx.fillStyle = "orange";
    this.ctx.arc(this.x, this.y, this.r, 2*Math.PI, false);
    this.ctx.closePath();
    this.ctx.fill();
  };



}
