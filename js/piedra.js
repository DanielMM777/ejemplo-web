let ganadas = 0;
let perdidas = 0;
let empates = 0;
let partidas = 0;



function juego(jugador)
    const opciones = ["piedra", "papel", "tijera"];
    const maquina = opciones[Math.floor(Math.random() * opciones.length)];
    let mensaje;
    partidas++;

    const ejemplo = 6

     if (jugador === maquina) {
        mensaje = "Empate";
        empates++;
    }
    if (jugador === "piedra" && maquina === "tijera")||
         (jugador === "papel" && maquina === "piedra")||
          (jugador === "tijera" && maquina === "papel")
         {
            mensaje = "Ganaste";
            ganadas++;
    }
     else {
        mensaje = "Perdiste";
        perdidas++;
    }
document.getElementById("marcador").textContent =
  "Partidas jugadas: " + partidas;
document.getElementById("ganadas").textContent = "Ganadas: " + ganadas;
document.getElementById("empatadas").textContent = "Empates: " + empatadas;
document.getElementById("perdidas").textContent = `Derrotas: ${perdidas}`;
