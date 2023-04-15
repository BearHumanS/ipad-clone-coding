import ipads from './data/ipads.js'
import navigations from './data/navigations.js'

const basketContainer = document.querySelector('header .basket-container');
const basket = basketContainer.querySelector('.basket')

basketContainer.addEventListener('click', () => {
   basket.classList.toggle('show');
});

basket.addEventListener('click', e => {
    e.stopPropagation();
});

window.addEventListener("click", e => {
    if (!basketContainer.contains(e.target)) {
        basket.classList.remove('show');
      };
  });

  const header = document.querySelector('header');
  const headerMenu = [...header.querySelectorAll('ul.menu > li')];
  const searchContainer = header.querySelector('.search-container');
  const searchWrap = header.querySelector('.search-wrap');
  const searchMenu = [...searchWrap.querySelectorAll('ul > li')];
  const close = searchWrap.querySelector('.search-close');
  const shadow = searchWrap.querySelector('.shadow');
  const searchInput = searchWrap.querySelector('input');

  searchContainer.addEventListener('click', addSearching);
  close.addEventListener('click', removeSearching);
  shadow.addEventListener('click', removeSearching);
  

  function addSearching () {
    header.classList.add('searching');
    document.documentElement.classList.add('fixed');
    headerMenu.reverse().forEach(function (el, index) {
      el.style.transitionDelay = (index * 0.4 / headerMenu.length + 's');
    });
    searchMenu.forEach(function (el, index) {
      el.style.transitionDelay = (index * 0.4 / searchMenu.length + 's');
    });
    setTimeout( () => {
      searchInput.focus();
    }, 600);
  };

  function removeSearching () {
    header.classList.remove('searching');
    document.documentElement.classList.remove('fixed');
    headerMenu.reverse().forEach(function (el, index) {
      el.style.transitionDelay = (index * 0.4 / headerMenu.length + 's');
    });
    searchMenu.reverse().forEach(function (el, index) {
      el.style.transitionDelay = (index * 0.4 / searchMenu.length + 's');
    });
    searchMenu.reverse();
    searchInput.value='';
  };

  // 요소의 가시성 관찰
  const io =  new IntersectionObserver(function (entries) {
    entries.forEach (function (entry) {
      if(!entry.isIntersecting) {
        return
      };
      entry.target.classList.add ('show');
    });
  });

  const info = document.querySelectorAll('.info');
  info.forEach(function (el) {
    io.observe(el);
  });

  // 비디오 재생
  const video = document.querySelector('.stage video');
  const playBtn = document.querySelector('.stage .controller--play')
  const pauseBtn = document.querySelector('.stage .controller--pause')

  playBtn.addEventListener('click', function () {
    video.play();
    playBtn.classList.add('hide')
    pauseBtn.classList.remove('hide')
  })
  pauseBtn.addEventListener('click', function () {
    video.pause();
    playBtn.classList.remove('hide')
    pauseBtn.classList.add('hide')
  })

// compare부분 랜더링

const items = document.querySelector('section.compare .items')
ipads.forEach(function (ipad) {
  const item = document.createElement('div')
  item.classList.add('item')
  let colorList = ''
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color}"></li>`
  })
  item.innerHTML = /*html*/`
  <div class="thumbnail">
    <img src="${ipad.thumbnail}" alt="${ipad.name}" />
  </div>
  <ul class="colors">
  ${colorList}
  </ul>
  <h3 class="name">${ipad.name}</h3>
  <p class="tagline">${ipad.tagline}</P>
  <p class="price">₩${ipad.price.toLocaleString()}부터</P>
  <button class="btn">구입하기</button>
  <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  items.append(item);
})

const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function (nav) {
  const map = document.createElement('div')
  map.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function (map) {
    mapList +=/*html*/ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })
  map.innerHTML = /*html*/`
  <h3>
    <span class="text">${nav.title}</span>
  </h3>
  <ul>
    ${mapList}
  </ul>
  `
  navigationsEl.append(map)
})

const year = document.querySelector('.this-year')
year.innerHTML = new Date().getFullYear();