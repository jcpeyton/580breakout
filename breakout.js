
function Game(){
	var self = this;
	this.width = 500;
	this.height = 500;
	this.breaksound = new Audio('break.wav');
	this.bouncesound = new Audio('bounce.wav');
	this.losesound = new Audio('lose.wav');
	this.winsound = new Audio('win.wav');
	this.ball = {x:this.width*0.49, y:this.height*0.8, dx:0, dy:-7};
	this.ballwidth = 10;
	this.ballheight = 10;
	this.bar = {x:this.width/2, y:this.height*0.9};
	this.bardirection = "none";
	this.barwidth = 100;
	this.barheight = 15;
	this.bricks = [{x:this.width*0.15, y:this.height*0.05},
					{x:this.width*0.25, y:this.height*0.05},
					{x:this.width*0.35, y:this.height*0.05},
					{x:this.width*0.45, y:this.height*0.05},
					{x:this.width*0.55, y:this.height*0.05},
					{x:this.width*0.65, y:this.height*0.05},
					{x:this.width*0.75, y:this.height*0.05},
					{x:this.width*0.85, y:this.height*0.05},
					{x:this.width*0.1, y:this.height*0.1},
					{x:this.width*0.2, y:this.height*0.1},
					{x:this.width*0.3, y:this.height*0.1},
					{x:this.width*0.4, y:this.height*0.1},
					{x:this.width*0.5, y:this.height*0.1},
					{x:this.width*0.6, y:this.height*0.1},
					{x:this.width*0.7, y:this.height*0.1},
					{x:this.width*0.8, y:this.height*0.1},
					{x:this.width*0.9, y:this.height*0.1},
					{x:this.width*0.15, y:this.height*0.15},
					{x:this.width*0.25, y:this.height*0.15},
					{x:this.width*0.35, y:this.height*0.15},
					{x:this.width*0.45, y:this.height*0.15},
					{x:this.width*0.55, y:this.height*0.15},
					{x:this.width*0.65, y:this.height*0.15},
					{x:this.width*0.75, y:this.height*0.15},
					{x:this.width*0.85, y:this.height*0.15},
					{x:this.width*0.1, y:this.height*0.2},
					{x:this.width*0.2, y:this.height*0.2},
					{x:this.width*0.3, y:this.height*0.2},
					{x:this.width*0.4, y:this.height*0.2},
					{x:this.width*0.5, y:this.height*0.2},
					{x:this.width*0.6, y:this.height*0.2},
					{x:this.width*0.7, y:this.height*0.2},
					{x:this.width*0.8, y:this.height*0.2},
					{x:this.width*0.9, y:this.height*0.2},
					{x:this.width*0.15, y:this.height*0.25},
					{x:this.width*0.25, y:this.height*0.25},
					{x:this.width*0.35, y:this.height*0.25},
					{x:this.width*0.45, y:this.height*0.25},
					{x:this.width*0.55, y:this.height*0.25},
					{x:this.width*0.65, y:this.height*0.25},
					{x:this.width*0.75, y:this.height*0.25},
					{x:this.width*0.85, y:this.height*0.25},
					{x:this.width*0.1, y:this.height*0.3},
					{x:this.width*0.2, y:this.height*0.3},
					{x:this.width*0.3, y:this.height*0.3},
					{x:this.width*0.4, y:this.height*0.3},
					{x:this.width*0.5, y:this.height*0.3},
					{x:this.width*0.6, y:this.height*0.3},
					{x:this.width*0.7, y:this.height*0.3},
					{x:this.width*0.8, y:this.height*0.3},
					{x:this.width*0.9, y:this.height*0.3}];
	this.brickwidth = 40;
	this.brickheight = 20;
	this.lives = 3;
	this.score = 0;
	this.state = "none";
	
	var canvas = document.createElement('canvas');
	canvas.width = this.width;
	canvas.height = this.height;
	document.body.appendChild(canvas);
	this.ctx = canvas.getContext('2d');
	
	this.handleKeyDown = this.handleKeyDown.bind(this);
	window.addEventListener('keydown', this.handleKeyDown);
	
	this.handleKeyUp = this.handleKeyUp.bind(this);
	window.addEventListener('keyup', this.handleKeyUp);
	
	this.interval = setInterval(()=>this.loop(), 50);
}

Game.prototype.gameWon = function() {
	clearInterval(this.interval);
	this.winsound.play();
	this.state = "won";
}

Game.prototype.gameLost = function() {
	clearInterval(this.interval);
	this.losesound.play();
	this.state = "lost";
}

Game.prototype.handleKeyDown = function(event) {
	switch(event.key){
		case 'a':
		case 'ArrowLeft':
			this.bardirection = "left";
			break;
		case 'd':
		case 'ArrowRight':
			this.bardirection = "right";
			break;
	}
}

Game.prototype.handleKeyUp = function(event) {
	switch(event.key){
		case 'a':
		case 'ArrowLeft':
		case 'd':
		case 'ArrowRight':
			this.bardirection = "none";
			break;
	}
}
	
