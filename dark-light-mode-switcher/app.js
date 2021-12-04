window.addEventListener("load", () => {
  const myCheckboxInp = document.querySelector("#my-checkbox");

  const control = () => {
    if (JSON.parse(window.localStorage.getItem("themeMode")).modeStatus == "dark") {
      window.localStorage.setItem("themeMode", JSON.stringify({ modeStatus: "light" }));
      changeTheme("light");
    } else {
      window.localStorage.setItem("themeMode", JSON.stringify({ modeStatus: "dark" }));
      changeTheme("dark");
    }
  };

  const changeTheme = (className) => {
    document.body.setAttribute("class", className);
    if (className == "dark") {
      myCheckboxInp.removeAttribute("checked");
    } else {
      myCheckboxInp.setAttribute("checked", true);
    }
  };

  if (!window.localStorage.getItem("themeMode")) {
    window.localStorage.setItem("themeMode", JSON.stringify({ modeStatus: "dark" }));
    changeTheme(JSON.parse(window.localStorage.getItem("themeMode")).modeStatus);
  } else {
    changeTheme(JSON.parse(window.localStorage.getItem("themeMode")).modeStatus);
  }

  myCheckboxInp.addEventListener("click", (e) => {
    control();
  });
});
