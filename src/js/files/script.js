// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile, removeClass } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import { toggleClass } from "./functions.js";
import { removeClassForArray } from "./functions.js";
import { addClass } from "./functions.js";

//data-dropdown

document.addEventListener("DOMContentLoaded", event => {
  
  // Menu Hover

  function addDropdownHover() {
    const dropdowns = document.querySelectorAll('[data-dropdown]');
    const dropdownBtn = document.querySelector('[data-dropdown-btn]');

    dropdowns.forEach(dropdown => {
      dropdown.addEventListener("mouseover", e => {
        addClass(dropdown, '_active');
      });
      dropdown.addEventListener("mouseout", e => {
        removeClass(dropdown, '_active');
      });
    });
  }
  if (!isMobile.any()) {
    addDropdownHover();
  }

  // Menu DropDown

  document.addEventListener("click", docEvents);

  function docEvents(e) {
    const target = e.target;

    if (target.closest('[data-dropdown-btn]')) {
      toggleClass(target.closest('[data-dropdown-btn]').parentElement, '_active');
    }
    if (!target.closest('[data-dropdown]')) {
      removeClassForArray('[data-dropdown]', '_active');
    }

    if (target.closest('[data-click]')) {
      removeClassForArray('[data-click]', '_active');
      addClass(target.closest('[data-click]'), '_active');
    }

    if (target.closest('.nav-articles__item')) {
      removeClassForArray('.nav-articles__item', '_active');
      addClass(target.closest('.nav-articles__item'), '_active');
    }
    
  }
  
});



