import { navigateTo } from './router.js';
import { instructorsData } from './data.js';
import { languageManager } from './i18n/languageManager.js';

// Track currently open instructor for language switching
let currentInstructorKey = null;

export function initUI() {
    initMobileMenu();
    initHeroCarousel();
    initIntroCarousel();
    initMessageCarousel();
    initLightbox();
    initScrollEffects();
    initRandomInstructors();
    initInstructors();
    initAudioTestimonials();
    initScheduleLightbox();
    
    // Listen for language changes
    document.addEventListener('languageChanged', () => {
        initRandomInstructors();
        initInstructors(); // Re-attach event listeners after DOM update
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
    // Temporarily disabled instructor profiles (still being worked on)
    const disabledProfiles = ['phan'];
    
    document.querySelectorAll('[data-instructor]').forEach(item => {
        const key = item.getAttribute('data-instructor');
        const isDisabled = disabledProfiles.includes(key);
        
        // Check if this is in the schedule table
        const isInScheduleTable = item.closest('#page-schedule table');
        
        // For Team page cards of disabled instructors, remove clickable styling
        if (!isInScheduleTable && isDisabled) {
            item.classList.remove('cursor-pointer');
            item.classList.add('cursor-default');
            return; // Don't add click handler
        }
        
        item.addEventListener('click', () => {
            if (isInScheduleTable) {
                // Show class options modal for schedule cells
                showClassOptionsModal(key, item, isDisabled);
            } else {
                // Direct navigation for Team page cards (only enabled instructors)
                openInstructor(key);
            }
        });
    });
}

function openInstructor(key) {
    // Navigate to individual instructor page
    navigateTo(`instructor-${key}`);
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

// Audio testimonials - only one plays at a time
function initAudioTestimonials() {
    const audioElements = document.querySelectorAll('.audio-testimonial');
    
    audioElements.forEach(audio => {
        audio.addEventListener('play', () => {
            // Pause all other audio elements when this one starts playing
            audioElements.forEach(other => {
                if (other !== audio) {
                    other.pause();
                }
            });
        });
    });
}

// Schedule lightbox for mobile devices
function initScheduleLightbox() {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;
    
    const scheduleContainer = document.querySelector('#page-schedule .overflow-x-auto');
    const lightbox = document.getElementById('schedule-lightbox');
    const lightboxContent = document.getElementById('schedule-lightbox-content');
    const closeBtn = document.getElementById('schedule-lightbox-close');
    
    if (!scheduleContainer || !lightbox || !lightboxContent || !closeBtn) return;
    
    // Make the schedule container clickable on mobile
    scheduleContainer.classList.add('cursor-pointer');
    
    // Open lightbox when schedule is tapped
    scheduleContainer.addEventListener('click', (e) => {
        // Don't open if clicking on an instructor link (but we already disabled those on mobile)
        if (e.target.closest('[data-instructor]')) return;
        
        // Clone the table and put it in the lightbox
        const table = scheduleContainer.querySelector('table');
        if (table) {
            lightboxContent.innerHTML = '';
            const clonedTable = table.cloneNode(true);
            // Make the cloned table not respond to clicks
            clonedTable.querySelectorAll('[data-instructor]').forEach(cell => {
                cell.classList.remove('cursor-pointer', 'hover:bg-black/5');
                cell.classList.add('cursor-default');
            });
            lightboxContent.appendChild(clonedTable);
        }
        
        // Show lightbox
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
    });
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.closest('#schedule-lightbox > div') === e.target.querySelector('#schedule-lightbox > div')) {
            if (!e.target.closest('#schedule-lightbox-content')) {
                lightbox.classList.add('hidden');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            lightbox.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
}

// Show class options modal for schedule table cells
function showClassOptionsModal(instructorKey, cellElement, hideProfile = false) {
    const data = instructorsData[instructorKey];
    if (!data) return;
    
    const modal = document.getElementById('class-options-modal');
    const titleEl = document.getElementById('class-options-title');
    const instructorEl = document.getElementById('class-options-instructor');
    const profileBtn = document.getElementById('class-options-profile');
    const whatsappLink = document.getElementById('class-options-whatsapp');
    const closeBtn = document.getElementById('class-options-close');
    
    if (!modal) return;
    
    // Get class name from the cell
    const classNameEl = cellElement.querySelector('[data-i18n]');
    const className = classNameEl ? classNameEl.textContent : 'Yoga';
    
    // Get current language
    const lang = languageManager.currentLang || 'es';
    const withText = lang === 'en' ? 'with' : 'con';
    const viewProfileText = lang === 'en' ? `View ${data.name}'s profile` : `Ver perfil de ${data.name}`;
    
    // Populate modal
    titleEl.textContent = className;
    instructorEl.textContent = `${withText} ${data.name}`;
    
    // Hide or show profile button based on whether profile is disabled
    if (hideProfile) {
        profileBtn.classList.add('hidden');
    } else {
        profileBtn.classList.remove('hidden');
        // Update profile button text
        profileBtn.querySelector('span').textContent = viewProfileText;
    }
    
    // Setup WhatsApp link
    const message = lang === 'en' 
        ? `Hi, I'd like to ask about availability for the ${className} class with ${data.name}`
        : `Hola, quisiera preguntar por disponibilidad para la clase de ${className} con ${data.name}`;
    whatsappLink.href = `https://wa.me/${data.phone}?text=${encodeURIComponent(message)}`;
    
    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Profile button handler (only if not hidden)
    const profileHandler = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        openInstructor(instructorKey);
        profileBtn.removeEventListener('click', profileHandler);
    };
    if (!hideProfile) {
        profileBtn.addEventListener('click', profileHandler);
    }
    
    // Close button handler
    const closeHandler = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        closeBtn.removeEventListener('click', closeHandler);
    };
    closeBtn.addEventListener('click', closeHandler);
    
    // Background click handler
    const bgHandler = (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            modal.removeEventListener('click', bgHandler);
        }
    };
    modal.addEventListener('click', bgHandler);
    
    // Escape key handler
    const escHandler = (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}
