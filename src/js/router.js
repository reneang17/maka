export function initRouter() {
    document.querySelectorAll('[data-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-link');
            const section = link.getAttribute('data-section');
            navigateTo(page, section);
            
             // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Check for hash on load
    const hash = window.location.hash.substring(1);
    const validPages = ['home', 'space', 'vision', 'schedule', 'team', 'instructor', 'contact'];
    
    if (hash && validPages.includes(hash)) {
        navigateTo(hash, null, false);
    } else {
        navigateTo('home', null, false);
    }
    
    // Handle browser back button (simple version)
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.page) {
            navigateTo(e.state.page, null, false);
        }
    });
}

export function navigateTo(pageId, sectionId = null, pushState = true) {
    const pages = ['home', 'space', 'vision', 'schedule', 'team', 'instructor', 'contact'];
    
    // Hide all
    pages.forEach(p => {
        const el = document.getElementById('page-' + p);
        if (el) el.classList.add('hidden');
    });

    // Show current
    const currentEl = document.getElementById('page-' + pageId);
    if (currentEl) currentEl.classList.remove('hidden');

    // Push state
    if (pushState) {
        history.pushState({ page: pageId }, '', `#${pageId}`);
    }

    // Dispatch event for other components (like WhatsApp button)
    document.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: pageId } }));

    // Scroll
    if (sectionId) {
        setTimeout(() => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }, 10);
    } else {
        window.scrollTo(0, 0);
    }
}
