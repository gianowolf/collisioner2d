class Admin{

    constructor(){
        this.particulas_moviles = [];
        this.particulas_inmoviles = [];
        this.arbol;
        this.total_particulas;
        this.collisioner = new Collisioner();
        this.stats = new Stats_controller();
        this.pause = false;

        //

        this.total_healthy = 0;
    }

    generarParticulas(){

        
        total_sick = 0;
        total_deceased = 0;
        total_recovered = 0; 

        this.particulas_moviles = [];
        this.particulas_inmoviles = [];

        //moviles
        for(var i = 0; i < cant_particulas - cant_inmobiles - 1; i++){
            this.particulas_moviles.push(new Particle_movil(HEALTHY));
            this.total_healthy++;
        }

        this.particulas_moviles.push(new Particle_movil(SICK));

        //inmoviles-cuarentena
        for(var i = 0; i < cant_inmobiles; i++){
            this.particulas_inmoviles.push(new Particle_inmovil(HEALTHY));
            this.total_healthy++;
        }        
    }

    generarArbol(canvasWidth , canvasHeight){

        this.arbol = new Quadtree({
            x: 0,
            y: 0,
            width: canvasWidth,
            height: canvasHeight
        }, MAX_LEVELS , MAX_PARTICLES , LVL_CERO);
    };

    refresh(){

        if(!this.pause){
            //limpiamos el arbol cada frame 
            this.arbol.clear();

            //inserto INMOVILES
            for(let i = 0; i < cant_inmobiles; i++){
                this.arbol.insert(this.particulas_inmoviles[i]);  
            }

            //inserto MOVILES
            for(let i = 0 ; i < this.particulas_moviles.length ; i++){
                this.arbol.insert(this.particulas_moviles[i]);
            }

            this.collisioner.gestionarColision(this.particulas_moviles, this.arbol);

            //dibujo y muevo las particulas MOVILES
            for(let i = 0 ; i < this.particulas_moviles.length ; i++){
                this.particulas_moviles[i].move();
                this.particulas_moviles[i].draw();
            }
            for (let i = 0; i < this.particulas_inmoviles.length; i++) {
                this.particulas_inmoviles[i].draw();
            }
            
            this.stats.drawData();
        }
        
        
    };

    // FUNCIONES PARA INTERACCION

    play(){
        this.pause = false;
    };

    pause(){
        this.pause = true;
    };

    restart(){
        this.stats = new Stats_controller();
        this.generarParticulas();
    };

}