const container = document.querySelector('.listOfData');
const pick = document.querySelector('#category')
const finder = document.querySelector('#finder')
const intro = document.querySelector('#intro');
const mainLoader = document.querySelector('#mainLoader');
const calendar = document.querySelector('#calendar');
const errorMessage = document.querySelector('.error');
const errorBlob = document.querySelector('.error');

finder.addEventListener('click', renderData);
finder.addEventListener('search', renderData);
finder.addEventListener('keyup', renderData);

finder.addEventListener('load', targetArticles)
finder.addEventListener('click', targetArticles)

window.addEventListener('load', renderData)

const data = [];
const errors = {};
  errors.loading = [];
  errors.check_for_error_load = false;
const session = {};

const starships = fetch('https://swapi.dev/api/starships/')
    .then(blob => blob.json())
    .catch(err => {
      errors['loading'].push('starships data failed to load');
      errors['check_for_error_load'] = true;
      errors['starships_internal'] = err;
    }) 

const planets = fetch('https://swapi.dev/api/planets/')
    .then(blob => blob.json())
    .catch(err => {
      errors['loading'].push('planets data failed to load');
      errors['check_for_error_load'] = true;
      errors['planets_internal'] = err;    
    })

const people = fetch('https://swapi.dev/api/people/')
    .then(blob => blob.json())
    .catch(err => {
      errors['loading'].push('people data failed to load');
      errors['check_for_error_load'] = true;
      errors['people_internal'] = err;    
    })

Promise.all([starships, planets, people])
  .then(values => {
        if(!errors.check_for_error_load){ 
          intro.innerHTML = 'Data is ready, have a nice day.';
          mainLoader.remove();
          return data.push(...values);
          } else {
            mainLoader.remove();
            intro.innerHTML = 'Please check connection and reload'
          }

    })
  .catch(err => err)

function findMatches(findMe, data){
  return data[pick.value].results.filter(values => {
    const regx = new RegExp(findMe, 'gi')
    return values.name.match(regx)
  })
}

function renderData(){
  try{
    let matches = findMatches(this.value, data)
    const item = matches.map((value, index ) => {
      const regx = new RegExp(this.value, 'gi')
      const name = value.name.replace(regx, `
        <span class='hl'>${this.value}</span>
      `)
      const keys = additionalInfo(matches, index);
      return `
      <article class="details" style="height: 60px; overflow: hidden; display: block;">
        <h4>${name}</h4>
        <ul>
          ${keys}
        </ul>
      </article>
      `
    }).join(' ')
    container.innerHTML = item;
    targetArticles()
  } catch(err) {
    if (err instanceof TypeError){
      session['renderData'] = err
    }
  }
}

function targetArticles(){
  const a = document.querySelectorAll('article')
  a.forEach(one => one.addEventListener('click', target))
}

function target(){
  let change = this.style  
  let changes = (change.height === '60px') ? change.height = '500px' : change.height = '60px'
  changes = (change.overflow === 'hidden') ? change.overflow = 'auto' : change.overflow = 'hidden'
  changes = (change.display === 'block') ? change.overflow = 'none' : change.overflow = 'block'
  return changes
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

renderData();                                 