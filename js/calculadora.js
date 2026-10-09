function insertarNumero(valor) {
    const pantalla = document.getElementById("pantalla");

    if (pantalla.value === "0") {
        pantalla.value = valor;
    } else {
        pantalla.value += valor;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const selectorTema = document.getElementById("theme-select");
    const ruedaTemas = document.getElementById("theme-wheel");
    const nombreTemaRueda = document.getElementById("wheel-value");
    const temas = [
        { id: "black", label: "Negro" },
        { id: "classic", label: "Clásico" },
        { id: "pink", label: "Rosa neón" },
        { id: "vox", label: "Verde VOX" },
        { id: "psoe", label: "Rojo PSOE" },
        { id: "colorblind", label: "Accesible para daltonismo" }
    ];
    let temaGuardado = "black";
    try {
        temaGuardado = localStorage.getItem("calculadora-tema") || "black";
    } catch (error) {
        console.warn("No se pudo leer el tema guardado.", error);
    }

    const indiceGuardado = temas.findIndex((tema) => tema.id === temaGuardado);
    let indiceActual = indiceGuardado >= 0 ? indiceGuardado : 0;
    let giroAcumulado = -indiceActual * (360 / temas.length);
    let anguloAnterior = null;
    let giroDelArrastre = 0;
    let temaInicialDelArrastre = indiceActual;

    aplicarTema(indiceActual);

    selectorTema.addEventListener("change", () => {
        const indiceTema = temas.findIndex((tema) => tema.id === selectorTema.value);

        if (indiceTema >= 0) {
            aplicarTema(indiceTema);
        }
    });

    ruedaTemas.addEventListener("pointerdown", (event) => {
        ruedaTemas.setPointerCapture(event.pointerId);
        anguloAnterior = obtenerAngulo(event);
        giroDelArrastre = 0;
        temaInicialDelArrastre = indiceActual;
    });

    ruedaTemas.addEventListener("pointermove", (event) => {
        if (ruedaTemas.hasPointerCapture(event.pointerId) && anguloAnterior !== null) {
            const anguloActual = obtenerAngulo(event);
            let diferencia = anguloActual - anguloAnterior;

            if (diferencia > 180) {
                diferencia -= 360;
            } else if (diferencia < -180) {
                diferencia += 360;
            }

            anguloAnterior = anguloActual;
            giroDelArrastre += diferencia;
            giroAcumulado -= diferencia;

            const pasos = Math.round(giroDelArrastre / (360 / temas.length));
            const nuevoIndice = (temaInicialDelArrastre + pasos % temas.length + temas.length) % temas.length;
            aplicarTema(nuevoIndice, false);
        }
    });

    ruedaTemas.addEventListener("pointerup", () => {
        anguloAnterior = null;
    });

    ruedaTemas.addEventListener("pointercancel", () => {
        anguloAnterior = null;
    });

    ruedaTemas.addEventListener("keydown", (event) => {
        let siguienteIndice;

        if (event.key === "ArrowRight" || event.key === "ArrowUp") {
            siguienteIndice = (indiceActual + 1) % temas.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
            siguienteIndice = (indiceActual - 1 + temas.length) % temas.length;
        } else if (event.key === "Home") {
            siguienteIndice = 0;
        } else if (event.key === "End") {
            siguienteIndice = temas.length - 1;
        } else {
            return;
        }

        event.preventDefault();
        aplicarTema(siguienteIndice);
    });

    function obtenerAngulo(event) {
        const bounds = ruedaTemas.getBoundingClientRect();
        const centroX = bounds.left + bounds.width / 2;
        const centroY = bounds.top + bounds.height / 2;
        return Math.atan2(event.clientY - centroY, event.clientX - centroX) * 180 / Math.PI;
    }

    function aplicarTema(indice, actualizarGiro = true) {
        const tema = temas[indice];
        indiceActual = indice;
        if (actualizarGiro) {
            giroAcumulado = -indice * (360 / temas.length);
        }

        document.body.dataset.theme = tema.id;
        selectorTema.value = tema.id;
        nombreTemaRueda.value = tema.label;
        nombreTemaRueda.textContent = tema.label;
        ruedaTemas.setAttribute("aria-valuenow", String(indice));
        ruedaTemas.setAttribute("aria-valuetext", tema.label);
        ruedaTemas.style.setProperty("--wheel-angle", `${giroAcumulado}deg`);
        ruedaTemas.style.setProperty("--wheel-counter-angle", `${-giroAcumulado}deg`);

        try {
            localStorage.setItem("calculadora-tema", tema.id);
        } catch (error) {
            console.warn("No se pudo guardar el tema seleccionado.", error);
        }
    }
});
