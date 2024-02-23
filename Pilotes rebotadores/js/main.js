// Import de Pilota
import { Pilota } from "./pilota.js";

// Preparació del canvas ----------------------
/* Obté una referència a <canvas>, després crida al mètode getContext()
  per definir un context al el que es pot començar a dibuisar
  (ctx) és un objecte que representa l'àrea de dibuix del 
  <canvas> y permet dibuixar elements 2D al damunt.

  width and height són dreceres a l'ample i alt del canvas  que coincideixen
  amb l'alt i ample del navegador (viewport)
*/
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Array de Pilotes
let pilotes = [];
let pilotesX = [];
let pilotesY = [];


let creades = false;

// funció per generar un número aleatori entre dues xifres

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// funció per generar un color aleatori

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// funció que fa el següent:
// - crea 25 pilotes amb mida, posició i velocitat aleatòries, només una vegada
// - afegeix les pilotes al array de pilotes
// - posa el fons del navegador en negre
// - dibuixa les pilotes al canvas i les mou
// - comproba si les pilotes estan colisionant
// - crida a requestAnimationFrame, per crear la animació

function loop() {
  let posArrayPilotes = 0;
  if (!creades) {
    for (let i = 0; i < 25; i++) {
      let mida = random(10, 20);
      let x = random(0 + mida,canvas.width - mida);
      let y = random(0 + mida,canvas.height - mida);
      let velX = random(-7, 7);
      let velY = random(-7, 7);
      
      pilotes.push(new Pilota(x, y, velX, velY, randomRGB(), mida));
    }
    creades = true;
  }
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  pilotes.forEach(pilota => {
    pilota.dibuixa(ctx);
    pilota.mou()
    pilotesX[posArrayPilotes] = pilota.x;
    pilotesY[posArrayPilotes] = pilota.y;
    posArrayPilotes++;
  });

  checkColisio();
  requestAnimationFrame(loop);
}

// Funció que comproba si les pilotes estan colisionant

function checkColisio() {
  pilotes.forEach(pilota1 => {
    pilotes.forEach(pilota2 => {
      let distanciaX = Math.abs(pilota1.x - pilota2.x); // Distancia horitzontal de les dos pilotes
      let distanciaY = Math.abs(pilota1.y - pilota2.y); // Distancia vertical de les dos pilotes
      let hipotenusa = Math.sqrt(distanciaX**2 + distanciaY**2); // Vector distancia de x i y
      let sumaRadis = (pilota1.mida + pilota2.mida); // Longitud dels radis de les dos pilotes

      if (hipotenusa != 0 && hipotenusa <= sumaRadis) {
        // Canviem el color de les pilotes
        pilota1.color = randomRGB();
        pilota2.color = randomRGB();
        // Cambiem la direcció
        pilota1.velX *= -1;
        pilota1.velY *= -1;
        pilota2.velX *= -1;
        pilota2.velY *= -1;
        // Movem les pilotes
        pilota1.mou()
        pilota2.mou()
      }
    })
  });
}

loop() // Comença el programa