const userName = document.querySelector('.user-name');
const signUp = document.querySelector('.sign-up');
const buttonAuth = document.querySelector('.button-auth');
const buttonOut = document.querySelector('.button-out');
const closeAuth = document.querySelector('.close-auth');
const loginInput = document.querySelector('#login');
const logInForm = document.querySelector('#logInForm')
let login = localStorage.getItem('client');
const acc = document.querySelectorAll('.accordion');

function toggleModalAuth() {
    $('.modal-auth').toggleClass('is-open');
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
  function dropAccordion(){
    for(let i=0;i<acc.length;i++){
      acc[i].addEventListener('click',function(){
        console.log('hi');
        var panel = this.nextElementSibling;
        if(panel.style.maxHeight){
          panel.style.maxHeight = null;
        }else{
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      })
    }
  }
function init(){
  dropAccordion();
  checkAuth();
}
init();
