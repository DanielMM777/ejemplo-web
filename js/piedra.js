function juego(jugador)
    const opciones = ["piedra", "papel", "tijera"];
    const maquina = opciones[Math.floor(Math.random() * opciones.length)];
    let mensaje;

    const ejemplo = 6

     
    if (jugador === maquina) {
        mensaje = "Empate";
    }
    if (jugador === "piedra" && maquina === "tijera")||
         (jugador === "papel" && maquina === "piedra")||
          (jugador === "tijera" && maquina === "papel")
         {
            mensaje = "Ganaste";
    } else {
        mensaje = "Perdiste";
    }