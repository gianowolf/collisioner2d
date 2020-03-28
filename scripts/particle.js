let total_sick = 0,
    total_recovered = 0,
    total_deceased = 0,
    total_healthy = 0;


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

        total_healthy++;

        //State: sick | healthy
        this.state = state; 
        if(state) //zero-patient
        {
            this.x = canvas.clientWidth/2;
            this.y = canvas.clientHeight/2;
            this.imSick();
        }else{
             //Creates particle in random-position
            this.x = RADIO + Math.random() * (canvas.clientWidth  - 2 *RADIO);
            this.y = RADIO + Math.random() * (canvas.clientHeight - 2* RADIO);
        }
    }



    imSick()
    {
        total_sick++;
        total_healthy--;
        let random = Math.random();
        switch (this.edad) {

            //Anciano
            case 2:
                if(Particle.isSatured()){ 
                    setTimeout(() => { 
                        this.state = DECEASED;
                        this.dx = 0; this.dy = 0;
                        total_deceased++;
                        total_sick--;
                    }, TIME_SICK)}
                else{
                    if(random < 0.05){
                        setTimeout(() => { 
                            this.state = DECEASED;
                            this.dx = 0; this.dy = 0;
                            total_deceased++;
                            total_sick--;
                        }, TIME_SICK)
                    }
                    else{
                        setTimeout(() => { 
                            this.state = RECOVERED;
                            total_recovered++;
                            total_sick--;
                        }, TIME_SICK)
                    }
                }
                break;

            default:
                if(Particle.isSatured())
                { 
                    if( random< 0.01){
                        setTimeout(() => { 
                            this.state = DECEASED;
                            this.dx = 0; this.dy = 0;
                            total_deceased++;
                            total_sick--;
                        }, TIME_SICK)
                    }
                    else {
                    setTimeout(() => { 
                        this.state = RECOVERED;
                        total_recovered++;
                        total_sick--;
                    }, TIME_SICK)
                    }
                }
                else{
                    if(Math.random() < 0.001){
                        setTimeout(() => { 
                            this.state = DECEASED;
                            this.dx = 0; this.dy = 0;
                            total_deceased++;
                            total_sick--;
                        }, TIME_SICK)
                    }
                    else{
                        setTimeout(() => { 
                            this.state = RECOVERED;
                            total_recovered++;
                            total_sick--;
                        }, TIME_SICK)
                    }
                }
        
                break;
        }
    }

    static isSatured(){
        if(total_sick/CANT_PARTICULAS > 0.15){
            return true;
        }
        else{
            return false;
        }
    }


    changeState(contact_particle)
    {
        if(this.state == 0 && contact_particle.state == 1)
        {
            this.state = 1;
            this.imSick();
        }
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
        ctx.arc(this.x, this.y, RADIO, 0, Math.PI*2, true);

        ctx.fill();
    }

    move(){
        //Verificamos que la particula no sobrepase horizontalmente 
        if(this.x + this.dx + RADIO >= canvas.clientWidth || this.x + this.dx - RADIO<= 0)
        {
			this.dx = -this.dx;
        }
        
        //Verificamos que la particula no sobrepase verticalmente
        if(this.y + this.dy + RADIO >= canvas.clientHeight || this.y + this.dy - RADIO <= 0)
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
        let radioCuadrado = (RADIO + RADIO) * (RADIO + RADIO);
        let distanciaX = p2.x - p1.x;
        let distanciaY = p2.y - p1.y;
        //Pitagoras
        let distanciaCuadrado = (distanciaX * distanciaX) + (distanciaY * distanciaY);

        // Filtro de que colisione el circulo, y no el cuadrado
        if (distanciaCuadrado > radioCuadrado)
        {
            return;
        }

        p1.changeState(p2);
        p2.changeState(p1);

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


