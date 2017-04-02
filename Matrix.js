// Funcion que devuelve un valor aleatorio entre el min y max incluidos
// IN: 	Min (int) y Max (int)
// OUT: Valor aleatorio (int)
function getRndInteger(min, max) {
 	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Clase Simbolo
function Simbolo(x,y,velocidad,primero){
	this.x = x;
	this.y = y;
	this.valor;
	this.vel = velocidad;
	this.FPS2cambiar = getRndInteger(5,25);
	this.primero = primero;

	this.SimboloAleatorio = function(){
		if(Math.random()>=0.9){
			var num = getRndInteger(0,9);
			this.valor = num.toString();
		}
		else{
			this.valor = String.fromCharCode(0x30A0 + getRndInteger(0,96));
		}
	}

	this.Mover = function(){
		this.y = (this.y>=alto) ? 0 : this.y += this.vel;
		if (FPS % this.FPS2cambiar == 0){
			this.SimboloAleatorio();
		}
	}
}


// Clase cadena que contiene un numero aleatorio de simbolos
function Cadena(){
	this.Caracteres = [];
	this.longitud = getRndInteger(5,35);
	this.velocidad = getRndInteger(2,10);
	
	this.rellenarCadena = function(x, y){
		var first = (Math.random()>0.75) ? true : false;
		for(var i=0;i<this.longitud;i++){
			var Caracter = new Simbolo(x,y,this.velocidad,first);
			Caracter.SimboloAleatorio();
			this.Caracteres.push(Caracter);
			y -= tamLetra;
			first = false;
		}
	}

	this.Representar = function(){
		this.Caracteres.forEach(function(caracter){
			ctx.shadowColor = "#FFFFFF";
			if (caracter.primero == true){
				ctx.fillStyle = "#c8ffc8";
				ctx.shadowBlur = 5;
			}
			else {
				ctx.fillStyle = "#32CD32";
				ctx.shadowBlur = 0;
			}
			ctx.fillText(caracter.valor,caracter.x,caracter.y);
			caracter.Mover();
		});
	}

	this.Mover = function(){
		this.y = (this.y>=alto) ? 0 : this.y += this.vel;
	}
}


// Funcion encargada de animar esperando al refresco de la pantalla
function Animar(){
	FPS = (FPS > 59) ? 0 : FPS += 1;
	ctx.clearRect(0,0,ancho,alto);
	cadenas.forEach(function(cad){
		cad.Representar();
	});
	requestAnimFrame(Animar);
}

// --------------------------------------------------------------------------------------------------------------------

// Inicializacion
var ancho = window.innerWidth;
var alto = window.innerHeight;
var tamLetra = 15;
var FPS = 0;

// Setup del canvas
var c = document.getElementById("myCanvas");
c.width = ancho;
c.height = alto;
var ctx = c.getContext("2d");
ctx.clearRect(0,0,ancho,alto);
ctx.font = String(tamLetra) + "px Arial";

// Setup de la animacion
window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame 
        || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();

// Seccion principal
var cadenas = [];
var x = 0;
for (var i=0; i<= Math.floor(ancho/tamLetra); i++){
	var cad = new Cadena();
	cad.rellenarCadena(x,getRndInteger(-500,0));
	cadenas.push(cad);
	x += tamLetra;
}
Animar();




