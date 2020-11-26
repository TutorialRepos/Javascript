const finder = document.getElementById('finder')
const pick = document.querySelector('#category')
const container = document.querySelector('.listOfData');

finder.addEventListener('click', renderData);
finder.addEventListener('search', renderData);
finder.addEventListener('keyup', renderData);
pick.addEventListener('change', renderData);

const data = []

  // fetch(createUrl())
  //   .then(blob => blob.json())
  //   .then(data => test.push(...data.results))

const starships = fetch('https://swapi.dev/api/starships/')
    .then(blob => blob.json())
    .catch(err => console.error(err))

const people = fetch('https://swapi.dev/api/people/')
    .then(blob => blob.json())
    .catch(err => console.error(err))

const planets = fetch('https://swapi.dev/api/planets/')
    .then(blob => blob.json())
    .catch(err => console.error(err))

Promise.all([starships, people, planets])
  .then(values => data.push(...values))

// target: use map and filter on data

async function getData(pick){
  try {
      url = pick;
      let res = await fetch(url);
      return await res.json();
  } catch (error) {
      console.error('getData error: ', error)
  }
}

function createUrl(){
  let url = document.querySelector('#category').value
  return `https://swapi.dev/api/${url}/`
}

async function renderData(){
  try {
  const url = createUrl();
  const blob = await getData(url)
  const found = new RegExp(this.value, 'gi')
  const data = blob.results.filter(one => one.name.match(found))
  let html = '';
  data.forEach(one => {
      let segment = `
      <ul>
      <li>${one.name}</li>
      <li>${one.model}</li>
      <li>${one.manufacturer}</li>
      <li>${one.cost_in_credits}</li>
      <li>${one.crew}</li>
      <li>${one.passengers}</li>
      </ul>
      `
      html += segment;
  })
    container.innerHTML = html;
  } catch(error) {
    throw new TypeError(error)
    console.error(`renderData error: ${error}`)
  }
}

renderData()

// target: 
// get all data on load or defer
// use map

// wrong implementation
// async function renderData(){
//   try {
//   const url = createUrl();
//   const blob = await getData(url)
//   const found = new RegExp(this.value, 'gi')
//   const data = blob.results.filter(one => one.name.match(found))
//   // const matching = data.name.replace(regx, `<span class="hl">${this.value}</span>`)
//   let html = '';
//   data.forEach(one => {
//       let segment = `
//       <ul>
//       <li>${one.name}</li>
//       <li>${one.model}</li>
//       <li>${one.manufacturer}</li>
//       <li>${one.cost_in_credits}</li>
//       <li>${one.crew}</li>
//       <li>${one.passengers}</li>
//       </ul>
//       `
//       html += segment;
//   })
//     container.innerHTML = html;
//   } catch(error) {
//     throw new TypeError(error)
//     console.error(`renderData error: ${error}`)
//   }
// }

/*
  either create a dropdown to pick a topic 
      made the dropdown option
      and the time it takes to load per list is really slow
      
      will try to use promise all tomorrow
      get everything while the page is loading
          still learning promises. need to finish
          the book to go deeper

          just going to finish the mini project 
          first

  add themes
  and design the page a little according to the topic

  SAMPLE
    async function gather(){
    let starships = await fetch('https://swapi.dev/api/starships/')
    let people = await fetch('https://swapi.dev/api/people/')
    let planets = await fetch('https://swapi.dev/api/planets/')

*/