class Quadtree{

    constructor(bds, maxLvl , maxPrt , lvl){

        this.maxLevels = maxLvl;
        this.maxParticles = maxPrt;
        this.level = lvl;
        this.nodes = [];
        this.particulas = [];
        this.bounds = bds;
    }

    getHijos(){
        return this.particulas;
    }

    getIndex(particula){

        var indexes = [],
            verticalMidpoint    = this.bounds.x + (this.bounds.width/2),
            horizontalMidpoint  = this.bounds.y + (this.bounds.height/2);
        
        var startIsNorth = particula.y - radio < horizontalMidpoint,
            startIsWest  = particula.x - radio < verticalMidpoint,
            endIsEast    = particula.x + radio > verticalMidpoint,
            endIsSouth   = particula.y + radio > horizontalMidpoint;
        
        //CUADRANTE SUPERIOR DERECHO
        if(startIsNorth && endIsEast){
            indexes.push(0);
        }
        //top-left quad
        if(startIsWest && startIsNorth){
            indexes.push(1);
        }
        //bottom-left quad
        if(startIsWest && endIsSouth){
            indexes.push(2);
        }
        //bottom-right quad
        if(endIsEast && endIsSouth){
            indexes.push(3);
		}

		return indexes;
    };

    insert(particula){
        
        var indexes = 0;

        //si tiene hijos
        if(this.nodes.length){
            indexes = this.getIndex(particula);
            
            for (let i = 0; i < indexes.length; i++) {
                this.nodes[indexes[i]].insert(particula);
                
            }
            return;
        }

        //caso contrario
        this.particulas.push(particula);

        //si alcanzamos el maximo de objetos
        if(this.particulas.length > this.maxParticles && this.level < this.maxLevels){

            //si no tenemos hijos, dividimos
            if(!this.nodes.length){
                this.split();
            }

            //agregamos las particulas a los nodos
            for(var i = 0 ; i < this.particulas.length ; i++){
                
                indexes = this.getIndex(this.particulas[i]);
                for(var k = 0 ; k < indexes.length ; k++){
                    this.nodes[indexes[k]].insert(this.particulas[i]);
                }
            }

            this.particulas = [];
        }
        
    }

    detectObjects(particula){

        var indexes = this.getIndex(particula), //obtengo los cuadrantes
            returnObjects = this.particulas; //agrega las particulas del nodo

        //si hay subnodos, se devuelven
        if(this.nodes.length){ 
            for(var i=0 ; i<indexes.length ; i++){
                returnObjects = returnObjects.concat(this.nodes[indexes[i]].detectObjects(particula));
            }
        }

        //eliminamos los duplicados
        returnObjects = returnObjects.filter(function(item,index){
            return returnObjects.indexOf(item) >= index;
        })

        return returnObjects;
    };

    clear(){

        this.particulas = [];

        for(let i = 0 ; i < this.particulas.length ; i++){
            if(this.nodes.length){
                this.particulas[i].clear();
            }
        }

        this.nodes = []
    };

    split(){
        var nextLevel   = this.level + 1,
            subWidth    = this.bounds.width/2,
            subHeight   = this.bounds.height/2,
            x           = this.bounds.x,
            y           = this.bounds.y;

        //NODO SUPERIOR DERECHO
        this.nodes[0] = new Quadtree({
            x   : x + subWidth,
            y   : y,
            width: subWidth,
            height: subHeight  
        }, this.maxLevels , this.maxParticles ,  nextLevel);

        
        //NODO SUPERIOR IZQUIERDO
        this.nodes[1] = new Quadtree({
            x   : x,
            y   : y,
            width: subWidth,
            height: subHeight  
        } , this.maxLevels, this.maxParticles  , nextLevel);



        //NODO INFERIOR IZQUIERDO
        this.nodes[2] = new Quadtree({
            x   : x,
            y   : y + subHeight,
            width: subWidth,
            height: subHeight  
        } , this.maxLevels , this.maxParticles ,  nextLevel);
   

        //NODO INFERIOR DERECHO
        this.nodes[3] = new Quadtree({
            x   : x + subWidth,
            y   : y + subHeight,
            width: subWidth,
            height: subHeight  
        } , this.maxLevels , this.maxParticles , nextLevel);

        if(DRAW_TREE){
            this.nodes[0].draw();
            this.nodes[1].draw();
            this.nodes[2].draw();
            this.nodes[3].draw();
        }
	};

    draw(){
		let canvas = document.querySelector("#canvas");
        let ctx = canvas.getContext("2d");
        ctx.strokeStyle = COLOR_TREE;
        ctx.lineWidth = 1;
        ctx.strokeRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
 
    };
}