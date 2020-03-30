class Admin{

	constructor() {
        this.array_moviles = [];
        this.array_inmoviles = [];

        this.total_particulas =0;
        this.inmoviles = 0;
        this.radio = 0;

        this.arbol;
        this.collisioner = new Collisioner();
        this.stats = new Stats_controller();
        this.pf = new ParticlesFactory();
        this.total_healthy = 0;
		
    }

    generarParticulas(total, inmoviles , radio){
    
        this.inmoviles = inmoviles;
        this.total_particulas = total;
        this.radio = radio;
		
		this.pf.generarParticulas(total, inmoviles , radio);
        this.array_moviles = this.pf.getParticulasMoviles();
        this.array_inmoviles = this.pf.getParticulasInmoviles();
              
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

        range_2.max = range_1.value - 1;

        if(!this.pause){
            //limpiamos el arbol cada frame 
            this.arbol.clear();

            //inserto INMOVILES
            for(let i = 0; i < this.inmoviles; i++){
                this.arbol.insert(this.array_inmoviles[i]);  
            }

            //inserto MOVILES
            for(let i = 0 ; i < this.array_moviles.length ; i++){
                this.arbol.insert(this.array_moviles[i]);
            }

			this.collisioner.gestionarColision(this.array_moviles.concat(this.array_inmoviles), this.arbol);

            //dibujo y muevo las particulas MOVILES
			
            for(let i = 0 ; i < this.array_moviles.length ; i++){
                this.array_moviles[i].move();
                this.array_moviles[i].draw();
            }
            for (let i = 0; i < this.array_inmoviles.length; i++) {
                this.array_inmoviles[i].draw();
            }
            
            this.stats.drawData(this.total_particulas , this.inmoviles ,this.pf.getHealthies() , this.pf.getSicks() , this.pf.getRecovereds() , this.pf.getDeceaseds())
        }
        
    };

    // interaccion particula-p factory
    newSick(timer_id){
        this.pf.newSick(timer_id);
    }

    newRecovered(){
        this.pf.newRecovered();
    }

    newDeceased(){
        this.pf.newDeceased();
    }
    // FUNCIONES PARA INTERACCION

    restart(){

        this.stats.clear();
        this.pf.clear();
        
        this.total_particulas = range_1.value;
        this.inmoviles = range_2.value;	
		this.radio = range_3.value;
        
    };

}