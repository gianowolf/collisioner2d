class Admin{

    constructor(){
        this.particulas_moviles = [];
        this.particulas_inmoviles = [];
        this.arbol;
        this.collisioner = new Collisioner();
        this.stats = new Stats_controller();
        this.pause = false;
        this.pf;

        //

        this.total_healthy = 0;
    }

    generarParticulas(total_particulas, inmoviles){

        this.pf = new ParticlesFactory(total_particulas, inmoviles);

        this.particulas_moviles = this.pf.getParticulasMoviles();
        this.particulas_inmoviles = this.pf.getParticulasInmoviles();
              
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
            for(let i = 0; i < cant_inmoviles; i++){
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
            
            this.stats.drawData(this.pf.getHealthies(),this.pf.getTotalParticles(),this.pf.getRecovereds(),this.pf.getDeceaseds(), this.pf.getSicks(), this.pf.getInmoviles());
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