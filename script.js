'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//-----------btn scrolling----------------
btnScrollTo.addEventListener('click', function (e) {
  const sicoords = section1.getBoundingClientRect();
  console.log(sicoords);
  //scrolling
  //   window.scrollTo(
  //     sicoords.left + window.pageXOffset,
  //     sicoords.top + window.pageYOffset
  //   );

  //   window.scrollTo({
  //     left: sicoords.left + window.pageXOffset,
  //     top: sicoords.top + window.pageYOffset,
  //     behavior: 'smooth',
  //   });

  section1.scrollIntoView({ behavior: 'smooth' });
});

//------------------PAGE NAVIGATION----------////

//-------Inefficient way--------
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     ///removing the default scrolling of the href#
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
//
//-------efficient WAY-----------
//1. Add event listener to common parent element
//2. determine what element originated event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//------------------Tabbed Components----------////
tabsContainer.addEventListener('click', function (e) {
  //matching strategy
  //this will find the closest parent with the class name we need.
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  //guarding against not clicking a tab in the container
  if (!clicked) return;
  //MAKING THE TABS MOVE UP AND DOWN BASED ON WHICH ONE IS CLICKED
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  //removing content of the tabs
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//------------------Menu fade Animation----------////
//making function to be dry
function handleHover(e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    //this becomes what we are hovering
    const link = e.target;
    //then we go up to the parent and select all of the links
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    //again go to parent and select the logo
    const logo = link.closest('.nav').querySelector('img');
    //loop over all the links
    sibling.forEach(el => {
      //if its not the link thats hovered
      if (el != link) {
        //change all the links opacity
        el.style.opacity = opacity;
      }
    });
    //change logos opacity
    logo.style.opacity = opacity;
  }
}
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

//------------------Sticky Navigation----------////
//new way
// function obsCallback(entires, observer) {
//   entires.forEach(element => {
//     console.log(element);
//   });
// }
// const obsOptions = {
//   root: null,
//   threshold: 0.1,
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
function stickyNav(entries) {
  const entry = entries[0];

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  //null because we wan to observe the entire viewport
  root: null,
  //threshold 0 because once the entire header is out of view we want something to happen
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//old way
//figure out where to start the sticky effect
// const initialCords = section1.getBoundingClientRect();
// console.log(initialCords);

// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

//------------REVEAL ELEMENTS AS SCROLLING-----------------
const allSections = document.querySelectorAll('.section');

function revealSection(entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.19,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//------------LAZY LOADING IMAGES-----------------
const imgTargets = document.querySelectorAll('img[data-src]');

function loadImg(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //replace img src with data src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.19,
});

imgTargets.forEach(img => imgObserver.observe(img));

//------------Slider Images-----------------
function slider() {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let currentSlide = 0;
  const maxSlide = slides.length;
  const dotContainer = document.querySelector('.dots');
  //i is the index, so we are translating them horazontaly either 0%, 100%, 200%. We put it in a function but i think this is a good reference
  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
  ////-------------functions---------------
  function createDots() {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide='${i}'></button>`
      );
    });
  }
  ///-------------------------------------
  function goToSlide(slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  }
  //----------------------------------
  function activateDot(slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }
  //-----------------------------------
  function nextSlide() {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  }
  //-----------------------------------
  function prevSlide() {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    }
    currentSlide--;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  }
  function intit() {
    createDots();
    goToSlide(currentSlide);
    activateDot(0);
  }
  intit();
  ////////////----------event handlers---------------
  //go to next slide
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
}
slider();
