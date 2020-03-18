const CANT_PARTICLES = 1000;
const MOVE_PARTICLES = 1000;

var canvas = document.querySelector('#canvas');
height = window.innerHeight;
width = window.innerWidth;

canvas.setAttribute("width",width);
canvas.setAttribute("height",height);

var ctx = canvas.getContext("2d");

var admin = new Admin();

//Creamos partiuclas iniciales
admin.generarParticulas(CANT_PARTICLES);
admin.generarArbol(width, height);

//loop principal
function loop(){

	//Limpiamos el canvas
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    //Mover particulas
	admin.refresh(MOVE_PARTICLES);
}


setInterval(loop, 22);
