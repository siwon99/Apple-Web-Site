import ipads from '../data/ipads.js'

const basketStart = document.querySelector('header .basket-starter');
const basketEl = basketStart.querySelector('.basket');

const headerEl = document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')];
const searchWrap = headerEl.querySelector('.search-wrap');
const searchStarter = headerEl.querySelector('.search-starter');
const searchCloser = searchWrap.querySelector('.search-closer');
const searchShadow = searchWrap.querySelector('.shadow');
const searchInput = searchWrap.querySelector('input');
const searchDelay =[...searchWrap.querySelectorAll('li')];

const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");
const infoEls = document.querySelectorAll('.info');

const items = document.querySelector("section.compare .items");


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

searchStarter.addEventListener('click', showSearch);
searchCloser.addEventListener('click', (e) => {
  e.stopPropagation();
  hideSearch();
});
searchShadow.addEventListener('click', hideSearch);

//검색바가 나타나면 화면 스크롤이 안되고 고정된다
function showSearch() {
  headerEl.classList.add('searching');
  headerMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's' //0 * 4초 / 12개 + 초
  });
  searchDelay.forEach((el, index) => {
    el.style.transitionDelay = index * .4 / searchDelay.length + 's';
  })
  setTimeout(() => {
    searchInput.focus();
  }, 600);
}

function hideSearch() {
  headerEl.classList.remove('searching');

  headerMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'; //0 * 4초 / 12개 + 초
  });
  searchDelay.reverse().forEach((el, index) => {
    el.style.transitionDelay = index * .4 / searchDelay.length + 's';
  })
  searchDelay.reverse()
  searchInput.value=''
}

function playScroll() {
  document.documentElement.classList.remove('fixed');
}

function stopScroll() {
  document.documentElement.classList.add('fixed');
}

//entries는 배열 속성
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show');
  })
})

infoEls.forEach((el) => {
  io.observe(el);
})

//비디오 재생, 일시정지
playBtn.addEventListener('click', () => {
  video.play();
  playBtn.classList.add('hide');
  pauseBtn.classList.remove('hide');
});

pauseBtn.addEventListener('click', () => {
  video.pause();
  playBtn.classList.remove('hide');
  pauseBtn.classList.add('hide');
});

//각 el의 name속성을 item클래스를 가진 div요소 텍스트로 추가
//item을 items 배열에 추가
ipads.forEach((ipad) => {
  const item = document.createElement('div');
  item.classList.add('item');

  let colorList = '';
  ipad.colors.forEach((co) => {
    colorList += `<li style="background-color: ${co};"></li>`
  });

  item.innerHTML = /* HTML */ `
  <div class="thumbnail">
    <img src="${ipad.thumbnail}" alt="${ipad.name}" />  
  </div>
  <ul class="colors">
    ${colorList}
  </ul>
  <h3 class="name">${ipad.name}</h3>
  <p class="tagline">${ipad.tagline}</p>
  <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
  <button class="btn">구입하기</button>
  <a href="${ipad.url}" class="link">더 알아보기</a>
  `
  items.append(item);
});