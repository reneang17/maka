import './style.css';
import { initRouter } from './js/router.js';
import { initUI } from './js/ui.js';
import { languageManager } from './js/i18n/languageManager.js';

// Make languageManager globally available for inline onclick handlers
window.languageManager = languageManager;

document.addEventListener('DOMContentLoaded', () => {
    languageManager.init();
    initRouter();
    initUI();
});
