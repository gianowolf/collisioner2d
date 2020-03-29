class ParticlesFactory{

	constructor(total_particulas, inmoviles){
		this.particulas_moviles = [];
        this.particulas_inmoviles = [];
		this.sicks = 0;
		this.recovereds = 0;
		this.deceaseds = 0;
		this.healthies = 0;
		this.total = total_particulas;
		this.inmoviles = inmoviles;

		this.generarParticulas(total_particulas , inmoviles)

	}

	getRecovereds(){
		return this.recovereds;
	}

	getDeceaseds(){
		return this.deceaseds;
	}

	getHealthies(){
		return this.healthies;
	}

	getSicks(){
		return this.sicks;
	}

	getTotalParticles(){
		return this.total;
	}

	getInmoviles(){
		return this.inmoviles;
	}

	generarParticulas(total, inmoviles){

		//moviles

		//primer particula: paciente 0
		let sick = new Particle_movil(SICK)
		this.healthies++;
		this.particulas_moviles.push(sick);
		ParticlesFactory.newSick(sick);

		//resto de particulas
        for(var i = 1; i < total - inmoviles; i++){
            this.particulas_moviles.push(new Particle_movil(HEALTHY));
            this.healthies++;
		}


        //inmoviles-cuarentena
        for(var i = 0; i < inmoviles; i++){
            this.particulas_inmoviles.push(new Particle_inmovil(HEALTHY));
            this.healthies++;
        }  
	}

	static newSick(p){

		p.setState(SICK);

		this.sicks++;
		this.healthies--;

		let random = Math.random();

		switch (p.getAge()) {
			case 2:
				if(ParticlesFactory.systemSatured()){
					setTimeout(() => {
						p.setState(DECEASED)
						p.stopMove();
						this.deceaseds++;
						this.sicks--;
					}, TIME_SICK);
				}
					else
					{
						if(random < 0.05)
						{
							setTimeout(() =>{
								p.setState(DECEASED)
								p.stopMove();
								this.deceaseds++;
								this.sicks--;
							}, TIME_SICK)
						}
						else
						{
							setTimeout(() => {
								p.setState(RECOVERED)
								this.recovereds++;
								this.sicks--;
							}, TIME_SICK);
						}
					}
				break;
		
			default:

				if(ParticlesFactory.systemSatured()){
					if(random < 0.01)
					{
						setTimeout(() =>{
							p.setState(DECEASED)
							p.stopMove();
							this.deceaseds++;
							this.sicks--;
						}, TIME_SICK)
					}
					else
					{
						setTimeout(() => {
							p.setState(RECOVERED)
							this.recovereds++;
							this.sicks--;
						}, TIME_SICK);
					}
				}
					else
					{
						if(random < 0.001)
						{
							setTimeout(() =>{
								p.setState(DECEASED)
								p.stopMove();
								this.deceaseds++;
								this.sicks--;
							}, TIME_SICK)
						}
						else
						{
							setTimeout(() => {
								p.setState(RECOVERED)
								this.recovereds++;
								this.sicks--;
							}, TIME_SICK);
						}
					}
				break;
		}
	}

	static systemSatured(){
        if( this.sicks / this.total > 0.15){
            return true;
        }
        else{
            return false;
        }
    }

	getParticulasMoviles(){
		return this.particulas_moviles;
	}

	getParticulasInmoviles(){
		return this.particulas_inmoviles;
	}

}