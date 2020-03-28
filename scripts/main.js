/*
*CONSTANTS
*/
//Particles Setup 

let cant_particulas = 3000;
let cant_inmobiles  = 0;
let radio           = 2;


const SPEED           = 2
const RADIO2          = radio * 2

//Tree Setup
const MAX_PARTICLES = 5
const MAX_LEVELS    = 5
const LVL_CERO      = 0
const DRAW_TREE     = false;

//Status
const HEALTHY   = 0
const SICK      = 1
const RECOVERED = 2
const DECEASED  = 4

//Colors
const COLOR_BACKGROUND  = "#333333"
const COLOR_GRAPH_AXIS  = "#666666"
const COLOR_GRAPH_BACK  = "#111111"
const COLOR_HEALTHY     = "#999999"
const COLOR_SICK        = "#dd8484"
const COLOR_RECOVERED   = "#7d7d9c"
const COLOR_DECEASED    = "#000000"
const COLOR_TREE        = "#181818"    


//Times
const TIME_SICK   = 7 * 1000 // 4s
const TIME_FRAMES = 20       // 20ms   


/*
* MAIN PROGRAM
*/
canvas = document.getElementById("canvas");
let refresh_curve = true;
cv_width = window.innerWidth;
cv_height = window.innerHeight;
canvas.setAttribute("width",cv_width);
canvas.setAttribute("height",cv_height);



var ctx = canvas.getContext("2d");

var admin = new Admin();

stats = new Stats_controller();

//crear particulas
admin.generarParticulas();
admin.generarArbol(cv_width, cv_height);

function loop()
{
    //Limpiamos el canvas
    ctx.clearRect(0 , 0 , canvas.clientWidth , canvas.clientHeight);
    
    //Movimiento de particulas
    admin.refresh()
}

setInterval(loop , TIME_FRAMES);