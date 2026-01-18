document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const navbar = document.getElementById('navbar');

    function updateActiveNav() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const sectionId = link.getAttribute('data-section');
            link.classList.remove('active');

            if (sectionId === currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', function() {
        updateActiveNav();

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                const animateElements = entry.target.querySelectorAll('.bg-navy-800\\/50, .bg-navy-800\\/30');
                animateElements.forEach((el, index) => {
                    el.style.animationDelay = `${index * 0.1}s`;
                    el.classList.add('animate-fade-in-up');
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    updateActiveNav();
});

const modal = document.getElementById('imageModal');
const modalVideo = document.getElementById('modalVideo');
const modalIframe = document.getElementById('modalIframe');

function openModal(src) {
    const isVimeo = src.includes('vimeo.com/video') || src.includes('player.vimeo.com');

    if (isVimeo) {
        modalVideo.classList.add('hidden');
        modalIframe.classList.remove('hidden');
        modalIframe.src = src;
    } else {
        modalIframe.classList.add('hidden');
        modalVideo.classList.remove('hidden');
        modalVideo.src = src;
        modalVideo.play();
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.src = '';
    modalIframe.src = '';
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});
