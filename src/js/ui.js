import { navigateTo } from './router.js';
import { instructorsData } from './data.js';
import { languageManager } from './i18n/languageManager.js';

export function initUI() {
    initMobileMenu();
    initHeroCarousel();
    initIntroCarousel();
    initMessageCarousel();
    initLightbox();
    initScrollEffects();
    initRandomInstructors();
    initInstructors();
    
    // Listen for language changes
    document.addEventListener('languageChanged', () => {
        initRandomInstructors();
        // Check if instructor modal is open and update it if possible
        // We would need to store the current open instructor key.
        // For now, let's just update the grid items.
    });
}

function initRandomInstructors() {
    const container = document.getElementById('instructors-container');
    if (!container) return; // Guard clause if container doesn't exist yet

    const instructorKeys = ['maria', 'alosja', 'phan', 'karina', 'paty'];
    
    // Shuffle
    instructorKeys.sort(() => Math.random() - 0.5);

    let html = '';
    instructorKeys.forEach(key => {
        const data = instructorsData[key];
        if (data) {
            let imageHtml;
            if (data.image) {
                imageHtml = `<img src="${data.image}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500">`;
            } else {
                imageHtml = `
                    <div class="w-full h-full bg-oaxaca-cream flex items-center justify-center">
                        <span class="font-serif text-6xl text-oaxaca-clay opacity-50 select-none">${data.name.charAt(0)}</span>
                    </div>
                `;
            }

            html += `
                <div class="text-center group cursor-pointer" data-instructor="${key}">
                    <div class="w-48 h-48 rounded-full overflow-hidden mb-6 mx-auto border-4 border-transparent group-hover:border-oaxaca-clay transition duration-300 shadow-lg">
                        ${imageHtml}
                    </div>
                    <h3 class="font-serif text-3xl text-oaxaca-wood">${data.name}</h3>
                    <p class="text-[#876848] font-light mt-1 uppercase tracking-wide text-base">${
                        languageManager.getCurrentLang() === 'en' ? (data.style_en || data.style) : data.style
                    }</p>
                </div>
            `;
        }
    });

    container.innerHTML = html;
}

function initIntroCarousel() {
    const slides = document.querySelectorAll('[data-intro-slide]');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const slideIntervalTime = 3000;

    function nextSlide() {
        // Fade out current
        slides[currentSlide].classList.remove('opacity-100');
        slides[currentSlide].classList.add('opacity-0');

        // Calculate next
        currentSlide = (currentSlide + 1) % slides.length;

        // Fade in next
        slides[currentSlide].classList.remove('opacity-0');
        slides[currentSlide].classList.add('opacity-100');
    }

    setInterval(nextSlide, slideIntervalTime);
}

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
}

function initHeroCarousel() {
    const slides = document.querySelectorAll('[data-carousel-item]');
    const indicators = document.querySelectorAll('[data-carousel-indicator]');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const slideIntervalTime = 5000;
    let slideInterval;

    function updateIndicators(index) {
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.remove('bg-white/50', 'hover:bg-white/80');
                indicator.classList.add('bg-white', 'scale-150');
            } else {
                indicator.classList.add('bg-white/50', 'hover:bg-white/80');
                indicator.classList.remove('bg-white', 'scale-150');
            }
        });
    }

    function showSlide(index) {
        slides[currentSlide].classList.remove('opacity-100');
        slides[currentSlide].classList.add('opacity-0');
        
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        
        slides[currentSlide].classList.remove('opacity-0');
        slides[currentSlide].classList.add('opacity-100');
        
        updateIndicators(currentSlide);
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, slideIntervalTime);
        });
    });

    slideInterval = setInterval(nextSlide, slideIntervalTime);
}

function initMessageCarousel() {
    const msgSlides = document.querySelectorAll('[data-message-slide]');
    const msgIndicators = document.querySelectorAll('[data-msg-indicator]');
    if (msgSlides.length === 0) return;

    let currentMsgSlide = 0;
    const msgIntervalTime = 6000;

    function updateMsgIndicators(index) {
        msgIndicators.forEach((ind, i) => {
            if (i === index) {
                ind.classList.remove('bg-oaxaca-wood/20');
                ind.classList.add('bg-oaxaca-clay');
            } else {
                ind.classList.add('bg-oaxaca-wood/20');
                ind.classList.remove('bg-oaxaca-clay');
            }
        });
    }

    function nextMsgSlide() {
        msgSlides[currentMsgSlide].classList.remove('opacity-100', 'translate-x-0');
        msgSlides[currentMsgSlide].classList.add('opacity-0', '-translate-x-8');

        currentMsgSlide = (currentMsgSlide + 1) % msgSlides.length;

        msgSlides[currentMsgSlide].classList.remove('-translate-x-8'); 
        msgSlides[currentMsgSlide].classList.add('translate-x-8');
        
        // Trigger reflow
        void msgSlides[currentMsgSlide].offsetWidth;

        msgSlides[currentMsgSlide].classList.remove('opacity-0', 'translate-x-8');
        msgSlides[currentMsgSlide].classList.add('opacity-100', 'translate-x-0');

        updateMsgIndicators(currentMsgSlide);
    }

    setInterval(nextMsgSlide, msgIntervalTime);
}

