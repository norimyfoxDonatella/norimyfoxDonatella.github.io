
window.addEventListener("DOMContentLoaded", () => {
	const modals = () => {
		function bindModal(trigger, modalSelector) {
			const modalPopup = document.querySelectorAll(modalSelector);
			const btnTrigger =  document.querySelectorAll(trigger);
			//Modal
			btnTrigger.forEach(btn => {
				btn.addEventListener('click', (e) => {
					modalPopup.forEach(item => {
						//show modal
						if(e.target.classList.contains('modal__popup-streamer')) {
							document.querySelector('.streamer').classList.add('button__modal-switch_active');
						} else if (e.target.classList.contains('modal__popup-advertisers')) {
							document.querySelector('.advertisers').classList.add('button__modal-switch_active');
						}
						toggleDisplay(item, 'flex');
						animateModal(item, 'animate__fadeIn');
						closeModalWrapper(item);
						document.body.style.overflow = 'hidden';
					});
				});
			});
		}
		//close modal wrapper
		function closeModalWrapper(item) {
			window.addEventListener('click', (e) => {
				if(e.target.classList == item.classList) {
					animateModal(e.target, 'animate__fadeOut');
					document.body.style.overflow = '';
					setTimeout(() => {
						
						toggleDisplay(e.target, 'none');
						e.target.classList.remove('animate__fadeOut');
					}, 400);
				}
			});
		}
		//animate modal
		function animateModal(item, animate) {
			item.classList.remove(animate);
			item.classList.add('animate__animated', animate);
		}
		//Show/close modal
		function toggleDisplay(selector, display) {
			selector.style.display = display;
		}
		//switch user
		function switchUsers(trigger, streamers, advertising) {
			const btnTrigger = document.querySelectorAll(trigger);
			const streamer = document.querySelectorAll(streamers);
			const advertiser = document.querySelectorAll(advertising);
			btnTrigger.forEach(btn => {
				streamer.forEach(stream => {
					advertiser.forEach(adv => {
						btn.addEventListener('click', (e) => {
							if(e.target.classList.contains('streamer')) {
								toggleDisplay(stream, 'flex');
								animateModal(stream, 'animate__fadeIn');
								toggleDisplay(adv, 'none');
								closeModalWrapper(stream);
							} else if (e.target.classList.contains('advertisers')) {
								toggleDisplay(stream, 'none');
								animateModal(adv, 'animate__fadeIn');
								toggleDisplay(adv, 'flex');
								closeModalWrapper(adv);
							}
						});
					});
				});
			});
		}
		bindModal('.button__registration', '.modal__popup-streamer');
		bindModal('.button__addAdvertising', '.modal__popup-advertisers');
		bindModal('.button__sing-in', '.modal__popup-streamer');
		bindModal('.button__calc', '.modal__popup-calc', '.modal__calc-exit');
		switchUsers('.button__modal-switch', '.modal__popup-streamer', '.modal__popup-advertisers');

	};
	//Mobile menu
	const menuMobile = () => {
		function bindMenu(menuTrigger, activeMenu, closeMenu) {
			const btnTrigger = document.querySelector(menuTrigger);
			const menuActive = document.querySelector(activeMenu);
			const menuClose = document.querySelector(closeMenu);
			//triggers close and show menu
			const showMenu = document.querySelector('.hamburger__popUp');
			const hiddenMenu = document.querySelector('.hamburger__close');

			btnTrigger.addEventListener('click', (e) => {
				if(e.target.classList.contains('mobile__btn-active')) {
					toggleDisplay(menuClose, 'none');
					toggleDisplay(showMenu, 'none');
					toggleDisplay(menuActive, 'block');
					toggleDisplay(hiddenMenu, 'flex');
					animateModal(menuActive, 'animate__fadeIn');
					animateModal(hiddenMenu, 'animate__fadeIn');
				} else if (e.target.classList.contains('mobile__btn-close')) {
					toggleDisplay(menuClose, 'block');
					toggleDisplay(showMenu, 'block');
					animateModal(menuClose, 'animate__fadeIn');
					animateModal(showMenu, 'animate__fadeIn');
					toggleDisplay(menuActive, 'none');
					toggleDisplay(hiddenMenu, 'none');
				}
			});
			function toggleDisplay(selector, disp) {
				selector.style.display = disp;
			}
		}
		function animateModal(item, animate) {
			item.classList.remove(animate);
			item.classList.add('animate__animated', animate);
		}
		bindMenu('.hamburger_menu', '.mobile__menu_active', '.mobile__menu_close');
	};
	//slider
	const slider = () => {
		function autoSlider(slides) {
			let slideIndex = 1,
				paused;

			const items = document.querySelectorAll(slides);
			function showSlides(n) {
				//крайние значения
				if (n > items.length) {
					slideIndex = 1;
				}
		
				if (n < 1) {
					slideIndex = items.length;
				}
		
				items.forEach(item => {
					item.style.display = "none";
					item.classList.remove('slider__img_small');
					item.classList.add('slider__img_big');
				});
				items[slideIndex - 1].style.display = 'block';
			}

			function plusSlides(n) {
				showSlides(slideIndex += n);
			}

			function activateAnimation() {
				paused = setInterval(function() {
					plusSlides(1);
					items[slideIndex - 1].classList.remove('animate__fadeInLeft');
            		items[slideIndex - 1].classList.add('animate__animated', 'animate__fadeInLeft');
				}, 5000);
			}
			activateAnimation();
		
			items[0].parentNode.addEventListener('mouseenter', () => {
				clearInterval(paused);
			});
			items[0].parentNode.addEventListener('mouseleave', () => {
				activateAnimation();
			});

			showSlides();
		}
		autoSlider('.slider__img');
	};
	//calc
	const calc = () => {
		function countingEarnings(view, dur, lang, btnTrigger) {
			const viewers = document.querySelector(view),
				duration = document.querySelector(dur),
				language = document.querySelector(lang),
				btn = document.querySelector(btnTrigger);
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				language.value = language.value.replace(/[1-9]/g, '');
				if (viewers.value == '' || viewers.value == null) {
					errorMassege();
				} else if (duration.value == '' || duration.value == null) {
					errorMassege();
				} else if (language.value == '' || language.value == null) {
					errorMassege();
				} else {
					const priceViewers = viewers.value * 3;
					const priceDuration = duration.value * 3;
					let priceLanguage;
					if(language.value == 'English') {
						priceLanguage = viewers.value * 4;
					} else if (language == 'Русский' || language == 'Украинский' || language == 'Белорусский') {
						priceLanguage = viewers.value * 2;
					} else {
						priceLanguage = viewers.value * 1;
					}
					const price = (priceViewers + priceDuration + priceLanguage) * 2;
					createNewModal(price);
				}
				function createNewModal(price) {
					const modalCalc = document.querySelector('.modal__calc > .modal__wrapper');
					modalCalc.classList.add('animate__animated', 'animate__fadeOut');
					modalCalc.style.cssText = `
						position: absolute;
						top: 0;
						right: 0;
						left: 0;
						bottom: 0;
					`;

					const thanksModal = document.createElement('div'),
						sayPrice = document.createElement('div');
					thanksModal.classList.add('modal__wrapper');
					modalCalc.parentNode.append(thanksModal);
					thanksModal.classList.add('animate__animated', 'animate__fadeIn');
					thanksModal.style.cssText = `
						font-size: 15px;
						text-align: center;
						font-weight: bold;
					`;
					thanksModal.textContent = `Спасибо за обращение! Ваш заработок будет составлять ${price} руб.`;
					
					thanksModal.append(sayPrice);
					sayPrice.style.cssText = `
						font-size: 15px;
						text-align: center;
						margin-top: 20px
					`;
					sayPrice.textContent = `Заполните форму что-бы с Вами связались наши менеджеры!`;
					setTimeout(() => {
						thanksModal.classList.remove('animate__fadeIn');
						thanksModal.classList.add('animate__animated', 'animate__fadeOut');
						thanksModal.remove();
						setTimeout(() => {
							document.querySelectorAll('.button__addAdvertising').forEach(item => {
								item.click();
							});
							modalCalc.parentNode.parentNode.style.display = 'none';

						}, 300);
					}, 3000);

				}
				function errorMassege() {
					redInput(duration);
					redInput(language);
					redInput(viewers);
					const errorMassege = document.createElement('div');
					errorMassege.innerHTML = 'Одно из значений не введено!';
					errorMassege.style.cssText = `
						font-size: 15px;
						color: red;
						margin-top: 10px;
						text-align: center
					`;
					btn.parentNode.append(errorMassege);
				}
				function redInput(item) {
					item.parentNode.style.borderColor = 'red';
				}
			});

		}
		countingEarnings('.view', '.duration', '.language', '.calc');
	};
	calc();
	slider();
	modals();
	menuMobile();
});
