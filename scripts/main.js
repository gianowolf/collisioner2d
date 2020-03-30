/*
*CONSTANTS
*/
//Particles Setup 

const SPEED           = 2

//Tree Setup
const MAX_PARTICLES = 5
const MAX_LEVELS    = 3
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
const TIME_SICK   = 5 * 1000 // 4s
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

let admin = new Admin();
restart.addEventListener('click',fRestart);

fPlay();

function fPlay()
{
	admin.generarParticulas(parseInt(range_1.value) , parseInt(range_2.value) ,  parseInt(range_3.value));
    admin.generarArbol(cv_width, cv_height);
}

function fRestart()
{
    admin.restart();
    fPlay();
}



//crear particulas


function loop()
{
    //Limpiamos el canvas
    ctx.clearRect(0 , 0 , canvas.clientWidth , canvas.clientHeight);
    
    //Movimiento de particulas
    admin.refresh()
}

setInterval(loop , TIME_FRAMES);

