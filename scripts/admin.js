class Admin{


	constructor(){
		this.particulas = [];
		this.cuadricula = [];
	}

    //Metodo para asignar una posicion en la cuadricula a cada particula
	asignarPosicionCuadricula(particula){

	}

	generarParticulas(cantidad){

		//Instancia todas las particulas
		for (var i = 0; i < cantidad; i++) {
			let particula = new Particle();
			this.particulas.push(particula);
		}
    }
    
    refresh(nMovement){
		//Mover todas las particulas
		for (var i = 0; i < nMovement; i++) {
			this.particulas[i].move();
		}

		for (var i = 0; i < this.particulas.length; i++) {
			this.particulas[i].draw();
		}
    }

}