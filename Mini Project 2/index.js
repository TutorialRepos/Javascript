const container = document.querySelector('.listOfData');
const finder = document.getElementById('finder')
finder.addEventListener('click', renderData);
finder.addEventListener('search', renderData);
finder.addEventListener('keyup', renderData);

// const pick = document.querySelector('#category')
// pick.addEventListener('change', renderData);

const data = []

const starships = fetch('https://swapi.dev/api/starships/')
    .then(blob => blob.json())
    .catch(err => console.error('fetching starships: ', err))

const planets = fetch('https://swapi.dev/api/planets/')
    .then(blob => blob.json())
    .catch(err => console.error('fetching planets: ',err))

const people = fetch('https://swapi.dev/api/people/')
    .then(blob => blob.json())
    .catch(err => console.error('fetching people: ',err))

Promise.all([starships, planets, people])
  .then(values => data.push(...values))

function findMatches(findMe, data, index){
  return data[index].results.filter(values => {
    const regx = new RegExp(findMe, 'gi')
    return values.name.match(regx)
  })
}

function renderData(){
// TODO  
}

// target: use map and filter on data

// wrong implementation

// async function getData(pick){
//   try {
//       url = pick;
//       let res = await fetch(url);
//       return await res.json();
//   } catch (error) {
//       console.error('getData error: ', error)
//   }
// }

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