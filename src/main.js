import './style.css';
import { initRouter } from './js/router.js';
import { initUI } from './js/ui.js';

document.addEventListener('DOMContentLoaded', () => {
    initRouter();
    initUI();
});
