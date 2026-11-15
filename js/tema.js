const botonTema = document.createElement("button");
botonTema.type = "button";
botonTema.className = "boton-tema";
botonTema.setAttribute("aria-pressed", "false");

function actualizarBotonTema() {
    const temaOscuro = document.body.classList.contains("tema-oscuro");
    botonTema.textContent = temaOscuro ? "Activar tema claro" : "Activar tema oscuro";
    botonTema.setAttribute("aria-pressed", String(temaOscuro));
}

botonTema.addEventListener("click", () => {
    document.body.classList.toggle("tema-oscuro");
    actualizarBotonTema();
});

actualizarBotonTema();

const listaNavegacion = document.querySelector("nav ul");
if (listaNavegacion) {
    const elementoTema = document.createElement("li");
    elementoTema.append(botonTema);
    listaNavegacion.append(elementoTema);
} else {
    botonTema.classList.add("boton-tema-flotante");
    document.body.append(botonTema);
}
