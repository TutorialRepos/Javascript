const container = document.querySelector(".listOfData");
const pick = document.querySelector("#category");
const finder = document.querySelector("#finder");
const intro = document.querySelector("#intro");
const mainLoader = document.querySelector("#mainLoader");
const calendar = document.querySelector("#calendar");
const errorMessage = document.querySelector(".error");
const errorBlob = document.querySelector(".error");
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

function constructError(location, message) {
  errors[location] = message;
  errors["check_for_error_load"] = true;
  return;
}

function fetchJson(path) {
  fetch(path).then;
}

const starships = fetch("https://swapi.dev/api/starships/")
  .then(validateResponse)
  .then(readResponseAsJson)
  .catch((err) => {
    errors["fetch"].push(`starships:${pageID} line 45 ${err.message}`);
    errors["check_for_error_on_load"] = true;
  });

const planets = fetch("https://swapi.dev/api/planets/")
  .then(validateResponse)
  .then(readResponseAsJson)
  .catch((err) => {
    errors["fetch"].push(`planets: ${pageID} line 53 ${err.message}`);
    errors["check_for_error_on_load"] = true;
  });

const people = fetch("https://swapi.dev/api/people/")
  .then(validateResponse)
  .then(readResponseAsJson)
  .catch((err) => {
    errors["fetch"].push(`people: ${pageID} line 60 ${err.message}`);
    errors["check_for_error_on_load"] = true;
  });

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
      session["renderData"] = err;
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

function modifyArticles() {
  const detail = this.querySelector(".details");
  detail.classList.toggle("redacted");
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

renderData();
