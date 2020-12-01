const container = document.querySelector('.listOfData');
const pick = document.querySelector('#category')
const finder = document.getElementById('finder')
const intro = document.querySelector('#intro');
const main_loader = document.querySelector('#main_loader');

finder.addEventListener('click', renderData);
finder.addEventListener('search', renderData);
finder.addEventListener('keyup', renderData);

finder.addEventListener('load', targetArticles)
finder.addEventListener('click', targetArticles)

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
  .then(values => {
      intro.innerHTML = 'Data is ready. Have a nice day';
      main_loader.remove();
      return data.push(...values);
    })
  .catch(err => err)

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
    const name = value.name.replace(regx, `
      <span class='hl'>${this.value}</span>
    `)
    const keys = additionalInfo(matches, index);
    return `
    <article>
      <h4>${name}</h4>
      <ul class="details redacted">
        ${keys}
      </ul>
    </article>
    `
  }).join(' ')
  container.innerHTML = item
  targetArticles()
}

function targetArticles(){
  const a = document.querySelectorAll('article')
  a.forEach(one => one.addEventListener('click', modifyArticles))
}

function modifyArticles(){
  const detail = this.querySelector('.details')
  detail.classList.toggle('redacted');
}

function additionalInfo(data, index){
  const keyList = Object.keys(data[index])
  const display = keyList.map(values => {
    if(values === 'created' || values === 'edited') {
      data[index][values] = shortenDateString(data[index][values])  
    }
    if(Array.isArray(data[index][values])) {
      data[index][values] = arrayToHtml(data[index][values])
    }
    if(values !== 'name') {
      return `<li>${values}: ${data[index][values].toUpperCase()}</li>`
    }
  }).join('')
  return display  
}

function arrayToHtml(arr){
  if(typeof arr == 'string') return arr;
  return arr.map(entry => {
    return `<li>${entry}</li>`
  }).join(' ')
}

function shortenDateString(str){
  return str.slice(0,10)
}

renderData()

/*
  next target
    fix films,
    residents 
    and 
    date

  check the other categories
  and fix accordingly
*/
                                 