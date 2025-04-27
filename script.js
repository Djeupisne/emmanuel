// Préloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Cursor personnalisé
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    requestAnimationFrame(() => {
        cursorFollower.style.left = `${e.clientX}px`;
        cursorFollower.style.top = `${e.clientY}px`;
    });
});

// Liens interactifs
const interactiveElements = document.querySelectorAll('a, button, .btn, .destination-card, .nav-link');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
});

// Header scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Menu mobile
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Fermer le menu en cliquant sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Slider Hero
const heroSlider = new Swiper('.hero-slider', {
    loop: true,
    speed: 1000,
    parallax: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
});

// Animations GSAP
gsap.registerPlugin(ScrollTrigger);

// Animation des sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    gsap.from(section, {
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
        opacity: 0,
        y: 50,
        duration: 1,
    });
});
fetch('get_destinations.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(destinations => {
        const destinationGrid = document.querySelector('.destination-grid');
        if (!destinationGrid) return;

        // Efface le contenu précédent
        destinationGrid.innerHTML = '';

        destinations.forEach(destination => {
            const card = document.createElement('div');
            card.className = 'destination-card';
            card.innerHTML = `
                <div class="destination-badge">${destination.badge || 'Nouveau'}</div>
                <img src="${destination.image}" alt="${destination.title}" class="destination-img">
                <div class="destination-content">
                    <h3 class="destination-title">${destination.title}</h3>
                    <p class="destination-description">${destination.description}</p>
                    <span class="destination-price">${destination.price || 'Prix sur demande'}</span>
                    <div class="destination-rating">
                        ${'<i class="fas fa-star rating-star"></i>'.repeat(destination.rating || 4)}
                    </div>
                </div>
            `;
            destinationGrid.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error loading destinations:', error.message);

        // Données statiques en cas d'échec
        const staticDestinations = [
            {
                title: "Maldives",
                description: "Plages de sable blanc et eaux cristallines",
                image: "images/maldives.jpg",
                price: "À partir de 2500€",
                rating: 5,
                badge: "Populaire"
            },
            {
                title: "Paris",
                description: "La ville lumière et son romantisme",
                image: "images/paris.jpg",
                price: "À partir de 800€",
                rating: 4,
                badge: "Promo"
            }
        ];

        const destinationGrid = document.querySelector('.destination-grid');
        if (!destinationGrid) return;

        destinationGrid.innerHTML = '';
        staticDestinations.forEach(destination => {
            const card = document.createElement('div');
            card.className = 'destination-card';
            card.innerHTML = `
                <div class="destination-badge">${destination.badge}</div>
                <img src="${destination.image}" alt="${destination.title}" class="destination-img">
                <div class="destination-content">
                    <h3 class="destination-title">${destination.title}</h3>
                    <p class="destination-description">${destination.description}</p>
                    <span class="destination-price">${destination.price}</span>
                    <div class="destination-rating">
                        ${'<i class="fas fa-star rating-star"></i>'.repeat(destination.rating)}
                    </div>
                </div>
            `;
            destinationGrid.appendChild(card);
        });
    });
// Formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;

        const formData = {
            name: contactForm.querySelector('input[name="name"]').value,
            email: contactForm.querySelector('input[name="email"]').value,
            phone: contactForm.querySelector('input[name="phone"]').value,
            message: contactForm.querySelector('textarea[name="message"]').value,
        };

        try {
            const response = await fetch('process_contact.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (data.success) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé!';
                setTimeout(() => {
                    submitBtn.innerHTML = 'Envoyer la demande';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            } else {
                alert(data.message);
                submitBtn.innerHTML = 'Demande Envoyée !';
                submitBtn.disabled = false;
            }
        } catch (error) {
            console.error('Error:', error);
            submitBtn.innerHTML = 'Demande Envoyée !';
            submitBtn.disabled = false;
        }
    });
}
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button');
        const originalContent = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        try {
            const response = await fetch('process_newsletter.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailInput.value }),
            });
            const data = await response.json();

            if (data.success) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                emailInput.value = '';
            } else {
                submitBtn.innerHTML = '<i class="fas fa-times"></i>';
                alert(data.message || 'Erreur lors de l\'inscription');
            }
        } catch (error) {
            console.error('Error:', error);
            submitBtn.innerHTML = '<i class="fas fa-times"></i>';
        }

        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
        }, 2000);
    });
}
if (window.location.hostname !== 'localhost') {
    const gaScript = document.createElement('script');
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-VOTREID';
    document.head.appendChild(gaScript);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-VOTREID');
}