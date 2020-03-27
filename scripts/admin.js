class Admin{

    constructor(){
        this.particulas_moviles = [];
        this.particulas_inmoviles = [];
        this.arbol;
        this.total_particulas;
        this.collisioner = new Collisioner();
        this.stats = new Stats_controller();
    }

    generarParticulas(){

        //moviles
        for(var i = 0; i < CANT_PARTICULAS - CANT_INMOVILES; i++){
            this.particulas_moviles.push(new Particle_movil(HEALTHY));
        }

        this.particulas_moviles.push(new Particle_movil(SICK));

        //inmoviles-cuarentena
        for(var i = 0; i < CANT_INMOVILES; i++){
            this.particulas_inmoviles.push(new Particle_inmovil(HEALTHY));
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
        
        //limpiamos el arbol cada frame 
        this.arbol.clear();

        //inserto INMOVILES
        for(let i = 0; i < CANT_INMOVILES; i++){
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

}