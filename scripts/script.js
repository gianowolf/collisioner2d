var canvas = document.querySelector('#canvas');
canvas.setAttribute("width",window.innerWidth);
canvas.setAttribute("height",window.innerHeight);
var ctx = canvas.getContext("2d");

var admin = new Admin();
var interfaz = new Interfaz();

//Creamos partiuclas iniciales
admin.generarParticulas(1000);

//loop principal
function loop(){

	//Limpiamos el canvas
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	
	//Dibujar Interfaz
	interfaz.draw();

    //Mover particulas
	admin.refresh(500);
}

setInterval(loop, 10);
