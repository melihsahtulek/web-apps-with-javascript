window.addEventListener("load", () => {
  const get = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/");
      const results = await response.json();
      write(results);
    } catch (error) {
      console.clear();
      err(error);
    }
  };

  const write = (json) => {
    const profileImage = document.querySelector(".profileImage");
    const infoUL = document.querySelector(".infoUL");
    let { results } = json;

    profileImage.children[0].setAttribute("src", "");
    profileImage.children[0].setAttribute("src", results[0].picture.large);

    infoUL.innerHTML = "";

    infoUL.innerHTML += `
      <li>
          <span>${toUpperCaseTitles("name")}</span>
          <span>${results[0].name.title} ${results[0].name.first} ${results[0].name.last}</span>
      </li>
      <li>
          <span>${toUpperCaseTitles("gender")}</span>
          <span>${results[0].gender}</span>
      </li>
      <li>
          <span>${toUpperCaseTitles("email")}</span>
          <span>${results[0].email}</span>
      </li>
      <li>
          <span>${toUpperCaseTitles("birth day & age")}</span>
          <span>${new Date(results[0].dob.date).getDate()}/${new Date(results[0].dob.date).getMonth()}/${new Date(
      results[0].dob.date
    ).getFullYear()} , ${results[0].dob.age}</span>
      </li>
      <li>
          <span>${toUpperCaseTitles("phone")}</span>
          <span>${results[0].phone}</span>
      </li>
      <li>
          <span>${toUpperCaseTitles("location")}</span>
          <span>${results[0].location.city} - ${results[0].location.country}</span>
      </li>
    `;
  };

  const toUpperCaseTitles = (txt) => {
    return `${txt.toUpperCase()}`;
  };

  const err = (err) => {
    const infoUL = document.querySelector(".infoUL");
    infoUL.innerHTML = "";
    infoUL.innerHTML = err;
  };

  const rndBtn = document.querySelector(".rndBtn");

  rndBtn.addEventListener("click", () => {
    get();
  });

  get();
});
