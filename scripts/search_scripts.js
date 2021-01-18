const search = getQueryParams();

const dataSearchJson = searchApi(search);

renderSearch(dataSearchJson);

function getQueryParams() {
  const params = new URLSearchParams(document.location.search.substring(1));
  const search = params.get("search");
  return search;
}

async function searchApi(search) {
  const urlApi = `https://cursos.alura.com.br/api/search?query=${search}`;
  return fetch(urlApi)
    .then(async response => 
      response.json()
      .then(
        body => ({
          body,
          status: response.status
        })
      )
    )
}

function handleSubmitSearch(event) {

  event.preventDefault();

  const searchValue = document.getElementById("input-search").value;

  window.location.href = `http://127.0.0.1:5500/search.html?search=${searchValue}`;
}

async function renderSearch(dataSearchJson) {

  let jsonData = await dataSearchJson.then(response => response);
  console.log(jsonData.status);

  const h1 = document.querySelector("#h1");

  h1.innerText = search;
  
  jsonData.body.results.filter(data => {
    
    console.log(data);

    const ul = document.querySelector("#ul");

    const a = document.createElement("a");
    const li = document.createElement("li");
    const div = document.createElement("div");
    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");

    const css = `#${data.id}:hover { box-shadow: 0 0 1rem ${data.mobileColor} }`;
    const style = document.createElement('style');

    li.id = data.id
    
    a.href= data.siteUrl;
    img.src = data.image;
    h3.innerText = data.title;
    p.innerHTML = data.description.raw;

    li.style.borderColor = data.mobileColor;
    
    style.appendChild(document.createTextNode(css));

    div.appendChild(img);
    div.appendChild(h3);

    a.appendChild(div);
    a.appendChild(p);
    a.appendChild(style);

    li.appendChild(a);

    ul.appendChild(li);
  })
}