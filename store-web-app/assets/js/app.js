const base = "/vanilla-js/fake-store-api-web/";
document.querySelector("h1").addEventListener("click", () => (window.location.href = window.location.origin + base));

document.querySelector(".basketItems").style.height = `${
  document.querySelector(".basketSideNav").clientHeight - document.querySelector(".checkoutArea").clientHeight - 70
}px`;

window.addEventListener("resize", () => {
  document.querySelector(".basketItems").style.height = `${
    document.querySelector(".basketSideNav").clientHeight - document.querySelector(".checkoutArea").clientHeight - 70
  }px`;
});

/* GET DATA FROM API */

const getAllProduct = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const json = await response.json();
  localStorage.setItem("products", JSON.stringify(json));
};

getAllProduct();

/* BASKET DISPLAY */
const basketBtn = document.querySelector(".basketBtn");
const basketSideNav = document.querySelector(".basketSideNav");
const blackScreen = document.querySelector(".blackScreen");
const closeBasket = document.querySelector(".closeBasket");

basketBtn.addEventListener("click", () => {
  basketSideNav.style.transform = "translateX(0)";
  basketSideNav.style.transition = "all .5s";
  blackScreen.style.display = "block";
  bodyLock();
});

closeBasket.addEventListener("click", () => {
  basketSideNav.style.transform = "translateX(100%)";
  basketSideNav.style.transition = "all .5s";
  blackScreen.style.display = "none";
  bodyUnlock();
});

const bodyLock = () => {
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.left = "0";
  document.body.style.right = "0";
};

const bodyUnlock = () => {
  document.body.style.overflow = "auto";
  document.body.style.position = "static";
};

/* BOTTOM MAIN MENU FOR MOBILE */

const mobileMainMenuBtn = document.querySelector(".mobileMainMenuBtn");
const mobileBottomMenuTopScreen = document.querySelector(".mobileBottomMenuTopScreen");
const mobileMainMenuCloseBtn = document.querySelector(".mobileMainMenuCloseBtn");
const mobileNav = document.querySelector(".mobileNav");
const mobileMainMenuSearchBtn = document.querySelector(".mobileMainMenuSearchBtn");
const headerTop = document.querySelector(".headerTop");
const searchInp = document.querySelector(".searchInp");

mobileMainMenuBtn.addEventListener("click", () => {
  mobileBottomMenuTopScreen.style.display = "block";
  bodyLock();
});

mobileMainMenuCloseBtn.addEventListener("click", () => {
  mobileBottomMenuTopScreen.style.display = "none";
  bodyUnlock();
  window.location.href = window.location.origin + base;
});

for (const a of mobileNav.children) {
  a.addEventListener("click", () => {
    mobileBottomMenuTopScreen.style.display = "none";
    bodyUnlock();
  });
}

mobileMainMenuSearchBtn.addEventListener("click", () => {
  mobileBottomMenuTopScreen.style.display = "none";
  bodyUnlock();
  if (headerTop.getAttribute("data-openSearchInp") == "false") {
    headerTop.style.display = "flex";
    searchInp.focus();
    headerTop.setAttribute("data-openSearchInp", "true");
  } else {
    headerTop.style.display = "none";
    headerTop.setAttribute("data-openSearchInp", "false");
    searchInp.value = null;
  }
});

/* SEARCH DISPLAY */
const resultList = document.querySelector(".resultList");
const resultListUl = document.querySelector(".resultList").children[0];
const noResult = document.querySelector(".noResult");

searchInp.addEventListener("keyup", (e) => {
  resultList.style.display = "flex";
  resultListUl.innerHTML = null;
  noResult.style.display = "none";
  JSON.parse(localStorage.getItem("products")).forEach((product) => {
    if (
      product.title.toLocaleLowerCase("en-US").includes(e.target.value.toLocaleLowerCase("en-US")) &&
      e.target.value.trim().length > 0
    ) {
      noResult.style.display = "none";
      resultListUl.innerHTML += `
        <li>
          <a href=product-detail.html?id=${product.id}>${product.title}</a>
        </li>
      `;
    } else {
      if (e.target.value.trim().length > 0 && resultListUl.children.length == 0) {
        noResult.style.display = "flex";
      }
    }
  });
});

