class Particle_movil extends Particle{

    constructor(state,radio){
        super(state,radio);
        //speed vector
        let theta = Math.random()  * 2 * Math.PI;
        this.dx   =  Math.cos(theta) * SPEED;
        this.dy   =  Math.sin(theta) * SPEED;
    }

    setSpeed(dx,dy){
        this.dx = dx;
        this.dy = dy;
    }
}