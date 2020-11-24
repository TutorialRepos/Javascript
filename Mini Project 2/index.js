const finder = document.getElementById('finder')
const pick = document.querySelector('#category')

finder.addEventListener('search', renderData )
finder.addEventListener('keyup', renderData )
pick.addEventListener('change', createUrl)

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
      <li>${one.name} <br> </li>
      <li>${one.model} <br></li>
      <li>${one.manufacturer} <br></li>
      <li>${one.cost_in_credits} <br></li>
      <li>${one.crew} <br></li>
      <li>${one.passengers} <br></li>
      </ul>
      `
      html += segment;
  })
    let container = document.querySelector('.listOfData');
    container.innerHTML = html;
  } catch(error) {
    throw new TypeError(error)
    console.error(`renderData error: ${error}`)
  }
}

renderData()

/*
  either create a dropdown to pick a topic 
  or
  get all the data from different urls and combine

  add themes
  and design the page a little according to the topic

*/