var contact = document.querySelector(".contact");
var menu = document.querySelector(".menu");
var info = document.querySelector(".info");

var canvas = document.querySelector("#canvas");
var nav = document.querySelector("nav");

var bContact = false;
var bInfo = false;


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


