const MAX_PARTICLES = 4;
const MAX_LEVELS = 7;
const LVL_CERO = 0;

class Admin{

    constructor(){
        this.particulas_moviles = [];
        this.particulas_inmoviles = [];
        this.arbol;
        this.total_particulas;
    }

    generarParticulas(cantidad,cantidad_inmoviles){

        //moviles
        for(var i = 0; i < cantidad - cantidad_inmoviles; i++){
            this.particulas_moviles.push(new Particle(false));
        }


        //inmoviles-cuarentena
        for(var i = 0; i < cantidad_inmoviles; i++){
            this.particulas_inmoviles.push(new Particle(true));
        }

        this.total_particulas = cantidad;

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
        for(let i = 0; i < this.particulas_inmoviles.length; i++){
            this.arbol.insert(this.particulas_inmoviles[i]);  
        }

        //inserto MOVILES
        for(let i = 0 ; i < this.particulas_moviles.length ; i++){
            this.arbol.insert(this.particulas_moviles[i])
        }


        //dibujo y muevo las particulas MOVILES
        for(let i = 0 ; i < this.particulas_moviles.length ; i++){
            this.particulas_moviles[i].move();
            this.particulas_moviles[i].draw();
        }
        for (let i = 0; i < this.particulas_inmoviles.length; i++) {
            this.particulas_inmoviles[i].draw();
        }

        
    };


}