document.addEventListener("click", (e) => {
  if (e.target.parentElement.className !== "search") {
    resultList.style.display = "none";
  }
});

/* WRITE PRODUCTS FOR HOME PAGE */
if (window.location.pathname == base) {
  const allProducts = document.querySelector(".allProducts");
  JSON.parse(localStorage.getItem("products")).forEach((product) => {
    allProducts.innerHTML += `
  <a href=product-detail.html?id=${product.id} class="productCard">
      <div class="cardImage">
        <img src=${product.image} alt="" />
      </div>
      <div class="cardTitle">
        <h4>${product.title}</h4>
      </div>
      <div class="cardPrice">
        <h4>$${product.price}</h4>
      </div>
  </a>`;
  });
}

if (window.location.pathname.includes("product-detail.html")) {
  JSON.parse(localStorage.getItem("products")).forEach((product) => {
    if (product.id == new URLSearchParams(window.location.search).get("id")) {
      const productDetail = document.querySelector(".productDetail");
      productDetail.innerHTML = `
      <div class="left">
        <img src=${product.image} id="detailImage" alt=${product.title} />
      </div>
      <div class="right">
        <h4>${product.title}</h4>
        <p>${product.description}</p>
        <a href="javascript:void(0)">${product.category}</a>
        <h5>$${product.price}</h5>
        <button type="button" id="addToBasket" data-id=${product.id}> <span class="material-icons">add_shopping_cart</span> add to basket </button>
      </div>
      `;
    }
  });
}

if (!localStorage.getItem("basket")) {
  localStorage.setItem("basket", JSON.stringify([]));
}

let myBasket = JSON.parse(localStorage.getItem("basket"));
const container = document.querySelector(".basketItems");
const addBtn = document.querySelector("#addToBasket");
addBtn?.addEventListener("click", () => {
  let controlArr = myBasket.filter((basketElem) => basketElem.id == addBtn.getAttribute("data-id"));

  if (controlArr.length == 0) {
    JSON.parse(localStorage.getItem("products")).forEach((product) => {
      if (product.id == addBtn.getAttribute("data-id")) {
        myBasket.push({
          ...product,
          quantity: 1,
        });
      }
    });
  } else {
    controlArr[0].quantity = controlArr[0].quantity + 1;
    myBasket.splice(myBasket.indexOf(controlArr[0]), controlArr[0]);
  }

  localStorage.setItem("basket", JSON.stringify(myBasket));
  checkBasket();
});

if (myBasket.length == 0) {
  container.innerHTML = `
    <div class="emptyBasket">
      <img src="assets/images/empty_cart.svg" alt="" srcset="" />
      <h3>your basket is empty :(</h3>
    </div>
  `;

  document.querySelector("#basketLength").textContent = 0;
  document.querySelector(".checkoutArea").style.display = "none";
}