function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const whatsappBtn = document.getElementById('whatsapp-float');

    // Listen to custom event for page changes
    document.addEventListener('pageChanged', (e) => {
        updateWhatsAppVisibility(e.detail.page);
    });

    window.addEventListener('scroll', () => {
        // Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md');
            navbar.classList.remove('py-2');
        } else {
            navbar.classList.remove('shadow-md');
            navbar.classList.add('py-2');
        }

        // WhatsApp
        // We need to know current page. Since we don't store it here, we check URL hash or use global var if we had one.
        // Or simply check if home page is visible
        const isHome = !document.getElementById('page-home').classList.contains('hidden');
        if (isHome) {
            if (window.scrollY > window.innerHeight - 100) {
                whatsappBtn.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                whatsappBtn.classList.add('opacity-0', 'pointer-events-none');
            }
        }
    });

    function updateWhatsAppVisibility(pageId) {
        if (pageId === 'home') {
            // Re-trigger scroll check
            window.dispatchEvent(new Event('scroll'));
        } else {
            whatsappBtn.classList.remove('opacity-0', 'pointer-events-none');
        }
    }
}

function initInstructors() {
    document.querySelectorAll('[data-instructor]').forEach(item => {
        item.addEventListener('click', () => {
            const key = item.getAttribute('data-instructor');
            openInstructor(key);
        });
    });
}

function openInstructor(key) {
    const data = instructorsData[key];
    if (!data) return;

    const lang = languageManager.getCurrentLang();
    
    document.getElementById('instructor-name').textContent = data.name;
    document.getElementById('instructor-style').textContent = lang === 'en' ? (data.style_en || data.style) : data.style;
    document.getElementById('instructor-bio').innerHTML = lang === 'en' ? (data.bio_en || data.bio) : data.bio;
    document.getElementById('instructor-quote').innerHTML = `"${lang === 'en' ? (data.quote_en || data.quote) : data.quote}"`;
    document.getElementById('instructor-class-desc').innerHTML = lang === 'en' ? (data.classDesc_en || data.classDesc) : data.classDesc;
    
    const imgEl = document.getElementById('instructor-img');
    const parentEl = imgEl.parentElement;
    
    // Remove existing placeholder if any
    const existingPlaceholder = parentEl.querySelector('.placeholder-initial');
    if (existingPlaceholder) existingPlaceholder.remove();

    if (data.image) {
        imgEl.src = data.image;
        imgEl.classList.remove('hidden');
    } else {
        imgEl.classList.add('hidden');
        const div = document.createElement('div');
        div.className = 'placeholder-initial w-full h-full bg-oaxaca-cream flex items-center justify-center';
        div.innerHTML = `<span class="font-serif text-9xl text-oaxaca-clay opacity-50 select-none">${data.name.charAt(0)}</span>`;
        parentEl.appendChild(div);
    }
    
    imgEl.alt = data.name;

    const message = `Hola, quisiera información sobre las clases de ${data.style} con ${data.name}.`;
    const whatsappUrl = `https://wa.me/${data.phone}?text=${encodeURIComponent(message)}`;
    document.getElementById('instructor-whatsapp').href = whatsappUrl;

    navigateTo('instructor');
}

function initLightbox() {
    const galleryItems = document.querySelectorAll('#galeria .break-inside-avoid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = lightbox.querySelector('.fa-times').parentElement;
    const prevBtn = lightbox.querySelector('.fa-chevron-left').parentElement;
    const nextBtn = lightbox.querySelector('.fa-chevron-right').parentElement;
    
    let lightboxIndex = 0;
    let lightboxImages = [];

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        
        if(img) {
            lightboxImages.push({
                src: img.src,
                alt: img.alt,
                element: item
            });

            item.addEventListener('click', () => openLightbox(index));
        }
    });

    function openLightbox(index) {
        lightboxIndex = index;
        updateLightboxContent();
        lightbox.classList.remove('hidden');
        setTimeout(() => {
            lightbox.classList.remove('opacity-0');
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.add('opacity-0');
        setTimeout(() => {
            lightbox.classList.add('hidden');
        }, 300);
        document.body.style.overflow = '';
    }

    function updateLightboxContent() {
        const data = lightboxImages[lightboxIndex];
        lightboxImg.src = data.src;
        lightboxImg.alt = data.alt;
        lightboxCaption.textContent = data.element.querySelector('p')?.textContent || "";
    }

    function nextImage(e) {
        if(e) e.stopPropagation();
        lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
        updateLightboxContent();
    }

    function prevImage(e) {
        if(e) e.stopPropagation();
        lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateLightboxContent();
    }

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    // Touch events for Swipe
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextImage(); // Swipe Left -> Next
        if (touchEndX > touchStartX + 50) prevImage(); // Swipe Right -> Prev
    }
}
