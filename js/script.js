
"use strict";

// const { match } = require("core-js/fn/symbol");


window.addEventListener('DOMContentLoaded', () => {

  // Показ табов

  const tabcontent = document.querySelectorAll('.tabcontent'),
        tabheader = document.querySelector('.tabheader'),
        tab = document.querySelectorAll('.tabheader__item');

  function hideTabContent() {
    tabcontent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('fade', 'show');
    });
    tab.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabcontent[i].classList.add('fade', 'show');
    tab[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();
  tabheader.addEventListener('click', e => {
    if (e.target && e.target.classList.contains('tabheader__item')) {
      tab.forEach((item, i) => {
        if (e.target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }); 
  
  
  // Таймер обратного отсчета
  // const deadLine = '2020-08-20';

  const deadLine = new Date(2020, 12, 31, 23, 59);

  function calculateRemainingTime(endTime) {
    let t = Date.parse(endTime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 24 * 60 * 60)),
        hours = Math.floor(t / (1000 * 60 * 60) % 24),
        minutes = Math.floor(t / (1000 * 60) % 60),
        seconds = Math.floor(t / 1000 % 60);
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  function getZero(num) {
    if (num < 10 && num >= 0) {
      return `0${num}`;
    } else {
      if (num < 0) {
        return 0;
      } else {
        return num;
      }
    }
  }

  function addTime(end) {
    let days = document.querySelector('#days'),
        hours = document.querySelector('#hours'),
        minutes = document.querySelector('#minutes'),
        seconds = document.querySelector('#seconds');
    let x = setInterval(inner, 1000);
    inner();

    function inner() {
      let t = calculateRemainingTime(end);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(x);
      }

      
    }
  }

  addTime(deadLine); 
  
  
  // Modal

  let btn = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      // close = document.querySelector('[data-close]'),
      modalTime = setTimeout(openModal, 15000);

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  btn.forEach(item => {
    item.addEventListener('click', () => {
      openModal();
      clearInterval(modalTime);
    });
  });

  // close.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == "") {
      closeModal();
      clearInterval(modalTime);
    }
  });

  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.style.display == 'block') {
      closeModal();
    }
  });

  function openModalByScroll() {
    if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', openModalByScroll);
      clearInterval(modalTime);
    }
  }

  window.addEventListener('scroll', openModalByScroll); 
  
  
  // Menu cards

  class MenuCard {
    constructor(src, alt, name, text, price, parent, ...classes) {
      this.src = src;
      this.alt = alt;
      this.name = name;
      this.text = text;
      this.price = price;
      this.parent = document.querySelector(parent);
      this.changToUan();
      this.classes = classes;
    }

    changToUan() {
      this.price = this.price * 76;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        element.classList.add('menu__item');
      } else {
        this.classes.forEach(name => element.classList.add(name));
      }

      element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">Меню "${this.name}"</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб./день</div>
                 </div>`;
      this.parent.append(element);
    }

  }

  // let getResource = async (url) => {
  //   const res = await fetch(url);

  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  //   }

  //   return await res.json();
  // };

  // getResource('http://localhost:3000/menu')
  // getResource('https://food.gordyushin.ru/')

  // .then(data => {
  //   data.forEach(({img, altimg, title, descr, price}) => {
  //     new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
  //   });
  // });

  new MenuCard("img/tabs/vegy.jpg", "vegy", "Фитнес", 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 9, ".menu__field .container", "menu__item").render();
  new MenuCard("img/tabs/elite.jpg", "elite", "Премиум", 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 18, ".menu__field .container", "menu__item").render();
  new MenuCard("img/tabs/post.jpg", "post", "Постное", 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 14, ".menu__field .container").render();


  // Отправка формы

  const form = document.querySelectorAll('form'),
  message = {
    loaded: 'img/form/spinner.svg',
    load: 'Спасибо! Мы скоро свяжемся с вами',
    error: 'Что-то пошло не так...'
  };

  form.forEach((item) => {
  item.addEventListener('submit', (e) => {
    e.preventDefault();
    bindPostForm(item);
    });
  });

  let postForm = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        'content-type': 'application/json'
      }
    });
    return await res.json();
  };

  

  function bindPostForm(form) {
    const formData = new FormData(form);
    // request = new XMLHttpRequest(),
    // request.open('POST', 'server.php'); 
    

    // Метод отправки данных в формате JSON
    // request.setRequestHeader('content-type', 'application/json');
    // const obj = {};
    // formData.forEach((item, key) => {
    //   obj[key] = item;
    // });
    // request.send(JSON.stringify(obj));


    // Метод отправки данных в формате formData

    // fetch('server.php', {
    //   method: 'POST',
    //   body: formData
    // }).then(data => data.text())
    //   .then(data => {
    //     console.log(data);
    //     openModalThanks(message.load);
    //   })
    //   .catch(() => openModalThanks(message.error))
    //   .finally(() => loaded.remove());


    // Для отправки с помощью fetch данных в формате json

    const obj = {};
    formData.forEach((item, key) => {
      obj[key] = item;
    });

      // fetch('server.php', {
      //   method: 'POST',
      //   body: JSON.stringify(obj),
      //   headers: {
      //     'content-type': 'application/json'
      //   }
      // }).then(data => data.text())
      postForm('http://localhost:3000/requests', JSON.stringify(obj))
        .then(data => {
          console.log(data);
          openModalThanks(message.load);
        })
        .catch(() => openModalThanks(message.error))
        .finally(() => loaded.remove());



    // request.send(formData);
    const loaded = document.createElement('img');
    loaded.src = message.loaded;
    loaded.style.cssText = `
    margin: 0 auto;
    display; block;
    `;
    form.append(loaded);

    function openModalThanks(message) {
      const prevModal = document.querySelector('.modal__dialog');
      prevModal.style.display = 'none';
      const modalThanks = document.createElement('div');
      modalThanks.classList.add('modal__dialog');
      modalThanks.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>`;
      modal.append(modalThanks);
      form.reset();
      setTimeout(() => {
        closeModal();
        modalThanks.remove();
        prevModal.style.display = 'block';
      }, 2000);
    }

    // request.addEventListener('load', () => {
    //   if (request.status === 200) {
    //     openModalThanks(message.load);
    //     loaded.remove();
    //   } else {
    //     openModalThanks(message.error);
    //     loaded.remove();
    //   }
    // });
  }

  // fetch('http://localhost:3000/menu')
  // .then(data => data.json())
  // .then(res => console.log(res));


  // Slider

  // let slider = document.querySelector('.offer__slider'),
  //     sliderNumber = document.createElement('div'),
  //     sliderImg = document.createElement('div'),
  //     currentNumber = 1,
  //     totalNumber = 4,
  //     currentImg = [
  //       'src="img/slider/pepper.jpg" alt="pepper"',
  //       'src="img/slider/food-12.jpg" alt="food"',
  //       'src="img/slider/olive-oil.jpg" alt="oil"',
  //       'src="img/slider/paprika.jpg" alt="paprika"',
  //     ];

  // sliderNumber.classList.add('offer__slider-counter');
  // sliderImg.classList.add('offer__slider-wrapper');

  // function renderSlide() {

  //   function showSliderNumber() {
  //     let current = currentNumber,
  //         total = totalNumber;

  //     if (currentNumber < 10) {
  //       current = '0' + currentNumber;
  //     }

  //     if (totalNumber < 10) {
  //       total = '0' + totalNumber;
  //     }

  //     sliderNumber.innerHTML = `
  //     <div class="offer__slider-counter">
  //     <div class="offer__slider-prev">
  //         <img src="icons/left.svg" alt="prev">
  //     </div>
  //     <span id="current">${current}</span>
  //     /
  //     <span id="total">${total}</span>
  //     <div class="offer__slider-next">
  //         <img src="icons/right.svg" alt="next">
  //     </div>`;

  //     slider.append(sliderNumber);
  //   }
    
  //   function showSliderImg(i = 0) {
  //     sliderImg.innerHTML = `
  //       <div class="offer__slide">
  //           <img ${currentImg[i -1]}>
  //       </div>`;

  //       slider.append(sliderImg);
  //   }
    
  //   showSliderNumber();
  //   showSliderImg(currentNumber);
      
  // }

  // renderSlide();

  // let prev = document.querySelector('.offer__slider-prev'),
  //     next = slider.querySelector('.offer__slider-next');

  // next.addEventListener('click', (e) => {
  //   console.log('Ура');
  //   currentNumber = ++currentNumber;
  //   renderSlide();
  // });

  // prev.addEventListener('click', () => {
  //   console.log('Ура');
  //   currentNumber = --currentNumber;
  //   renderSlide();
  // });


  // Slider

  let slideIndex = 1,
      offset = 0;
  const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        inner = document.querySelector('.offer__slider-inner'),
        wrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(wrapper).width;

  wrapper.style.overflow = 'hidden';
  wrapper.style.width = width;
  inner.style.width = 100 * slides.length + '%';
  inner.style.display = 'flex';

  if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
      current.textContent = `0${slideIndex}`;
  } else {
      total.textContent = slides.length;
      current.textContent = slideIndex;
  }

 function writeNumber (i) {
  if (i < 10) {
    current.textContent = `0${i}`;
  } else {
      current.textContent = i;
  }
  }

  next.addEventListener('click', () => {
    if (slideIndex == slides.length) {
      slideIndex = 1;
      inner.style.transform = `translateX(0)`;
    } else {
      offset = parseInt(width) * slideIndex;
      inner.style.transform = `translateX(-${offset}px)`;
      slideIndex++;
    }

    writeNumber(slideIndex);
    startDot(slideIndex - 1);
  });

  prev.addEventListener('click', () => {
    if (slideIndex == 1) {
      slideIndex = slides.length;
      offset = parseInt(width) * (slideIndex -1);
      inner.style.transform = `translateX(-${offset}px)`;
    } else {
      offset = parseInt(width) * (slideIndex -2);
      inner.style.transform = `translateX(${-offset}px)`;
      slideIndex--;
    }

    writeNumber(slideIndex);
    startDot(slideIndex - 1);
  });

  // showSlides(slideIndex).;

  // if (slides.length < 10) {
  //     total.textContent = `0${slides.length}`;
  // } else {
  //     total.textContent = slides.length;
  // }

  // function showSlides(n) {
  //     if (n > slides.length) {
  //         slideIndex = 1;
  //     }
  //     if (n < 1) {
  //         slideIndex = slides.length;
  //     }

  //     slides.forEach((item) => item.style.display = 'none');

  //     slides[slideIndex - 1].style.display = 'block'; // Как ваша самостоятельная работа - переписать на использование классов show/hide
      
  //     if (slides.length < 10) {
  //         current.textContent =  `0${slideIndex}`;
  //     } else {
  //         current.textContent =  slideIndex;
  //     }
  // }

  // function plusSlides (n) {
  //     showSlides(slideIndex += n);
  // }

  // prev.addEventListener('click', function(){
  //     plusSlides(-1);
  // });

  // next.addEventListener('click', function(){
  //     plusSlides(1);
  // });

  const dotCarusel = document.createElement('ul');

  dotCarusel.classList.add('carousel-indicators');

  wrapper.style.position = 'relative';

  wrapper.append(dotCarusel);

  for ( let i = 1; i <= slides.length; i++) {
    let dots = document.createElement('li');
    dots.classList.add('dot');
    dotCarusel.append(dots);

  }

  const dot = dotCarusel.querySelectorAll('.dot');

  function hideActiveDot() {
    dot.forEach(item => {
      item.classList.remove('dot2');
    });
  }

  function startDot(i = 0) {
    hideActiveDot();
    dot[i].classList.add('dot2');
  }
  startDot();
 
  wrapper.addEventListener('click', e => {
    // if (e.target.getAttribute('data-dot') == "") {
    // }
    if (e.target && e.target.classList.contains('dot')) {
      dot.forEach((item, i) => {
        if (e.target == item) {
        startDot(i);

        slideIndex = i + 1;
        writeNumber(slideIndex);

        offset = parseInt(width) * (slideIndex - 1);
        inner.style.transform = `translateX(-${offset}px)`;
        // slideIndex++;
        }
      });
    }
  });

  // Calc

  let sex, height, weight, age, ratio;

  const result = document.querySelector('.calculating__result span');

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', sex);
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', ratio);
  }

  function startClassActive(selector, classList) {
    const element = document.querySelectorAll(`${selector} div`);

    element.forEach(item => {
      item.classList.remove(classList);

      if (item.getAttribute('id') === localStorage.getItem('sex')) {
        item.classList.add(classList);
      }
      if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        item.classList.add(classList);
      }    
    });
  }

  startClassActive('#gender', 'calculating__choose-item_active');
  startClassActive('.calculating__choose_big', 'calculating__choose-item_active');

  function calcResult() {
    if (!height || !weight || !age) {
      result.textContent = '_ _ _ _';
      return;
    } 
    
    if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }     
  }

  calcResult();



  function choice (parrent, classes) {
    const block = document.querySelectorAll(`${parrent} div`);

    block.forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', ratio);
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', sex);
        }
        calcResult();

        block.forEach(item => {
          item.classList.remove('calculating__choose-item_active');
        });
        e.target.classList.add('calculating__choose-item_active');
      });
    });
    
  }

  choice('#gender', 'calculating__choose-item_active');
  choice('.calculating__choose_big', 'calculating__choose-item_active');

  function getParametr(selector) {
    let input = document.querySelector(selector);

      input.addEventListener('input', () => {

        if (input.value.match(/\D/g)) {
          input.style.border = '1px solid red';
        } else {
          input.style.border = 'none';
        }

        switch(input.getAttribute('id')) {
          case 'height':
            height = +input.value;
            break;
          case 'weight':
            weight = +input.value;
            break;
          case 'age':
            age = +input.value;
            break;
        }
        calcResult();
      });
  }

  getParametr('#height');
  getParametr('#weight');
  getParametr('#age');

});

