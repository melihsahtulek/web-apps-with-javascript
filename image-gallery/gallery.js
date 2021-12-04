window.addEventListener("load", () => {
  const images = document.querySelector(".images").children;
  const bigImageTag = document.querySelector(".bigImageTag");
  const modal = document.querySelector(".zoomModal");
  const closeBtn = document.querySelector(".closeBtn");
  const nextBtn = document.querySelector(".nextBtn");
  const prevBtn = document.querySelector(".prevBtn");
  let index = 0;
  let modalIsOpen = false;

  const init = () => {
    modal.style.height = `${window.innerHeight}px`;
    modal.style.top = `-${window.innerHeight}px`;

    Array.from(images).forEach((img, key) => {
      img.addEventListener("click", () => {
        modalIsOpen = true;
        index = key;
        let currentSrc = img.children[0].getAttribute("src");
        bigImageTag.src = currentSrc;
        modal.style.top = `${window.pageYOffset}px`;

        if (modalIsOpen) {
          document.body.classList.add("bodyLock");
        }
      });
    });

    nextBtn.addEventListener("click", () => {
      if (index < images.length - 1) {
        index++;
      } else {
        index = 0;
      }
      let currentSrc = images[index].children[0].getAttribute("src");
      bigImageTag.src = currentSrc;
    });

    prevBtn.addEventListener("click", () => {
      if (index > 0) {
        index--;
      } else {
        index = images.length - 1;
      }
      let currentSrc = images[index].children[0].getAttribute("src");
      bigImageTag.src = currentSrc;
    });

    closeBtn.addEventListener("click", () => {
      modal.style.top = `-${window.innerHeight}px`;
      modalIsOpen = false;
      document.body.classList.remove("bodyLock");
    });
  };

  window.addEventListener("resize", () => {
    init();
  });

  init();
});
