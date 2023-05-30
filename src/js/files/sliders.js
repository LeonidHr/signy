/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper, { Pagination, Autoplay, Grid } from 'swiper';
import {removeClassForArray, addClass} from './functions.js';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.main-slider__slider')) { // Вказуємо склас потрібного слайдера
		
		// Створюємо слайдер
		const mainSlider = new Swiper('.main-slider__slider', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Pagination, Autoplay],
			loop: true,
			autoplay: {
				delay: 15000,
			},
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 500,
			speed: 1500,
			// Пагінація
			pagination: {
				el: '.main-slider__pagination',
				clickable: true,
			},

			// Події
			on: {
				slideChange: function(swiper) {
					removeClassForArray('.main-slider-pagination__btn', '_active');
					addClass(document.querySelector(`[data-index="${swiper.realIndex}"]`), '_active');
				}
			}
		});
		addClass(document.querySelector('.main-slider-pagination__btn'), '_active');

		document.querySelector('.main-slider-pagination').addEventListener("click", e => {
			if (e.target.closest('.main-slider-pagination__btn')) {
				removeClassForArray('.main-slider-pagination__btn', '_active');
				addClass(e.target.closest('.main-slider-pagination__btn'), '_active');

				const index = e.target.closest('.main-slider-pagination__btn').dataset.index;
				mainSlider.slideTo(index);
			}
		});
	}

	if (document.querySelector('.partners__slider')) { // Вказуємо склас потрібного слайдера
		
		// Створюємо слайдер
		new Swiper('.partners__slider', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Pagination, Grid],
			observer: true,
			observeParents: true,
			spaceBetween: 20,
			speed: 800,
			// Пагінація
			pagination: {
				el: '.partners__pagination',
				clickable: true,
			},

			breakpoints: {
				300: {
					grid: {
						rows: 2,
					},
					slidesPerGroup: 2,
					slidesPerView: 2,
				},
				480: {
					grid: {
						rows: 1,
					},
					slidesPerGroup: 4,
					slidesPerView: 4,
				}
			},

			// Події
			on: {
			}
		});
	}
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
});