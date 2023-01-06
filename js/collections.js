import Data from "./data.js";

// Collection Filter
let collectionsFilterHTML = Data.collectionsItems.map((data) => {
  return `<img
            class="collections__category-image"
            src=${data.image}
            alt=""
            data-listing=${data.listing}
            data-name=${data.name}
          />
          `;
});

document.getElementById("collections__filter").innerHTML =
  collectionsFilterHTML.join("");

// Collection Listings
const collectionListings = document.querySelectorAll(
  ".collections__listings-grid"
);

for (let i = 0; i < collectionListings.length; i++) {
  collectionListings[i].innerHTML = Data.collectionsItems[i].productItems
    .map((data) => {
      return `<div class="product-grid-item collections__listings-content">
                <div class="product-grid__thumbnail">
                  <img src=${data.images[0]} alt="" />
                  <img
                    class="product-grid__image"
                    src=${data.images[1]}
                    alt=""
                  />
                  <div class="product-grid__reviews">
                    <div class="review-rating">
                    ${
                      data.ratingStar &&
                      `<div class="review-rating__start">
                        ${data.ratingStar}
                          <span>
                            <i class="ri-star-s-fill"></i>
                          </span>
                      </div>`
                    }
                      <div class="review-rating__number">
                        ${data.ratingNumber}
                      </div>
                    </div>
                  </div>
                  <div class="product-grid__select">
                    <div class="select">
                      ${
                        data.select &&
                        data.select
                          .map((option) => {
                            return `<div class="select__option">${option}</div>`;
                          })
                          .join("")
                      }
                    </div>
                  </div>        
                </div>
                <div class="product-grid__content">
                    <h4 class="product-grid__title">
                      ${data.title}
                    </h4>
                    <p class="product-grid-price">
                      ${data.price}
                    <p>
                    ${
                      data.action &&
                      `<button class="product-grid-action">
                        ${data.action}
                      </button>`
                    }
                  </div>
              </div>
              `;
    })
    .join("");
}

// Change tabs
const categoryLinks = document.querySelectorAll(".collections__category-image");
const categoryListings = document.querySelectorAll(".collections__listings");

for (let i = 0; i < categoryLinks.length; i++) {
  categoryLinks[i].addEventListener("click", openListing);
}

function openListing(e) {
  let listing = e.target.dataset.listing;
  let listingName = e.target.dataset.name;
  console.log(listingName);

  for (let i = 0; i < categoryLinks.length; i++) {
    categoryLinks[i].classList.remove("is-active");
  }

  for (let i = 0; i < categoryListings.length; i++) {
    categoryListings[i].classList.remove("is-visible");
  }

  document.querySelector("#" + listing).classList.add("is-visible");
  document
    .querySelector(`[data-listing=${listing}]`)
    .classList.add("is-active");

  tagName.textContent = `${listingName}`;
}

// Collections Tags

const tagName = document.getElementById("collections__tags-name");
