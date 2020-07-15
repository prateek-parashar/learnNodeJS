var Ball = function( x, y, vx, vy ) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.dt = 25; // 1000/25 = 40 frames per second
    setInterval( () => {
        this.x += vx;  
        this.y += vy;
        console.log( this.x, this.y );
    }, this.dt );
  
}

var ball = new Ball( 0, 0, 10000, 10000 );