const pantalla = document.getElementById("pantalla");
let valorGuardado = null;
let operadorPendiente = null;
let esperandoOperando = false;

function mostrarError() {
    pantalla.value = "Error";
    valorGuardado = null;
    operadorPendiente = null;
    esperandoOperando = true;
}

function insertarNumero(valor) {
    if (pantalla.value === "Error") {
        limpiarPantalla();
    }

    if (esperandoOperando) {
        pantalla.value = valor === "." ? "0." : valor;
        esperandoOperando = false;
        return;
    }

    if (valor === ".") {
        if (!pantalla.value.includes(".")) {
            pantalla.value += ".";
        }
        return;
    }

    pantalla.value = pantalla.value === "0" ? valor : pantalla.value + valor;
}

function operar(izquierda, derecha, operador) {
    switch (operador) {
        case "+":
            return izquierda + derecha;
        case "-":
            return izquierda - derecha;
        case "*":
            return izquierda * derecha;
        case "/":
            return derecha === 0 ? null : izquierda / derecha;
        default:
            return null;
    }
}

function mostrarResultado(resultado) {
    if (resultado === null || !Number.isFinite(resultado)) {
        mostrarError();
        return false;
    }

    pantalla.value = String(Number(resultado.toPrecision(12)));
    return true;
}

function insertarOperador(operador) {
    if (pantalla.value === "Error") {
        return;
    }

    const valorActual = Number(pantalla.value);
    if (operadorPendiente && !esperandoOperando) {
        const resultado = operar(valorGuardado, valorActual, operadorPendiente);
        if (!mostrarResultado(resultado)) {
            return;
        }
        valorGuardado = Number(pantalla.value);
    } else if (valorGuardado === null) {
        valorGuardado = valorActual;
    }

    operadorPendiente = operador;
    esperandoOperando = true;
}

function calcularResultado() {
    if (operadorPendiente === null || valorGuardado === null || pantalla.value === "Error") {
        return;
    }

    const segundoOperando = esperandoOperando ? valorGuardado : Number(pantalla.value);
    const resultado = operar(valorGuardado, segundoOperando, operadorPendiente);
    if (mostrarResultado(resultado)) {
        valorGuardado = null;
        operadorPendiente = null;
        esperandoOperando = true;
    }
}

function limpiarPantalla() {
    pantalla.value = "0";
    valorGuardado = null;
    operadorPendiente = null;
    esperandoOperando = false;
}

function eliminarNumero() {
    if (pantalla.value === "Error") {
        limpiarPantalla();
        return;
    }

    esperandoOperando = false;
    pantalla.value = pantalla.value.length > 1 ? pantalla.value.slice(0, -1) : "0";
    if (pantalla.value === "-") {
        pantalla.value = "0";
    }
}

function toggleSigno() {
    if (pantalla.value === "Error") {
        limpiarPantalla();
        return;
    }

    const valor = Number(pantalla.value);
    if (valor !== 0) {
        pantalla.value = String(-valor);
    }
}

function calcularPorcentaje() {
    if (pantalla.value === "Error") {
        return;
    }

    const resultado = Number(pantalla.value) / 100;
    mostrarResultado(resultado);
}

function calcularRaizCuadrada() {
    if (pantalla.value === "Error") {
        return;
    }

    const valor = Number(pantalla.value);
    if (valor < 0) {
        mostrarError();
        return;
    }
    mostrarResultado(Math.sqrt(valor));
}

document.addEventListener("keydown", (evento) => {
    if (/^\d$/.test(evento.key) || evento.key === ".") {
        insertarNumero(evento.key);
    } else if (["+", "-", "*", "/"].includes(evento.key)) {
        insertarOperador(evento.key);
    } else if (evento.key === "Enter" || evento.key === "=") {
        evento.preventDefault();
        calcularResultado();
    } else if (evento.key === "Backspace" || evento.key === "Delete") {
        eliminarNumero();
    } else if (evento.key === "Escape") {
        limpiarPantalla();
    }
});