const checkBasket = () => {
  if (myBasket.length > 0) {
    container.innerHTML = null;
    document.querySelector("#basketLength").textContent = myBasket.length;
    document.querySelector(".checkoutArea").style.display = "flex";
    let total = 0;
    myBasket.forEach((basket__elem) => {
      container.innerHTML += `
      <div class="item">
        <div class="itemTop">
          <div class="productImage">
            <img src=${basket__elem.image} alt="" />
          </div>
          <div class="productTitle">
            <h4>${basket__elem.title}</h4>
          </div>
        </div>
        <div class="itemBottom">
          <div class="itemBottomLeft">
            <button type="button"><span class="material-icons increase" data-id=${basket__elem.id}>add</span></button>
            <input type="text" value=${basket__elem.quantity} name="quantity" />
            <button type="button"><span class="material-icons decrease" data-id=${
              basket__elem.id
            }>remove</span></button>
            <button type="button"><span class="material-icons delete" data-id=${basket__elem.id}>delete</span></button>
          </div>
          <div class="itemBottomRight">
            <h4>$${basket__elem.price * basket__elem.quantity}</h4>
          </div>
        </div>
      </div>
      `;

      total += basket__elem.price * basket__elem.quantity;
      document.querySelector(".checkoutArea").children[0].textContent = `$${total}`;
    });

    setBasketItem();
  } else {
    if (myBasket.length == 0) {
      container.innerHTML = `
        <div class="emptyBasket">
          <img src="assets/images/empty_cart.svg" alt="" srcset="" />
          <h3>your basket is empty :(</h3>
        </div>
      `;
      document.querySelector("#basketLength").textContent = myBasket.length;
      document.querySelector(".checkoutArea").style.display = "none";
    }
  }
};

const setBasketItem = () => {
  Array.from(document.querySelectorAll(".increase")).forEach((elem) => {
    elem.addEventListener("click", () => {
      let controlArr = myBasket.filter((basketElem) => basketElem.id == elem.getAttribute("data-id"));
      controlArr[0].quantity = controlArr[0].quantity + 1;
      myBasket.splice(myBasket.indexOf(controlArr[0]), controlArr[0]);
      localStorage.setItem("basket", JSON.stringify(myBasket));
      checkBasket();
    });
  });

  Array.from(document.querySelectorAll(".decrease")).forEach((elem) => {
    elem.addEventListener("click", () => {
      let controlArr = myBasket.filter((basketElem) => basketElem.id == elem.getAttribute("data-id"));
      if (controlArr[0].quantity > 1) {
        controlArr[0].quantity = controlArr[0].quantity - 1;
        myBasket.splice(myBasket.indexOf(controlArr[0]), controlArr[0]);
        localStorage.setItem("basket", JSON.stringify(myBasket));
        checkBasket();
      }
    });
  });

  Array.from(document.querySelectorAll(".delete")).forEach((elem) => {
    elem.addEventListener("click", () => {
      let controlArr = myBasket.filter((basketElem) => basketElem.id == elem.getAttribute("data-id"));
      myBasket.splice(myBasket.indexOf(controlArr[0]), 1);
      localStorage.setItem("basket", JSON.stringify(myBasket));
      checkBasket();
    });
  });
};

checkBasket();

/* category */

const mainMenuNav = document.querySelector(".mainMenuNav");
const getCategory = async () => {
  let response = await fetch("https://fakestoreapi.com/products/categories");
  let result = await response.json();

  if (result.length > 0) {
    result.forEach((link) => {
      mobileNav.innerHTML += `
        <a href=javascript:void(0)>${link}</a>
      `;

      if (mainMenuNav) {
        mainMenuNav.innerHTML += `
          <a href=javascript:void(0)>${link}</a>
        `;
      }
    });
  }
};

getCategory();

/* MAIN SLIDER */
const images = document.querySelector(".images");
const back = document.querySelector("#back");
const forward = document.querySelector("#forward");
const maxLen = images.children.length;
let i = 0;

forward.addEventListener("click", () => {
  if (i < maxLen - 1) {
    i++;
    setSlide();
  } else {
    i = 0;
    setSlide();
  }
});

back.addEventListener("click", () => {
  if (i > 0) {
    i--;
    setSlide();
  } else {
    i = maxLen - 1;
    setSlide();
  }
});

const setSlide = () => {
  Array.from(images.children).forEach((img, index) => {
    if (index !== i) {
      img.style.display = "none";
    } else {
      img.style.display = "block";
    }
  });
};

window.addEventListener("resize", () => {
  if (document.body.clientWidth > 1024) {
    setSlide();
  }
});
