$(document).ready(function () {
    const mMenuBtn = $(".m-menu-button");
    const mMenu = $(".m-menu");
    const tab = $(".tab");
  
    mMenuBtn.on("click", function () {
      mMenu.toggleClass("active");
      $("body").toggleClass("no-scroll");
    });
  
    tab.on("click", function () {
      tab.removeClass("active");
      $(this).toggleClass("active");
      let activeTabContent = $(this).attr("data-target");
      $(".tabs-content").removeClass("visible");
      $(activeTabContent).toggleClass("visible");
    });
  
    var mySwiper = new Swiper(".footer__swiper-container", {
      slidesPerView: 4,
      spaceBetween: 25,
      loop: true,
      breakpoints: {
        992: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 2,
        },
        320: {
          slidesPerView: 1,
          slidesOffsetAfter: 50,
          navigation: {
            nextEl: ".button-next",
          },
        },
      },
    });
    var swiper = new Swiper('.film__swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      slidesPerGroup: 1,
      loop: true,
      loopFillGroupWithBlank: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  
  
  
  });
  
  const buttonAuth = document.querySelector('.button-auth');
  const signUp = document.querySelector('.sign-up');
  const modalAuth = document.querySelector('.modal-auth');
  const modalPlaceSelector = document.querySelector('.modal__place-selector');
  const closeAuth = document.querySelector('.close-auth');
  const closeReservation = document.querySelector('.close-reservation');
  const logInForm = document.querySelector('#logInForm')
  const loginInput = document.querySelector('#login');
  const userName = document.querySelector('.user-name');
  const buttonOut = document.querySelector('.button-out');
  const cardsCinemas = document.querySelector('.cards__cinemas');
  const cardsMovies = document.querySelector('.cards__movies');
  const kinoparks = document.querySelector('.cinemas');
  const movies = document.querySelector('.movies');
  const logo = document.querySelector('.logo');
  const reservePlace = document.querySelector('.reserve__place');

  let login = localStorage.getItem('client');

  
  const getData = async function (url) {
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(`Error on ${url}, status error ${response.status}`);
    }
  
    return await response.json();
  };
  
  function toggleModalAuth() {
    $('.modal-auth').toggleClass('is-open');
  }

  function toggleModalPlaceSelector(){
    $('.modal__place-selector').toggleClass('is-open');
  }
  
  function authorized() {
    function logOut() {
      login = '';
      localStorage.removeItem('client');
      buttonAuth.style.display = '';
      userName.style.display = '';
      buttonOut.style.display = '';
      buttonOut.removeEventListener('click', logOut);
      checkAuth();
    }
    reservePlace.addEventListener('click',toggleModalPlaceSelector)
    closeReservation.addEventListener('click',toggleModalPlaceSelector);
    userName.textContent = login;
    signUp.style.display = 'none';
    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    buttonOut.style.display = 'block';
  
    buttonOut.addEventListener('click', logOut);
  }
  
  function notAuthorized() {
    function logIn(event) {
      event.preventDefault();
      login = loginInput.value;
  
      localStorage.setItem('client', login);
  
      toggleModalAuth();
      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      logInForm.removeEventListener('submit', logIn);
      logInForm.reset();
      checkAuth();
    }
    
    signUp.style.display = '';
    buttonAuth.addEventListener('click', toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit', logIn);
  }
  
  function checkAuth() {
    if (login) {
      authorized();
    } else {
      notAuthorized();
    }
  }
   
  function init() {
    checkAuth();
  }
  
  init();