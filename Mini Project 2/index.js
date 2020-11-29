const container = document.querySelector('.listOfData');
const finder = document.getElementById('finder')
finder.addEventListener('click', renderData);
finder.addEventListener('search', renderData);
finder.addEventListener('keyup', renderData);

const pick = document.querySelector('#category')
window.addEventListener('load', renderData)

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

function findMatches(findMe, data){
  return data[pick.value].results.filter(values => {
    const regx = new RegExp(findMe, 'gi')
    return values.name.match(regx)
  })
}

function renderData(){
  let matches = findMatches(this.value, data)
  const item = matches.map((value, index )=> {
    const regx = new RegExp(this.value, 'gi')
    const name = value.name.replace(regx, `<span class='hl'>${this.value}</span>`)
    const keys = infoAdditional(matches, index);
    return `
    <div class="info">
      <p>${index}: ${name}</p>
      <div class="supportInfo">${keys}</div>
    </div>
    `
  }).join(' ')
  container.innerHTML = item
}

function infoAdditional(data, index){
  const keyList = Object.keys(data[index])
  const display = keyList.map(values => {
    if(values !== 'name') {
      return `<p>${values}: ${data[index][values]}</p>`
    }
  }).join(' ')
  return display  
}

renderData()