Game.prototype.render = function(){
	//Erasing
	this.ctx.fillStyle = "#000";
	this.ctx.fillRect(0, 0, this.width, this.height);
	
	//Drawing Bricks
	this.ctx.fillStyle = "ivory";
	this.bricks.forEach((brick) => {
		this.ctx.fillRect(
			1 + brick.x - this.brickwidth/2,
			1 + brick.y - this.brickheight/2,
			this.brickwidth - 1,
			this.brickheight - 1
		);
	});
	
	//Drawing Ball
	this.ctx.fillStyle = "ivory";
	this.ctx.fillRect(
		this.ball.x - this.ballwidth/2,
		this.ball.y - this.ballheight/2,
		this.ballwidth,
		this.ballheight
	);
	
	//Drawing Bar
	this.ctx.fillStyle = "ivory";
	this.ctx.fillRect(
		this.bar.x - this.barwidth/2,
		this.bar.y - this.barheight/2,
		this.barwidth,
		this.barheight
	);
	
	//Drawing Score
    this.ctx.fillStyle = "white";
    this.ctx.font = '16px sans-serif';
    this.ctx.fillText("Score: " + this.score, 10, this.height - 10);
	
	//Drawing State
	switch (this.state) {
		case "won":
			this.ctx.fillText("You Won!", this.width - 80, this.height - 10);
			break;
		case "lost":
			this.ctx.fillText("You Lost!", this.width - 80, this.height - 10);
			break;
	}
}

Game.prototype.update = function(){
	//Moving ball
	this.ball.x += this.ball.dx;
	this.ball.y += this.ball.dy;
	
	//Moving Bar
	if(this.bar.x + this.barwidth/2 > this.width){
		this.bardirection = "none";
		this.bar.x = this.width - this.barwidth/2;
	}
	else if(this.bar.x - this.barwidth/2 < 0){
		this.bardirection = "none";
		this.bar.x = this.barwidth/2;
	}
	
	switch(this.bardirection){
		case "left":
			this.bar.x -= 5;
			break;
		case "right":
			this.bar.x += 5;
			break;
	}
	
	//Detecting collision
	var direction = "none";
	
	if(this.ball.x < this.ballwidth/2){
		direction = "right";
		this.bouncesound.play();
	}
	else if(this.ball.x > this.width - this.ballwidth/2){
		direction = "left";
		this.bouncesound.play();
	}
	else if(this.ball.y < this.ballheight/2){
		direction = "down";
		this.bouncesound.play();
	}
	else if(this.ball.y > this.height - this.ballheight/2){
		this.gameLost();
		//direction = "up";
	}
	else{
		direction = IsColliding(this.ball.x, this.ball.y, this.ballwidth, this.ballheight, this.bar.x, this.bar.y, this.barwidth, this.barheight);
		
		if(direction !== "none"){
			this.bouncesound.play();
		}
		
		this.bricks.forEach((brick, index) => {
			if(direction === "none"){
				direction = IsColliding(this.ball.x, this.ball.y, this.ballwidth, this.ballheight, brick.x, brick.y, this.brickwidth, this.brickheight);
				if(direction !== "none"){
					this.bricks.splice(index, 1);
					this.score++;
					this.breaksound.pause();
					this.breaksound.play();
					if(this.bricks.length === 0){
						this.gameWon();
					}
				}
			}
		});
	}
	
	switch(direction) {
		case "none":
			break;
		case "up":
			this.ball.dx = 0;
			this.ball.dy = -7;
			break;
		case "down":
			this.ball.dx = 0;
			this.ball.dy = 7;
			break;
		case "left":
		case "right":
			this.ball.dx = -1 * this.ball.dx;
			break;
		case "leftup":
		case "upleft":
			this.ball.dx = -6;
			this.ball.dy = -6;
			break;
		case "leftdown":
		case "downleft":
			this.ball.dx = -6;
			this.ball.dy = 6;
			break;
		case "rightup":
		case "upright":
			this.ball.dx = 6;
			this.ball.dy = -6;
			break;
		case "rightdown":
		case "downright":
			this.ball.dx = 6;
			this.ball.dy = 6;
			break;
		default:
			break;
	}
}

Game.prototype.loop = function(){
	this.update();
	this.render();
}

new Game();

function IsColliding(x1, y1, width1, height1, x2, y2, width2, height2){
	up1 = y1 - height1/2;
	down1 = y1 + height1/2;
	right1 = x1 + width1/2;
	left1 = x1 - width1/2;
	
	up2 = y2 - height2/2;
	down2 = y2 + height2/2;
	right2 = x2 + width2/2;
	left2 = x2 - width2/2;
	
	if(up1 < down2 && down1 > up2 && right1 > left2 && left1 < right2) {
		//Colliding on the top or bottom
		if((x1 + width1/2) > (x2 - width2/2) && (x1 - width1/2) < (x2 + width2/2)){
			var delx = Math.abs(x1 - x2);
			if(delx < width2*0.2){
				if(y1 > y2)
					return "down";
				else
					return "up";
			}
			else if(x1 > x2){
				if(y1 > y2)
					return "rightdown";
				else
					return "rightup";
			}
			else{
				if(y1 > y2)
					return "leftdown";
				else
					return "leftup";
			}
		}
		//Colliding on the side
		if((y1 - height1/2) > (y2 - height2/2) && (y1 - height1/2) < (y2 + height2/2)){
			var dely = y1 - y2;
			if(dely < height2/4){
				if(x1 > x2)
					return "right";
				else
					return "left";
			}
			else if(y1 > y2){
				if(x1 > x2)
					return "downright";
				else
					return "downleft";
			}
			else{
				if(x1 > x2)
					return "upright";
				else
					return "upleft";
			}
		}
	}
	else{
		return "none";
	}
}