const CANT_PARTICULAS = 1000;
const CANT_INMOVILES= 0;

var canvas = document.getElementById("canvas");
cv_width = window.innerWidth;
cv_height = window.innerHeight;
canvas.setAttribute("width",cv_width);
canvas.setAttribute("height",cv_height);
var ctx = canvas.getContext("2d");


var admin = new Admin();

//crear particulas
admin.generarParticulas(CANT_PARTICULAS,CANT_INMOVILES);
admin.generarArbol(cv_width, cv_height);

function loop(){

    //Limpiamos el canvas
    ctx.clearRect(0 , 0 , canvas.clientWidth , canvas.clientHeight);

    //Movimiento de particulas
    admin.refresh();
}

setInterval(loop , 20);