const toggleBtn = document.getElementById("header__toggle");
const mobileNav = document.getElementById("nav-mobile");

const navTabLinks = document.getElementsByClassName(
  "nav-mobile__tabs__header__link"
);
const navTabContent = document.getElementsByClassName(
  "nav-mobile__tabs__content"
);

const tabLinks = document.getElementsByClassName("tabs__header__link");
const tabContent = document.getElementsByClassName("tabs__content");

const paginationBtns = document.getElementsByClassName("pagination-btn");
const paginationgMenu = document.getElementsByClassName("pagination-menu");

let isShown = false;

// Nav Scroll

let lastScrollTop = 100;
let header = document.getElementById("header");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset;
  if (scrollTop > lastScrollTop) {
    header.classList.add("is-scroll-top");
    // header.style.top = "-100px";
  } else {
    header.classList.remove("is-scroll-top");
    // header.style.top = "0px";
  }
});

// Mobile Nav

toggleBtn.addEventListener("click", toggleNav);

function toggleNav() {
  if (!isShown) {
    toggleBtn.innerHTML = `<i class="ri-close-line"></i>`;
    mobileNav.classList.remove("nav-mobile--hidden");
    mobileNav.classList.add("nav-mobile--visible");
    isShown = true;
  } else {
    toggleBtn.innerHTML = `<i class="ri-menu-line"></i>`;
    mobileNav.classList.remove("nav-mobile--visible");
    mobileNav.classList.add("nav-mobile--hidden");
    isShown = false;
  }
}

// Carousel

/* const prev = document.getElementById("carousel__btn__prev");
const next = document.getElementById("carousel__btn__next");
const slider = document.getElementById("carousel__slider");
const slides = document.getElementsByClassName("carousel__slide");

let slideWidth = slider.getBoundingClientRect().width;

let slidePosition = 0;
let totalSlides = document.getElementsByClassName("carousel__slide").length;

next.addEventListener("click", moveToRight);
prev.addEventListener("click", moveToLeft);

function moveToRight() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }
  slider.style.transform = `translate3d(-${
    slideWidth * slidePosition
  }px, 0px, 0px)`;
}

function moveToLeft() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }
  slider.style.transform = `translate3d(-${
    slideWidth * slidePosition
  }px , 0px, 0px)`;
} */

// Nav Tabs

for (let i = 0; i < navTabLinks.length; i++) {
  navTabLinks[i].addEventListener("click", openNavTabs);
}

function openNavTabs(e) {
  let category = e.target.dataset.category;
  console.log(category);

  for (let i = 0; i < navTabLinks.length; i++) {
    navTabLinks[i].classList.remove("nav-mobile__tabs__header__link--active");
  }

  for (let i = 0; i < navTabContent.length; i++) {
    navTabContent[i].classList.remove("nav-mobile__tabs__content--visible");
  }

  document
    .querySelector("#" + category)
    .classList.add("nav-mobile__tabs__content--visible");

  document
    .querySelector(`[data-category=${category}]`)
    .classList.add("nav-mobile__tabs__header__link--active");
}

// Banner Tabs

for (let i = 0; i < tabLinks.length; i++) {
  tabLinks[i].addEventListener("click", openTabs);
}

function openTabs(e) {
  let category = e.target.dataset.category;
  console.log(category);

  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove("tabs__header__link--active");
  }

  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].classList.remove("tabs__content--visible");
  }

  document
    .querySelector("#" + category)
    .classList.add("tabs__content--visible");

  document
    .querySelector(`[data-category=${category}]`)
    .classList.add("tabs__header__link--active");
}

/* Pagination */

for (let i = 0; i < paginationBtns.length; i++) {
  paginationBtns[i].addEventListener("click", openPagination);
}

function openPagination() {
  console.log("Clicked");
}

/* Modal */

const modal = document.getElementById("modal");
const modalBtn = document.getElementById("modal-btn");

if (!localStorage.getItem("ModalShown")) {
  setTimeout(showModal, 3000);
}

// modalBtn.addEventListener("click", hideModal);

function showModal() {
  modal.classList.add("modal--visible");
  modal.style.opacity = "100%";
  modal.parentElement.classList.add("overlay");
  document.getElementsByTagName("body")[0].classList.add("modal-open");
  localStorage.setItem("ModalShown", "true");
}

function hideModal() {
  modal.classList.remove("modal--visible");
  modal.style.opacity = "0%";
  modal.parentElement.classList.remove("overlay");
  document.getElementsByTagName("body")[0].classList.remove("modal-open");
}

/* setTimeout(function () {
  modal.classList.remove("modal--visible");
}, 10000); */
