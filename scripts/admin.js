const MAX_PARTICLES = 5;
const MAX_LEVELS = 5;
const LEVEL_CERO = 0;

class Admin{

	constructor(){
		this.particulas = [];
		this.arbol;
	};

	generarParticulas(cantidad){
		//Instancia todas las particulas
		for (var i = 0; i < cantidad; i++) {
			let particula = new Particle();
			this.particulas.push(particula);
		}
	};

	generarArbol(canvasWidth , canvasHeight){

		this.arbol = new QuadTree({
			x: 0,
			y: 0,
			width: canvasWidth,
			height: canvasHeight
		},  MAX_LEVELS, MAX_PARTICLES, LEVEL_CERO);
	};
    
    refresh(nMovement){
		
		this.arbol.clear();

		for (let i = 0; i < this.particulas.length; i++) {
			this.arbol.insert(this.particulas[i]);
		}
		
		//Mover todas las particulas
		for (var i = 0; i < nMovement; i++) {
			this.particulas[i].move();
		}

		for (var i = 0; i < this.particulas.length; i++) {
			this.particulas[i].draw();
		}

	};
	
}