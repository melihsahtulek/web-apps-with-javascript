window.addEventListener("load", (e) => {
  const itemsContainer = document.querySelectorAll(".itemsContainer")[0];
  const catUl = document.querySelectorAll(".catUl")[0];

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((productJsonData) => {
      productJsonData.forEach((product) => {
        let shortTitle = "";
        for (let i = 0; i < 4; i++) {
          shortTitle += product.title.split(" ")[i] + " ";
        }
        shortTitle += "...";
        itemsContainer.innerHTML += `
        <div class="item">
          <div class="item_center">
            <img src=${product.image} alt="" />
            <div class="item_center_detail">
              <h4>${shortTitle}</h4>
              <span>${product.price} $</span>
            </div>
          </div>
        </div>
        `;
      });
    });

  fetch("https://fakestoreapi.com/products/categories")
    .then((response) => response.json())
    .then((categoriesJsonData) => {
      categoriesJsonData.forEach((category) => {
        catUl.innerHTML += `
        <li>
          <a href="#">${category}</a>
        </li>
      `;
      });
    });

  let miliSecond = Math.round(e.timeStamp.toFixed(1));
  let msControl = 0;
  let counter = -10;
  const loaderSpan = document.querySelectorAll(".loaderSpan")[0];
  const loader = document.querySelectorAll(".loader")[0];

  const loadTime = setInterval(() => {
    if (parseInt(msControl) > parseInt(miliSecond)) {
      clear();
    } else {
      msControl += miliSecond / 10;
      counter += 10;
      loaderSpan.textContent = `%${counter}`;
    }
  }, miliSecond / 10);

  const clear = () => {
    clearInterval(loadTime);
    loader.style.display = "none";
    document.body.style.overflowY = "scroll";
  };

  const openMenu = document.querySelector("#openMenu");
  const nav = document.querySelector("#nav");
  let menuIsOpen = false;

  openMenu.addEventListener("click", () => {
    if (menuIsOpen) {
      nav.style.display = "none";
      menuIsOpen = !menuIsOpen;
    } else {
      nav.style.display = "block";
      menuIsOpen = !menuIsOpen;
    }
  });

  const next = document.querySelectorAll(".next")[0];
  const previous = document.querySelectorAll(".previous")[0];
  const images = document.querySelectorAll(".images");
  let imagesLength = images.length;
  let index = 0;
  next.addEventListener("click", () => {
    if (index < imagesLength - 1) {
      previous.style.backgroundColor = "#fff";
      previous.style.color = "#222";
      index++;
      images[index - 1].style.left = `${index * -100}%`;
      images[index].style.left = `${index * -100}%`;
      if (index !== imagesLength - 1) {
        images[index + 1].style.left = `${index * -100}%`;
      } else {
        next.style.backgroundColor = "#222";
        next.style.color = "#eee";
      }
    } else {
      return false;
    }
  });

  previous.addEventListener("click", () => {
    if (index > 0) {
      next.style.backgroundColor = "#fff";
      next.style.color = "#222";
      index--;
      images[index + 1].style.left = `${index * -100}%`;
      images[index].style.left = `${index * -100}%`;
      if (index !== 0) {
        images[index - 1].style.left = `${index * -100}%`;
      } else {
        previous.style.backgroundColor = "#222";
        previous.style.color = "#eee";
      }
    } else {
      return false;
    }
  });
});
