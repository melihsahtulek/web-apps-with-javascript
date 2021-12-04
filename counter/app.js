window.addEventListener("load", () => {
  document.querySelector(".decrease").addEventListener("click", () => decreaseTheCounter());
  document.querySelector(".reset").addEventListener("click", () => resetTheCounter());
  document.querySelector(".increase").addEventListener("click", () => increaseTheCounter());
  const count = document.querySelector(".count");
  let n = 0;

  const decreaseTheCounter = () => {
    n++;
    count.textContent = n;
    if (n > 0) {
      removeAndAdd("green");
    }

    if (n == 0) {
      removeAndAdd("black");
    }
  };
  const resetTheCounter = () => {
    n = 0;
    count.textContent = n;
    if (n == 0) {
      removeAndAdd("black");
    }
  };

  const increaseTheCounter = () => {
    n--;
    count.textContent = n;
    if (n < 0) {
      removeAndAdd("red");
    }

    if (n == 0) {
      removeAndAdd("black");
    }
  };

  const removeAndAdd = (className) => {
    for (const attrValue of count.classList) {
      // the "count" another class
      if (attrValue !== "count") {
        count.classList.remove(attrValue);
        count.classList.add(className);
      }
    }
  };
});
