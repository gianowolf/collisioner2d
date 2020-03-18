class QuadTree{

	constructor(bounds, maxLevels, maxObjects , level){
        this.maxLevels = maxLevels;     //Cantidad maxima de niveles permitidas en el arbol  
        this.maxObjects = maxObjects;   //Cantidad maxima de particulas permitidas en un nodo
        this.level = level;             //Nivel que tiene el arbol  
        this.nodes = []
        this.particulas = []; 
        this.bounds = bounds;             
	}

	getHijos(){
		return this.nodes;
	}

	getParticulas(){
		return this.particulas;
    }

	insert(particula){
		
		var indexes = 0;

		if(this.nodes.length) {
            indexes = this.getIndex(particula);
     
            for(i=0; i<indexes.length; i++) {
                this.nodes[indexes[i]].insert(particula);     
            }
            return;
        }
     
        //otherwise, store object here
        this.particulas.push(particula);

        //max_objects reached

        if(this.particulas.length > this.maxObjects && this.level < this.maxLevels) {

            //split if we don't already have subnodes
            if(!this.nodes.length) {
                this.split();
            }
            
            //add all objects to their corresponding subnode
            for(var i=0; i<this.particulas.length; i++) {
                indexes = this.getIndex(this.particulas[i]);
                for(var k=0; k<indexes.length; k++) {
                    this.nodes[indexes[k]].insert(this.particulas[i]);
                }
            }

            //clean up this node
            this.particulas = [];
        }
	}


    /*
    * Split(): Dividimos cada Nodo en 4 sub-nodos
    */
    split(){

        var nextLevel   = this.level + 1,
            subWidth    = this.bounds.width/2,
            subHeight   = this.bounds.height/2,
            x           = this.bounds.x,
            y           = this.bounds.y;

        //NODO SUPERIOR DERECHO
        this.nodes[0] = new QuadTree({
            x   : x + subWidth,
            y   : y,
            width: subWidth,
            height: subHeight  
        }, this.maxLevels , this.maxObjects ,  nextLevel);
		this.nodes[0].draw();
        
        
        //NODO SUPERIOR IZQUIERDO
        this.nodes[1] = new QuadTree({
            x   : x,
            y   : y,
            width: subWidth,
            height: subHeight  
        } , this.maxObjects , this.maxLevels , nextLevel);
		this.nodes[1].draw();

        //NODO INFERIOR IZQUIERDO
        this.nodes[2] = new QuadTree({
            x   : x,
            y   : y + subHeight,
            width: subWidth,
            height: subHeight  
        } , this.maxObjects , this.maxLevels , nextLevel);
		this.nodes[2].draw();

        //NODO INFERIOR DERECHO
        this.nodes[3] = new QuadTree({
            x   : x + subWidth,
            y   : y + subHeight,
            width: subWidth,
            height: subHeight  
		} , this.maxObjects , this.maxLevels , nextLevel);
        this.nodes[3].draw();
        
	};


    /*
    * Calcula a qué nodo pertenece el objeto
    * input: Particula      calcula los bordes y la posicion: x y iwdth y height
    * return: Array         un array con los indices de todos los subnodos 
    *   0: Arriba derecha - 1: Arriba Izq - 2: Abajo izquierda - 3: abajo derecha.
    */
    getIndex(particula){

        var indexes = [],
            verticalMidpoint    = this.bounds.x + (this.bounds.width/2),
            horizontalMidpoint  = this.bounds.y + (this.bounds.height/2);

        var radio = particula.getRadio();
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

    /*
    * devuelve un array con los objetos los objetos de bloques cercanos
    * Return: array with detected objects
    * param: particula para checkear los bordes
    */
    detectObjects(particula){

        var indexes = this.getIndex(particula),
        returnObjects = this.particulas;

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

    /*
    * Limpiamos el arbol
    */

    clear(){
        
        this.particulas = [];

        for (let i = 0; i < this.particulas.length; i++) {
            if(this.nodes.length){
                this.particulas[i].clear();
            }
        }

        this.nodes = [];
	};
	
	draw(){
		let canvas = document.querySelector("#canvas");
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "red";
		ctx.strokeRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);

	};

}