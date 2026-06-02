document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================
       CONTROLE DO HEADER AO ROLAR
    ========================================== */
    const header = document.getElementById("header");
    
    const checkScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Executa ao iniciar caso a página já comece scrollada

    /* ==========================================
       MENU MOBILE REAL
    ========================================== */
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            nav.classList.toggle("active");
            
            // Alterna o ícone entre barras e fechar
            const icon = menuToggle.querySelector("i");
            if(nav.classList.contains("active")) {
                icon.className = "fas fa-times";
            } else {
                icon.className = "fas fa-bars";
            }
        });

        // Fecha o menu ao clicar em qualquer link interno
        document.querySelectorAll(".nav a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
                menuToggle.querySelector("i").className = "fas fa-bars";
            });
        });

        // Fecha o menu ao clicar fora dele
        document.addEventListener("click", (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove("active");
                menuToggle.querySelector("i").className = "fas fa-bars";
            }
        });
    }

    /* ==========================================
       ANIMAÇÃO DE ENTRADA EFICIENTE (Intersection Observer)
    ========================================== */
    const animatables = document.querySelectorAll("section, .card-servico, .depoimento, .diferencial-card");
    
    // Adiciona classe de transição via JS para não quebrar o layout se o JS estivesse desativado
    animatables.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    });

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target); // Executa a animação apenas uma vez
            }
        });
    }, observerOptions);

    animatables.forEach(el => appearanceObserver.observe(el));

    /* ==========================================
       LIGHTBOX GALERIA CORRIGIDO
    ========================================== */
    const galleryImages = document.querySelectorAll(".galeria-grid img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = lightbox ? lightbox.querySelector("img") : null;
    const lightboxClose = document.querySelector(".lightbox-close");

    if (lightbox && lightboxImage) {
        galleryImages.forEach(img => {
            img.addEventListener("click", () => {
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt || "Estrutura Fit Center";
                lightbox.classList.add("active");
                document.body.style.overflow = "hidden"; // Trava o scroll de fundo
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove("active");
            lightboxImage.src = "";
            document.body.style.overflow = "auto";
        };

        lightbox.addEventListener("click", closeLightbox);
        if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    }
});