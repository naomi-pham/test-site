// Import data
import Data from "./data.js";

const carouselImage = document.getElementById("product-carousel__images");
const carouselThumb = document.getElementById("product-carousel__thumbs");
const carouselBar = document.getElementById("product-carousel__bars");
const productInfo = document.getElementById("product__info");
const selectColor = document.getElementById("select--color");
const selectSize = document.getElementById("select--size");
const productPrevBtn = document.getElementById("product-carousel__prev");
const productNextBtn = document.getElementById("product-carousel__next");
const productPolicies = document.getElementById("product__policy");
const featureList = document.getElementById("feature__list");
const productDescription = document.getElementById("product-description");
const featureBtn = document.getElementById("feature__btn");
const featureToggle = document.getElementById("feature__toggle");
const headerSelectColor = document.getElementById(
  "product-header__select--colors"
);
const headerSelectSize = document.getElementById(
  "product-header__select--sizes"
);

// API fetching

fetch(
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clcihiujg363701uf954l4vv4/master",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
        query Posts {
          posts {
            title
            price
            action
            discount
            colors {
              ... on ColorOption {
                id
                label
                image {
                  id
                  url
                }
              }
            }
            sizes {
              size
            }
            productImage {
              id 
              url
            }
            productPolicy {
              ... on Policy {
                id
                label
                icon {
                  id
                  url
                }
              }
            }
            feature {
              html
            }
            content {
              html
            }
          }
        }
          `,
    }),
  }
)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data.data.posts[0].productImage);

    const {
      title,
      productImage,
      price,
      action,
      colors,
      sizes,
      productPolicy,
      feature,
      content,
    } = data.data.posts[0];

    // Product Carousel
    carouselImage.innerHTML = productImage
      .map((image) => {
        return `<img src=${image.url} alt="" class="product-carousel__image">`;
      })
      .join("");

    carouselThumb.innerHTML = productImage
      .map((image) => {
        return `<img src=${image.url} alt="" class="product-carousel__thumb">`;
      })
      .join("");

    carouselBar.innerHTML = Array.from({ length: productImage.length })
      .map((dot) => {
        return `<div class="product-carousel__bar"></div>`;
      })
      .join(" ");

    // Product Info
    productInfo.innerHTML = `<h2 class="product-info__title">${title}</h2>
      <p class="product-info__price">${price}</p>
      <div class="product-info__action">${action}</div>`;

    // Product Colors
    selectColor.innerHTML = colors
      .map((color) => {
        const { id, label, image } = color;
        return `<div class="select__item">
                  <input id=${id} type="radio" name="color" value=${label} />
                  <label for=${id} class="checkmark checkmark--color" style="background-image: url(${image[0].url})"></label> 
                </div>`;
      })
      .join("");

    // Product Sizes
    selectSize.innerHTML = sizes[0].size
      .map((size) => {
        return `<div class="select__item">
                  <input id=${size} type="radio" name="sizes" value=${size} />
                  <label for=${size} class="chip">${size}</label>
              </div>`;
      })
      .join("");

    // Product Policy
    productPolicies.innerHTML = productPolicy
      .map((policy) => {
        return `<div class="policy__item flex-group">
                <span><img src=${policy.icon.url} /></span>
                ${policy.label}
              </div>`;
      })
      .join("");

    // Product Features
    featureList.innerHTML = feature.html;

    // Product Description
    productDescription.innerHTML = content.html;

    // Product Header
    headerSelectColor.innerHTML = colors
      .map((color) => {
        const { id, label, image } = color;
        return `<div class="select__item select__item--within-header">
                  <input id=${id} type="radio" name="color" value=${label} />
                  <label for=${id} class="checkmark checkmark--color" style="background-image: url(${image[0].url})"></label> 
                </div>`;
      })
      .join("");

    headerSelectSize.innerHTML = sizes[0].size
      .map((size) => {
        return `<div class="select__item select__item--within-header">
                      <input id=${size} type="radio" name="sizes" value=${size} />
                      <label for=${size} class="chip">${size}</label>
                  </div>`;
      })
      .join("");
  });

let slidePosition = 0;
let totalSlides = 6;
let carouselWidth = carouselImage.getBoundingClientRect().width;
console.log(carouselWidth);

productPrevBtn.addEventListener("click", moveToPrevSlide);
productNextBtn.addEventListener("click", moveToNextSlide);

function hideAllSlide() {
  for (let i = 0; i < totalSlides; i++) {
    carouselThumb.children[i].classList.remove("is-visible");
    carouselBar.children[i].classList.remove("is-visible");
  }
}

function makeVisible(position) {
  carouselThumb.children[position].classList.add("is-visible");
  carouselBar.children[position].classList.add("is-visible");
}

function moveToPrevSlide() {
  hideAllSlide();
  slidePosition === 0
    ? (slidePosition = totalSlides - 1)
    : (slidePosition -= 1);
  carouselImage.style.transform = `translate3d(-${
    carouselWidth * slidePosition
  }px, 0px, 0px)`;
  makeVisible(slidePosition);
}

function moveToNextSlide() {
  hideAllSlide();
  slidePosition === totalSlides - 1
    ? (slidePosition = 0)
    : (slidePosition += 1);
  carouselImage.style.transform = `translate3d(-${
    carouselWidth * slidePosition
  }px, 0px, 0px)`;
  makeVisible(slidePosition);
}

// for (let i = 0; i < totalSlides; i++) {
//   console.log(carouselThumb.children[i]);
//   carouselThumb.children[i].addEventListener("click", getImage);
// }

// for (let i = 0; i < totalSlides; i++) {
//   carouselBar.children[i].addEventListener("click", getImage);
// }

// function getImage(e) {
//   let tabNumber = e.target.dataset.tab;
//   console.log(tabNumber);
//   hideAllSlide();
//   makeVisible(tabNumber);
// }

// Feature Toggle Open Btn
featureToggle.addEventListener("click", () => {
  if (featureBtn.classList.contains("ri-close-line")) {
    featureBtn.classList.replace("ri-close-line", "ri-add-line");
  } else {
    featureBtn.classList.replace("ri-add-line", "ri-close-line");
  }
  featureList.classList.toggle("block");
});

// Product Header
let lastScrollTop = 500;
let productHeader = document.getElementById("product-header");

window.addEventListener("scroll", function () {
  console.log("scroll");
  let scrollTop = window.pageYOffset;
  if (scrollTop < lastScrollTop) {
    productHeader.classList.add("is-scroll-top");
  } else {
    productHeader.classList.remove("is-scroll-top");
  }
});
