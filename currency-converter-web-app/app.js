window.addEventListener("load", () => {
  const getTypes = async () => {
    const response = await fetch("https://api.exchangerate.host/latest?symbols=USD,EUR,TRY,GBP");

    if (response.ok) {
      const { rates } = await response.json();
      writeTypes(rates);
    } else {
      alert("server error... , sorry");
      return false;
    }
  };
  const writeTypes = (rates) => {
    const items = document.querySelectorAll(".items");
    Array.from(items).forEach((element) => {
      element.style.display = "none";
    });

    for (const key in rates) {
      Array.from(items).forEach((item) => {
        item.innerHTML += `<div class="item" data-key=${key}>${key}</div>`;
      });
    }

    open(items);
  };

  const open = (items) => {
    const dropdownTitle = document.querySelectorAll(".dropdownTitle");

    Array.from(dropdownTitle).forEach((item, index) => {
      item.addEventListener("click", () => {
        let control = items[index].getAttribute("data-isopen") == "true" ? true : false;
        if (control) {
          items[index].style.display = "none";
          items[index].setAttribute("data-isopen", "false");
        } else {
          items[index].style.display = "block";
          items[index].setAttribute("data-isopen", "true");
        }
      });
    });

    selectType(items, dropdownTitle);
  };

  let selected = ["", ""];
  const selectType = (items, dropdownTitle) => {
    Array.from(items).forEach((elem, index) => {
      Array.from(elem.children).forEach((element) => {
        element.addEventListener("click", () => {
          selected[index] = element.getAttribute("data-key");
          dropdownTitle[
            index
          ].children[0].innerHTML = `${selected[index]}<span class="material-icons">expand_more</span>`;
          items[index].style.display = "none";
          items[index].setAttribute("data-isopen", "false");
        });
      });
    });
  };

  const convert = document.querySelector("#convert");
  const clear = document.querySelector("#clear");
  const amount = document.querySelector("#amount");
  const small = document.querySelector("#small");

  convert.addEventListener("click", async () => {
    if (selected[0] === "" || selected[1] === "") {
      return false;
    } else {
      const response = await fetch(
        `https://api.exchangerate.host/latest?base=${selected[0]}&symbols=USD,EUR,TRY,GBP&amount=${parseInt(
          parseInt(amount.value) < 1 ? 1 : parseInt(amount.value)
        )}`
      );
      const { rates } = await response.json();
      small.innerHTML = `${amount.value} ${selected[0]} = `;
      amount.value = rates[selected[1]];
      small.innerHTML += `${rates[selected[1]]} ${selected[1]}`;
    }
  });

  clear.addEventListener("click", () => location.reload());

  getTypes();
});
