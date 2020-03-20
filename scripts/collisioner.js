class Collisioner{


    constructor(movibles,arbol){
        this.collisionTree = arbol;
        this.particulas = movibles;
       
    }

    refresh(){
        //recorre todas las particulas
        for(let i = 0; i < this.particulas.length; i++){
            //pide las posibles colisiones al arbol
            let posibles_colisiones = this.collisionTree.detectObjects(this.particulas);

            //recorre el arreglo de posibles colisiones 
            for(let j = 0; j < posibles_colisiones.length ; j++){
                
                if(this.interseccion(this.particulas[i] , posibles_colisiones[j])){
                    this.colision();
                }
            }           

        }
    }

    //le pregunta al arbol si la particula debe collisionar
    interseccion(p1 , p2){

        let radio = Math.pow(p1.getRadio(),2);
        let distancia = Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2)
        
        if(distancia <= radio){
            return true;
        }

        return false;
    }

    //Funcion calcular colisiones
    colision(p1,p2){

        if(p2.esInmovil()){
            
        }
        //si es movil, rebota
        //si no es movil, se queda en el lugar
        //calcula nuevas direcciones
        //move()
    }



}