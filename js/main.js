var navLinks = document.querySelectorAll('header nav a');

let containerWidth = document.querySelector('.container').clientWidth;
let windowWidth = window.innerWidth;
// Отслеживание изменений размеров окна браузера с помощью события "resize"
window.addEventListener("resize", function () {
  windowWidth = window.innerWidth;
}, false);


var splide = new Splide('#slider', {
  type: 'loop',
  perPage: 1,
  speed: 1500,
  gap: (windowWidth - containerWidth) / 2,
});
splide.on('overflow', function (isOverflow) {
  // Reset the carousel position
  splide.go(0);

  splide.options = {
    arrows: isOverflow,
    pagination: isOverflow,
    drag: isOverflow,
    clones: isOverflow ? undefined : 0, // Toggle clones
  };
});

splide.mount();

// Обрабатываем событие нажатия на ссылку в навигации
navLinks.forEach(function (link, index) {
  link.addEventListener('click', function (event) {
    event.preventDefault(); // Предотвращаем переход по ссылке

    // Перемещаем слайдер к соответствующему слайду
    splide.go(index);
  });
});

// switch themes

const body = document.querySelector('body');
const btnSwitch = document.querySelector('.header-line__switch-themes');
const icon = document.querySelector('.header-line__switch-themes__icon');

function store(value) {
  localStorage.setItem('lightmode', value);
}

function load() {
  const lightmode = localStorage.getItem('lightmode');

  if (!lightmode) {
    store(false);
    icon.classList.add('fa-moon');
  } else if (lightmode == 'true') {
    body.classList.add('lightmode');
    icon.classList.add('fa-sun');
  } else if (lightmode == 'false') {
    icon.classList.add('fa-moon');
  }
}

load();

btnSwitch.addEventListener('click', () => {

  body.classList.toggle('lightmode');
  icon.classList.add('animated');

  store(body.classList.contains('lightmode'));

  if (body.classList.contains('lightmode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }

  setTimeout(() => {
    icon.classList.remove('animated');
  }, 500)
})

// fixed navbar

window.addEventListener('scroll', function () {
  var nav = document.querySelector('header nav');
  nav.classList.toggle('fixed', window.scrollY > 620);
  if (this.window.innerHeight <= 500) {
    nav.classList.toggle('fixed', window.scrollY > 400);
  }
  if (this.window.innerHeight <= 850) {
    nav.classList.toggle('fixed', window.scrollY > 350);
    if (this.window.innerWidth <= 900) {
      nav.classList.toggle('fixed', window.scrollY > 60);
    }
  }
})

let buttonsSpecificationsArray = Array.from(document.querySelectorAll('.device__button'));
let buttonsBackArray = Array.from(document.querySelectorAll('.back-device__button'));
let devicesArray = Array.from(document.querySelectorAll('.device'));
let specificationsArray = Array.from(document.querySelectorAll('.specifications'));

buttonsSpecificationsArray.forEach((button, indexButton) => {
  button.addEventListener('click', function (event) {
    if (event.target === button) {
      devicesArray[indexButton].classList.add('none');
      specificationsArray[indexButton].classList.remove('none');
    }
  })
})
buttonsBackArray.forEach((button, indexButton) => {
  button.addEventListener('click', function (event) {
    if (event.target === button) {
      devicesArray[indexButton].classList.remove('none');
      specificationsArray[indexButton].classList.add('none');
    }
  })
})
