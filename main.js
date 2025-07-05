
const frases = [
    "Desconectarte del mundo digital es reconectarte contigo.",
    "El presente es el único momento que realmente tienes.",
    "Una respiración consciente puede cambiar tu día.",
    "No estás obligado a estar disponible todo el tiempo.",
    "Tu bienestar vale más que una notificación."
];

const reflexiones = [
    { imagen: "img/Agua.png" },
    { imagen: "img/Autocuidado.png" },
    { imagen: "img/Brote.png" },
    { imagen: "img/Familia.png" },
    { imagen: "img/Manos.png" },
    { imagen: "img/Notificaciones.png" },
    { imagen: "img/Reloj.png" },
    { imagen: "img/Reloj2.png" },
    { imagen: "img/Sala.png" },
    { imagen: "img/WiFiOff.jpg" }
];

const retos7dias = [
    "Día 1: Apaga las notificaciones no esenciales.",
    "Día 2: Establece zonas libres de tecnología.",
    "Día 3: Cero pantallas 1 hora antes de dormir.",
    "Día 4: Una hora sin tocar el celular.",
    "Día 5: Reemplaza redes sociales por una actividad real.",
    "Día 6: Día libre de pantallas.",
    "Día 7: Reflexiona sobre lo aprendido."
];


document.addEventListener("DOMContentLoaded", () => {
    const fraseEl = document.getElementById("frase-dia");
    const randomIndex = Math.floor(Math.random() * frases.length);
    fraseEl.textContent = frases[randomIndex];
});

function mostrarReflexion() {
    const seccion = document.getElementById("reflexion");
    const hoy = new Date().toISOString().slice(0, 10);
    const guardado = JSON.parse(localStorage.getItem("reflexion-diaria"));

    let reflexionElegida;
    if (guardado && guardado.fecha === hoy) {
        reflexionElegida = guardado.indice;
    } else {
        reflexionElegida = Math.floor(Math.random() * reflexiones.length);
        localStorage.setItem("reflexion-diaria", JSON.stringify({
            fecha: hoy,
            indice: reflexionElegida
        }));
    }

    const reflexion = reflexiones[reflexionElegida];
    seccion.style.backgroundImage = `url('${reflexion.imagen}')`;
}

function mostrarRetoDiario() {
    const retoEl = document.getElementById("reto-diario");
    const progreso = JSON.parse(localStorage.getItem("reto-progreso")) || { dia: 0 };
    retoEl.textContent = retos7dias[progreso.dia];

    const boton = document.getElementById("completar-reto");
    boton.onclick = () => {
        if (progreso.dia < retos7dias.length - 1) {
            progreso.dia += 1;
            localStorage.setItem("reto-progreso", JSON.stringify(progreso));
            retoEl.textContent = retos7dias[progreso.dia];
        } else {
            retoEl.textContent = "¡Reto completado! 🎉";
            boton.disabled = true;
        }
    };
}

function showSection(id) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.add('d-none'));
    document.getElementById(id).classList.remove('d-none');

    if (id === "reflexion") {
        mostrarReflexion();
    }

    if (id === "reto") {
        mostrarRetoDiario();
    }
}

