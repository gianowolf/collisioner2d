class ParticlesFactory{

	constructor(){
		this.particulas_moviles = [];
        this.particulas_inmoviles = [];
		this.sicks = 0;
		this.recovereds = 0;
		this.deceaseds = 0;
		this.healthies = 0;
		this.total = 0;
		this.inmoviles = 0;
		this.radio = 0;
		this.timers = [];
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

	getParticulasMoviles(){
		return this.particulas_moviles;
	}

	getParticulasInmoviles(){
		return this.particulas_inmoviles;
	}


	newSick(timer_id){
		this.healthies--;
		this.sicks++;
		this.timers.push(timer_id)
	}

	newDeceased(){
		this.sicks--;
		this.deceaseds++;
		this.timers.shift()
	}

	newRecovered(){
		this.sicks--;
		this.recovereds++;
		this.timers.shift()
	}



	generarParticulas(total, inmoviles , radio){
		
		//moviles
		this.radio = radio;
		this.total = total;
		this.inmoviles = inmoviles;

		this.healthies = this.total;

		//primer particula: paciente 0
		let zero_patient = new Particle_movil(SICK,this.radio);
		this.particulas_moviles.push(zero_patient );

		//resto de particulas
        for(let i = 1; i < this.total - this.inmoviles; i++){
            this.particulas_moviles.push(new Particle_movil(HEALTHY, this.radio));
		}

        //inmoviles-cuarentena
        for(let i = 0; i < this.inmoviles; i++){
            this.particulas_inmoviles.push(new Particle_inmovil(HEALTHY, this.radio));
        }  
	}

	static systemSatured(){
        if( this.sicks / this.total > 0.2){
            return true;
        }
        else{
            return false;
        }
	}
	
	clear()
	{
		this.clearTimers();
		this.clearParticles();
	}

	clearTimers(){
		for(let i = 0 ; i < this.timers.length ; i++){
			window.clearTimeout(this.timers[i])
		}
		this.timers = [];
	}

	clearParticles(){
		this.particulas_moviles = [];
		this.particulas_inmoviles = [];
		this.sicks = 0;
		this.recovereds = 0;
		this.deceaseds = 0;
		this.healthies = 0;
		this.total = 0;
		this.inmoviles = 0;
	}

}