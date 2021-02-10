import requestData from './apiRequest.js';

const search = getQueryParams();

requestApi();

function getQueryParams() {
  const params = new URLSearchParams(document.location.search.substring(1));
  const search = params.get("search");
  return search;
}

async function requestApi() {

  const url = `https://cursos.alura.com.br/api/search?query=${search}`;
  const dataResponse = await requestData(url);

  if(dataResponse.status === 200) {
    console.log('HTTP Status: ' + dataResponse.status);
    renderSearch(dataResponse); 
  } else {
    console.log('HTTP Status: ' + dataResponse.status);
    console.log(dataResponse.data);
    renderError();
  }
}

async function renderSearch(dataResponse) {

  const h1 = document.querySelector("#h1");

  h1.innerText = search;
  
  dataResponse.data.results.filter(data => {
    
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

function renderError() {
  const span = document.querySelector("#span-error");
  const h1 = document.createElement("h1");

  h1.innerText = "Não foi possível se conectar com o servidor, por favor tente novamente."
  h1.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
    font-size: 24px;
  `;

  span.appendChild(h1);

  const h1Title = document.querySelector("#h1");

  h1Title.innerText = '';
}
