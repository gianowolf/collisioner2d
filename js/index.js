let contact = document.querySelector(".contact");
let menu = document.querySelector(".menu");
let info = document.querySelector(".info");

let canvas = document.querySelector("#canvas");
let nav = document.querySelector("nav");

let bContact = false;
let bInfo = false;

var div = document.querySelector("#input_div");
var range_1 =  document.querySelector("#slider_cant_particulas");
var range_2 =  document.querySelector("#slider_cant_inmoviles");
var range_3 =  document.querySelector("#slider_radio_particulas");

document.body.addEventListener('click', ocultar);

function ocultar(e){

	 var target = e.target;

	 if((canvas == target) || (document.body == target) || (nav == target)){
	 	info.style.display = 'none';
		bInfo = false;
		contact.style.display = 'none';
		bContact = false;
	}


	

}



function mostrarContact(){

	info.style.display = 'none';
	bInfo = false;

	if(!bContact){
		contact.style.display = 'flex';
		contact.style.top = Math.trunc(menu.clientHeight)+"px";
		contact.style.left =  Math.trunc(window.innerWidth/2)-Math.trunc(contact.clientWidth/2)+"px";
	}else{
		contact.style.display = 'none';
	}

	bContact = !bContact;
	
}


function mostrarInfo(){

	contact.style.display = 'none';
	bContact = false;

	if(!bInfo){
		info.style.display = 'block';
		info.style.top = Math.trunc(menu.clientHeight)+"px";
		info.style.left =  Math.trunc(window.innerWidth/2)-Math.trunc(info.clientWidth/2)+"px";
	}else{
		info.style.display = 'none';
	}

	bInfo = !bInfo;
	
}


