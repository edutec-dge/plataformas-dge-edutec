/*!
 * app.js - Lógica de interacción Landing Page EDUTEC
 * Responsabilidades: Manejo del Modal de Aulas EDUTEC y Cursor Personalizado.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del Modal Aulas EDUTEC ---
    const btnAulasEdutec = document.getElementById('btnAulasEdutec');
    const modalAulas = document.getElementById('modalAulas');
    const btnCloseModal = document.getElementById('btnCloseModal');

    const openModal = () => {
        if (!modalAulas) return;
        modalAulas.classList.add('active');
        modalAulas.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        const firstLink = modalAulas.querySelector('.modal-link');
        if (firstLink) firstLink.focus();
    };

    const closeModal = () => {
        if (!modalAulas) return;
        modalAulas.classList.remove('active');
        modalAulas.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (btnAulasEdutec) btnAulasEdutec.focus();
    };

    if (btnAulasEdutec && modalAulas && btnCloseModal) {
        btnAulasEdutec.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
        btnCloseModal.addEventListener('click', closeModal);
        modalAulas.addEventListener('click', (e) => {
            if (e.target === modalAulas) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalAulas.classList.contains('active')) closeModal();
        });
    }

    // --- Lógica de Cursor Personalizado & Spotlight ---
    const dot = document.getElementById('cursorDot');
    const outline = document.getElementById('cursorOutline');
    const glow = document.getElementById('cursorGlow');

    if (dot && outline && glow) {
        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let outX = 0, outY = 0;

        const delay = 0.2;
        const dotDelay = 0.5;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (dot.style.opacity === "0" || dot.style.opacity === "") {
                dot.style.opacity = "1";
                outline.style.opacity = "1";
                glow.style.opacity = "1";
            }
        });

        const animateCursor = () => {
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
    }

    const interactivos = document.querySelectorAll('.card, button, a, .modal-link');
    interactivos.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
            if (glow) {
                if (el.classList.contains('card-cumbre')) {
                    glow.style.background = 'radial-gradient(circle, rgba(223, 106, 7, 0.2) 0%, rgba(255, 255, 255, 0) 70%)';
                } else if (el.classList.contains('card-portal')) {
                    glow.style.background = 'radial-gradient(circle, rgba(11, 28, 96, 0.2) 0%, rgba(255, 255, 255, 0) 70%)';
                }
            }
        });

        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
            if (glow) {
                glow.style.background = 'radial-gradient(circle, rgba(137, 23, 206, 0.15) 0%, rgba(255, 255, 255, 0) 70%)';
            }
        });
    });
});
