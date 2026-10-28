let ganadas = 0;
let perdidas = 0;
let empates = 0;
let partidas = 0;

function juego(jugador) {
    const opciones = ["piedra", "papel", "tijera"];
    const maquina = opciones[Math.floor(Math.random() * opciones.length)];
    let mensaje;
    partidas++;

    if (jugador === maquina) {
        mensaje = "¡Empate!";
        empates++;
    }
    else if (
        (jugador === "piedra" && maquina === "tijera") ||
        (jugador === "tijera" && maquina === "papel") ||
        (jugador === "papel" && maquina === "piedra")
    ) {
        mensaje = "¡Gana el jugador!";
        ganadas++;
    } else {
        mensaje = "¡Gana la máquina!";
        perdidas++;
    }

    document.getElementById("marcador").textContent =
        "Partidas jugadas: " + partidas;
    document.getElementById("ganadas").textContent = "Ganadas: " + ganadas;
    document.getElementById("empates").textContent = "Empates: " + empates;
    document.getElementById("perdidas").textContent = "Derrotas: " + perdidas;
    document.getElementById("jugada-jugador").textContent =
        "Tu jugada: " + jugador;
    document.getElementById("jugada-maquina").textContent =
        "Jugada de la máquina: " + maquina;
    document.getElementById("mensaje").textContent = mensaje;
}