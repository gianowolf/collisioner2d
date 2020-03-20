const SPEED = 2;
const RADIO = 2;

class Particle{

    constructor(esInmovil){
        this.state = 0; //0 Healthy - 1 Sick - 2 Recuperado
        this.x = Math.random() * document.getElementById("canvas").clientWidth /2 ;
        this.y = Math.random() * document.getElementById("canvas").clientHeight /2;
        
        let theta = Math.random()  * 2 * Math.PI;
        this.dx   =  Math.cos(theta) * SPEED;
        this.dy   =  Math.sin(theta) * SPEED ;
        
        this.esInmovil = esInmovil;
      
    }

    getRadio(){
        return RADIO;
    }


    esInmovil(){
        return this.esInmovil;
    }

    getColor(){

        switch(this.state){
            case 0: //healthy
                return "#555555";
            case 1: //sick
                return "red";
            case 2: //recovered
                return "#04b9fc"
            default:
                break;
        }
    }
    
    draw(){
        let cv = document.getElementById("canvas");
        let ctx = cv.getContext("2d");
        
        ctx.beginPath();

        //Dibuja particula
        ctx.fillStyle = this.getColor();
        ctx.arc(this.x, this.y, RADIO, 0, Math.PI*2, true);

        ctx.fill();

    }

    move(){
        //Verificamos que la particula no sobrepase horizontalmente 
        if(this.x + this.dx >= canvas.clientWidth || this.x + this.dx <= 0){
			this.dx = -this.dx;
        }
        
        //Verificamos que la particula no sobrepase verticalmente
		if(this.y + this.dy >= canvas.clientHeight || this.y + this.dy <= 0){
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;
    }
}