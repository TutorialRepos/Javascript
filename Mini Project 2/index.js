let search = document.querySelector('.search')
search.addEventListener('keyup', renderData )

function getUrl(pick){
  const urls = [
    '/starships/',
    '/planets/',
    '/people/',
    '/films/',
    '/species/',
    '/vehicles/',
  ]
  return urls[pick]
}

async function getData(){
  let url = 'https://swapi.dev/api/starships/';
  try {
      let res = await fetch(url);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}

async function renderData(){
  const blob = await getData()
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
  });

  let container = document.querySelector('.listOfData');
  container.innerHTML = html;
}

renderData()

/*
notes to self:

make a function to make a list from an array
and add data.films after

try to make these into modules if you can

getData logic:
  get url
  try await fetch
    return .json
  catch err
  no other return except on try

renderData logic:
  await getData
  string container
  loop through data
  create text according to data
  render data via innerHTML

call f()
*/