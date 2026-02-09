import { translations } from './dictionary.js';

export class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('maka_lang') || 'es';
        this.translations = translations;
    }

    init() {
        this.updateContent();
        this.updateToggleButton();
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('maka_lang', this.currentLang);
        this.updateContent();
        this.updateToggleButton();
        
        // Dispatch event for other components to update
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { lang: this.currentLang } 
        }));
    }

    updateToggleButton() {
        const btnDesktop = document.getElementById('lang-toggle-desktop');
        const btnMobile = document.getElementById('lang-toggle-mobile');
        
        const label = this.currentLang === 'es' ? 'EN' : 'ES'; // Show target language
        
        if (btnDesktop) btnDesktop.textContent = label;
        if (btnMobile) btnMobile.textContent = label;
    }

    updateContent() {
        // Update static elements with data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key) {
                const keys = key.split('.');
                let value = this.translations;
                
                for (const k of keys) {
                    value = value ? value[k] : undefined;
                }

                if (value && value[this.currentLang]) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = value[this.currentLang];
                    } else {
                        el.innerHTML = value[this.currentLang];
                    }
                }
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;
    }

    get(key) {
        return this.translations[key] ? this.translations[key][this.currentLang] : key;
    }
    
    getCurrentLang() {
        return this.currentLang;
    }
}

export const languageManager = new LanguageManager();
