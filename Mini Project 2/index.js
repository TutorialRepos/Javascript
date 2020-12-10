const container = document.querySelector(".listOfData");
const pick = document.querySelector("#category");
const finder = document.querySelector("#finder");
const intro = document.querySelector("#intro");
const mainLoader = document.querySelector("#mainLoader");
const calendar = document.querySelector("#calendar");
const errorMessage = document.querySelector(".error");
const errorBlob = document.querySelector(".error");
const about = document.querySelector("#aboutS");
const search = document.querySelector("#searchS");

const sectionAbout = document.querySelector("#aboutSection");
const sectionSearch = document.querySelector("#searchSection");

about.addEventListener("click", aboutSection);
search.addEventListener("click", searchSection);

const pageID = "MP2 index";

finder.addEventListener("click", renderData);
finder.addEventListener("search", renderData);
finder.addEventListener("keyup", renderData);

finder.addEventListener("load", targetArticles);
finder.addEventListener("click", targetArticles);

window.addEventListener("load", renderData);

const data = [];
const errors = {};
errors.loading = [];
errors.renderData = [];
errors.check_for_error_load = false;
const session = {};

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function readResponseAsJson(response) {
  return response.json();
}

function constructError(group, location, message) {
  if (group === "loading") {
    loadingErrorOn();
  }
  errors[group].push(`${location} ${message}`);
  return errors;
}

function loadingErrorOn() {
  errors["check_for_error_load"] = true;
  return errors;
}

function errorOnLoad(response) {
  if (response.check_for_error_load) {
    return (intro.innerHTML = "Failed to load data, please refresh");
  }
}

function fetchJSON(url, error) {
  return fetch(url)
    .then(validateResponse)
    .then(readResponseAsJson)
    .catch((err) => constructError("loading", error, err.message))
    .catch(errorOnLoad);
}

const starships = fetchJSON(
  "https://swapi.dev/api/starships/",
  `${pageID} starship fetch index 57`
);
const planets = fetchJSON(
  "https://swapi.dev/api/planets/",
  `${pageID} planets fetch index 58`
);
const people = fetchJSON(
  "https://swapi.dev/api/people/",
  `${pageID} people fetch index 59`
);

Promise.all([starships, planets, people])
  .then((values) => {
    if (!errors.check_for_error_load) {
      intro.innerHTML = "Data is ready, have a nice day.";
      mainLoader.remove();
      return data.push(...values);
    } else {
      mainLoader.remove();
      intro.innerHTML = "Please check connection and reload";
    }
  })
  .catch((err) => err);

function findMatches(findMe, data) {
  return data[pick.value].results.filter((values) => {
    const regx = new RegExp(findMe, "gi");
    return values.name.match(regx);
  });
}

function renderData() {
  try {
    let matches = findMatches(this.value, data);
    const item = matches
      .map((value, index) => {
        const regx = new RegExp(this.value, "gi");
        const name = value.name.replace(
          regx,
          `
        <span class='hl'>${this.value}</span>
      `
        );
        const keys = additionalInfo(matches, index);
        return `
      <article class="details" style="height: 60px;">
        <h4>${name}</h4>
        <ul style="overflow: hidden;">
          ${keys}
        </ul>
      </article>
      `;
      })
      .join(" ");
    container.innerHTML = item;
    targetArticles();
  } catch (err) {
    if (err instanceof TypeError) {
      constructError("renderData", `${pageID} renderData 96 `, err);
    }
  }
}

function targetArticles() {
  const a = document.querySelectorAll("article");
  a.forEach((one) => {
    return one.addEventListener("click", target);
  });
}

function target() {
  let detail = this.querySelector("ul");
  let change = this.style;
  let details = detail.style;
  let changes =
    change.height === "60px"
      ? (change.height = "450px")
      : (change.height = "60px");
  changes =
    details.overflow === "hidden"
      ? (details.overflow = "auto")
      : (details.overflow = "hidden");
  changes =
    change.display === "block"
      ? (change.overflow = "none")
      : (change.overflow = "block");
  return changes;
}

function additionalInfo(data, index) {
  const keyList = Object.keys(data[index]);
  const display = keyList
    .map((values) => {
      if (values === "created" || values === "edited") {
        data[index][values] = shortenDateString(data[index][values]);
      }
      if (Array.isArray(data[index][values])) {
        data[index][values] = arrayToHtml(data[index][values]);
      }
      if (values !== "name") {
        return `<li>${values}: ${data[index][values].toUpperCase()}</li>`;
      }
    })
    .join("");
  return display;
}

function arrayToHtml(arr) {
  if (typeof arr == "string") return arr;
  return arr
    .map((entry) => {
      return `<li>${entry}</li>`;
    })
    .join(" ");
}

function shortenDateString(str) {
  return str.slice(0, 10);
}

function searchSection() {
  sectionSearch.style.display = "block";
  sectionAbout.style.display = "none";
}

function aboutSection() {
  sectionSearch.style.display = "none";
  sectionAbout.style.display = "block";
}

function toggleSection() {
  if (sectionSearch.style.display === "block") {
    sectionSearch.style.display = "none";
    sectionAbout.style.display = "block";
  } else {
    sectionSearch.style.display = "block";
    sectionAbout.style.display = "none";
  }
}

renderData();