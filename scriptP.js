'user strict';

//-----selecting elements-----------
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSection = document.querySelectorAll('.section');
// console.log(allSection);

// document.getElementById('section--1');
// const allButns = document.getElementsByTagName('button');
// console.log(allButns);

// console.log(document.getElementsByClassName('btn'));

// ////-----creating and inserting elements-----
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent = 'We use cookies to improve shit';
// message.innerHTML =
//   'We use cookies to improve shit <button class="btn btn--close-cookies"> Got it! </button> ';
// //prepend adds eleement as the first child of selected element
// header.prepend(message);
//append adds element as the lst child
//cant append and prepend the same element. It will just move it.
// header.append(message);
//so to have the same element in two places you need to clone it
//header.append(message.cloneNode(true));
//putting the element before or after elements
// header.before(message);
// header.after(message);

// //-----delete elements
// document
//   .querySelector('.btn--close-cookies')
//   .addEventListener('click', function () {
//     message.remove();
//   });

///--------STYLES--------
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// document.documentElement.style.setProperty('--color-primary', 'violet');

// //-----Attributes------------
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// //change thevalues of attributes
// logo.alt = 'Get the fuck outta here';
// logo.setAttribute('company', 'bankist');

// //data attributes
// console.log(logo.dataset.versionNumber);

// //classes
// logo.classList.add();
// logo.classList.remove();
// logo.classList.toggle();
// logo.classList.contains();

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');
// btnScrollTo.addEventListener('click', function (e) {
//   const sicoords = section1.getBoundingClientRect();
//   console.log(sicoords);
//   //scrolling
//   //   window.scrollTo(
//   //     sicoords.left + window.pageXOffset,
//   //     sicoords.top + window.pageYOffset
//   //   );

//   //   window.scrollTo({
//   //     left: sicoords.left + window.pageXOffset,
//   //     top: sicoords.top + window.pageYOffset,
//   //     behavior: 'smooth',
//   //   });

//   section1.scrollIntoView({ behavior: 'smooth' });
// });

////----Mouse enter event--------
///------removing evnt listeners
// const h1 = document.querySelector('h1');
// const alertH1 = function (e) {
//   alert('addevetn listener: you should get a new career already');
// };
// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alertH1);
// }, 3000);

// // h1.onmouseenter = function (e) {
// //   alert('addevetn listener: you should get a new career already');
// // };

//----EVENT BUBBLING---------
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb( ${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('link', e.target);
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
