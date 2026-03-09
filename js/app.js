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

    const interactivos = document.querySelectorAll('.card, button, a, .modal-link');
    interactivos.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });

        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });
});
