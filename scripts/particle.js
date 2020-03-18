const SPEED = .5;
const RADIO = 5;

class Particle{

    /*
    0 Healthy
    1 Sick
    2 Recovered 
    */

    
	constructor(){
		this.state = 0;
		this.x = Math.random() * document.querySelector("#canvas").clientWidth;
        this.y = Math.random() * document.querySelector("#canvas").clientHeight;
        let theta = Math.random() * Math.PI * 2;
        this.dx = Math.cos(theta) * SPEED;
        this.dy = Math.sin(theta) * SPEED;
	}

	getRadio(){ return RADIO; };

	getSpeed(){ return SPEED; };

	getColor(){
		switch (this.state) {
			case 0: //healthy
				return "#555555";
			case 1: //sick
				return "red";
			case 2: //recovered
				return "#04b9fc";
			default:
				break;
		}
	};

	draw(){
		let canvas = document.querySelector("#canvas");
		var ctx = canvas.getContext("2d");

		ctx.beginPath();

		//Dibuja particula
		ctx.fillStyle = this.getColor();
		ctx.arc( this.x, this.y, RADIO, 0, Math.PI*2, true);

		//Rellena la particula
		ctx.fill();
	};

	move(){
        /*this.x += this.dx;
		this.y += this.dy;*/
		if(this.x + this.dx >= canvas.clientWidth || this.x + this.dx <= 0){
			this.dx = -this.dx;
		}

		if(this.y + this.dy >= canvas.clientHeight || this.y + this.dy <= 0){
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;
	};

}