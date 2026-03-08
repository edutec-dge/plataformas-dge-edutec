/*!
 * app.js - Lógica de interacción Landing Page EDUTEC
 * Responsabilidades: Manejo exclusivo del Modal de Aulas EDUTEC.
 */

// --- Lógica de Cursor Personalizado & Spotlight ---
const dot = document.getElementById('cursorDot');
const outline = document.getElementById('cursorOutline');
const glow = document.getElementById('cursorGlow');

let mouseX = 0, mouseY = 0; // Posición real
let dotX = 0, dotY = 0;   // Posición suavizada punto
let outX = 0, outY = 0;   // Posición suavizada contorno

const delay = 0.2; // Suavizado del contorno
const dotDelay = 0.5; // Suavizado del punto

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Mostrar elementos al primer movimiento
    if (dot.style.opacity === "0" || dot.style.opacity === "") {
        dot.style.opacity = "1";
        outline.style.opacity = "1";
        glow.style.opacity = "1";
    }
});

const animateCursor = () => {
    // Suavizado cinético (Lerp)
    dotX += (mouseX - dotX) * dotDelay;
    dotY += (mouseY - dotY) * dotDelay;

    outX += (mouseX - outX) * delay;
    outY += (mouseY - outY) * delay;

    dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    outline.style.transform = `translate(${outX - 20}px, ${outY - 20}px)`;
    glow.style.transform = `translate(${mouseX - 200}px, ${mouseY - 200}px)`;

    requestAnimationFrame(animateCursor);
};

animateCursor();

// Detección de Hover para efectos reactivos
const interactivos = document.querySelectorAll('.card, button, a, .modal-link');
interactivos.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering');

        // Cambiar color del brillo según la sección (opcional/dinámico)
        if (el.classList.contains('card-cumbre')) {
            glow.style.background = 'radial-gradient(circle, rgba(223, 106, 7, 0.2) 0%, rgba(255, 255, 255, 0) 70%)';
        } else if (el.classList.contains('card-portal')) {
            glow.style.background = 'radial-gradient(circle, rgba(11, 28, 96, 0.2) 0%, rgba(255, 255, 255, 0) 70%)';
        }
    });

    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering');
        glow.style.background = 'radial-gradient(circle, rgba(137, 23, 206, 0.15) 0%, rgba(255, 255, 255, 0) 70%)';
    });
});

});
