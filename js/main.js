// js/main.js
import { initMenuToggle } from './menu-toggle.js';
import { initThemeHandler } from './theme-handler.js';
import { initAOSAnimations } from './aos-init.js';
import { loadAndDisplayCourses } from './cursos.js';

document.addEventListener('DOMContentLoaded', () => {
  initMenuToggle();
  initThemeHandler();
  initAOSAnimations();
  loadAndDisplayCourses();
});
