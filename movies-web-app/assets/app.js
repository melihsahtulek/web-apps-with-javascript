window.addEventListener("load", () => {
  const api_key = "3b2aec24"; // your api_key is here. please readme file. thanks
  const form = document.forms.item("searchForm");
  const dataContainer = document.querySelector("#dataContainer");
  const totalResult = document.querySelector("#totalResult");
  let currentPage = 1;
  const addNextPage = document.querySelector("#addNextPage");
  const loading = document.querySelector(".loading");

  form.addEventListener("submit", (e) => {
    let query = form.elements.item("searchInp").value.trim();
    if (query.length > 0) {
      if (api_key == "") {
        alert("please read Readme file for api_key");
      } else {
        loading.style.display = "flex";
        dataContainer.innerHTML = null;
        const call = async () => {
          let search = await fetch(`http://www.omdbapi.com/?apikey=${api_key}&s=${query}&page=${currentPage}`);
          let searchJson = await search.json();
          totalResult.style.background = "#16a085";
          totalResult.innerHTML = `${searchJson.totalResults} data found`;
          totalResult.style.display = "block";

          if (searchJson.Response == "True") {
            let { Search } = searchJson;
            const callDetail = () => {
              Search.forEach(async (data) => {
                let response = await fetch(
                  `http://www.omdbapi.com/?apikey=${api_key}&i=${data.imdbID}&plot=full&type=movie`
                );
                let result = await response.json();
                dataContainer.innerHTML += `
                  <div class="card">
                    <div class="cardTop">
                      <div class="cardTopLeft">
                        <img
                          src=${result.Poster}
                          alt=${result.Title}
                        />
                      </div>
                      <div class="cardTopRight">
                        <ul>
                          <li><h2>${result.Title}</h2></li>
                          <li>
                            <span class="material-icons">star</span>
                            <span>${result.imdbRating}</span>
                          </li>
                          <li>
                            <a href=https://www.imdb.com/title/${result.imdbID} target="_blank"><span class="material-icons">link</span>imdb page</a>
                          </li>
                          <li><span class="material-icons">schedule</span><span>${result.Released}</span></li>
                          <li><span class="material-icons">live_tv</span><span>${result.Type}</span></li>
                          <li><span class="material-icons">timer</span><span>${result.Runtime}</span></li>
                          <li>
                            <span class="material-icons">visibility</span>
                            <span>${result.Genre}</span>
                          </li>
                          <li>
                            <span class="material-icons">create</span>
                            <span>${result.Writer}</span>
                          </li>
                          <li>
                            <span class="material-icons">videocam</span>
                            <span>${result.Director}</span>
                          </li>
                          <li>
                            <span class="material-icons">language</span>
                            <span>${result.Language}</span>
                          </li>
                          <li>
                            <span class="material-icons">flag</span>
                            <span>${result.Country}</span>
                          </li>
                          <li>
                            <span class="material-icons">emoji_events</span>
                            <span>${result.Awards}</span>
                          </li>
                          <li>
                            <span class="material-icons">business</span>
                            <span>${result.Production}</span>
                          </li>
                          <li>
                            <span class="material-icons">recent_actors</span>
                            <span>${result.Actors}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="cardBottom">
                      <p>
                      ${result.Plot}
                      </p>
                    </div>
                  </div>
                `;
              });

              loading.style.display = "none";
              form.elements.item("searchInp").value = "";
            };

            callDetail();
          } else {
            addNextPage.style.display = "none";
            loading.style.display = "none";
            totalResult.style.background = "#eb2739";
            totalResult.innerHTML = `no data found`;
          }
        };

        addNextPage.style.display = "flex";

        addNextPage.addEventListener("click", () => {
          currentPage++;
          call();
        });

        call();
      }
    }
  });
});
