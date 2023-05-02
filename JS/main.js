const basketStart = document.querySelector('.basket-starter');
const basketEl = basketStart.querySelector('.basket');

//click했을 경우 window까지 click이 전파되는 것을 멈춤
basketStart.addEventListener('click', (e) => {
  e.stopPropagation();
  
  if (basketEl.classList.contains('show')) {
    hideBasket();
  } else {
    showBasket();
  }
});

//상위로 이벤트가 전파되지 않도록 멈춤
basketEl.addEventListener('click', (e) => {
  e.stopPropagation();
})

window.addEventListener('click', () => {
  hideBasket();
});

function showBasket() {
  basketEl.classList.add('show');
}

function hideBasket() {
  basketEl.classList.remove('show');
}