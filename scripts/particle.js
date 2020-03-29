class Particle{

    constructor(state)
    {
        // Random Age particle
        let rand = Math.random() * 10;
        if(rand < 9){
            this.edad = 1;
        } else{
            this.edad = 2;
        }
        //State: sick | healthy
        this.state = state; 
        if(state) //zero-patient
        {
            this.x = canvas.clientWidth/2;
            this.y = canvas.clientHeight/2;
            ParticlesFactory.newSick(this);
            this.state = SICK;
        }else{
             //Creates particle in random-position
            this.x = radio + Math.random() * (canvas.clientWidth  - 2 * radio);
            this.y = radio + Math.random() * (canvas.clientHeight - 2 * radio);
        }
    }

    stopMove(){
        this.dx = 0;
        this.dy = 0;
    }

    getAge(){
        return this.edad;
    }

    getState(){
        return this.state
    }

    setState(new_state){
        this.state = new_state;
    }

    contagio(contact_particle){

        if(this.state == 0 && contact_particle.state == 1){
            return true;
        }
        else
            return false;
    }


    /*
    * POSITION & DRAWING 
    */

   getColor()
   {
       switch(this.state)
       {
           case 0:
               return COLOR_HEALTHY;
           case 1: 
               return COLOR_SICK;
           case 2: 
               return COLOR_RECOVERED;
           case 4:
               return COLOR_DECEASED;
           default:
               break;
       }
   }

    draw()
    {
        let cv = document.getElementById("canvas");
        let ctx = cv.getContext("2d");
        
        ctx.beginPath();

        ctx.fillStyle = this.getColor();
        ctx.arc(this.x, this.y, radio, 0, Math.PI*2, true);

        ctx.fill();
    }

    move(){
        //Verificamos que la particula no sobrepase horizontalmente 
        if(this.x + this.dx + radio >= canvas.clientWidth || this.x + this.dx - radio<= 0)
        {
			this.dx = -this.dx;
        }
        
        //Verificamos que la particula no sobrepase verticalmente
        if(this.y + this.dy + radio >= canvas.clientHeight || this.y + this.dy - radio <= 0)
        {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;
    }

    setSpeed(dx,dy){

    }

    static versus(p1,p2)
    {
        let radioCuadrado = (radio + radio) * (radio + radio);
        let distanciaX = p2.x - p1.x;
        let distanciaY = p2.y - p1.y;
        //Pitagoras
        let distanciaCuadrado = (distanciaX * distanciaX) + (distanciaY * distanciaY);

        // Filtro de que colisione el circulo, y no el cuadrado
        if (distanciaCuadrado > radioCuadrado)
        {
            return;
        }

        if(p1.contagio(p2)){
            this.state = SICK;
            ParticlesFactory.newSick(p1);
        }
        if(p2.contagio(p1)){
            this.state = SICK;
            ParticlesFactory.newSick(p2);
        }

        let distanciaMagnitud = Math.sqrt(distanciaCuadrado);

        let distanciaNormalX;
        let distanciaNormalY;

        if (distanciaMagnitud > 0) {
            distanciaNormalX = distanciaX / distanciaMagnitud;
            distanciaNormalY = distanciaY / distanciaMagnitud;
        } 
        else 
        {
            distanciaNormalX = 1;
            distanciaNormalY = 0;
        }
        
        if(p1.state != DECEASED){
            p1.setSpeed(-distanciaNormalX * SPEED,-distanciaNormalY * SPEED)
        }

        if(p2.state != DECEASED){
            p2.setSpeed(distanciaNormalX * SPEED, distanciaNormalY * SPEED)
        }

     

    }
}


