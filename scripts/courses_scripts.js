import requestData from './apiRequest.js';

const search = getQueryParams();

function getQueryParams() {
  const params = new URLSearchParams(document.location.search.substring(1));
  const search = params.get("name"); 
  return search;
}

async function requestApi() {

  const url = 'https://www.alura.com.br/api/cursos';
  const dataResponse = await requestData(url);

  if(dataResponse.status === 200) {
    console.log('HTTP Status: ' + dataResponse.status);
    render(dataResponse); 
  } else {
    console.log('HTTP Status: ' + dataResponse.status);
    console.log(dataResponse.data);
    renderError();
  }
}

requestApi();

setInterval(fixedLetters, 10);

function fixedLetters() {

  const body = document.querySelector('body')
  const letters = document.getElementById('letters');
  const scrollTop = body.scrollTop;
  
  if(scrollTop >= 400) {
    letters.classList.add('fixed');
  } else {
    letters.classList.remove('fixed');
  }
}

function render(dataResponse) {

  if (!search) {
    renderCourses(dataResponse);
  } else {
    renderSearch(dataResponse);
  }

}

function renderCourses(dataResponse) {

  const mainUl = document.querySelector("#list");

  const h1 = document.querySelector("#title");
  h1.innerText = "Cursos";
  
  dataResponse.data.forEach(curso => {
      
    const name = formatRegex(curso);

    createShortcut(name);
    
    if(!document.getElementById(name)) {
      
      const newUl = document.createElement("ul");

      newUl.id = name;
      newUl.innerText = name;
  
      mainUl.appendChild(newUl);
  
      const li = document.createElement("li");
      
      li.innerHTML = strong(curso.nome);
      
      newUl.appendChild(li);

    } else {

      const newUl = document.getElementById(name);

      const li = document.createElement("li");
  
      li.innerHTML =  strong(curso.nome);
        
      newUl.appendChild(li);
    }

  });  
}

function strong(name) {

  const regexBefore = /^(.*?)\:/;
  const regexAfter = /(?<=\:).*/;

  if (!name.includes(':')){
    return `<strong>${name}</strong>`
  } 

  const strong = regexBefore.exec(name);
  const normal = regexAfter.exec(name);

  return `<strong>${strong[0]}</strong> ${normal[0]}`;
}

function formatRegex(curso) {

  const name = curso.nome;
  const result = name.substr(0, 1);
  const resultFormat = result.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

  return resultFormat;  
}

function createShortcut(letter) {

  if(document.getElementById(letter)) {
    return;
  }

  const a = document.createElement("a");
  const div = document.getElementsByClassName("letters");

  a.innerHTML = letter;
  a.href = `#${letter}`;

  div[0].appendChild(a);
}

function renderSearch(dataResponse) {
  
  const mainUl = document.querySelector("#list");
  const newUl = document.createElement("ul");
  
  const h1 = document.querySelector("#title");
  h1.innerText = search;
  
  newUl.id = search; 
  mainUl.appendChild(newUl);
  
  let count = 0;

  dataResponse.data.forEach(curso => {

    const lowerCaseName = curso.nome.toLowerCase();
    const lowerCaseSearch = search.toLowerCase();
    
    if(lowerCaseName.includes(lowerCaseSearch)){
      const li = document.createElement("li");
      li.innerHTML = strong(curso.nome);
      newUl.appendChild(li);
      count = count + 1;
    }
  });

  
  if (count === 0) {
    const ulSearch = document.querySelector(`#${search}`);
    const li = document.createElement("li");
    li.innerHTML = `Nenhum resultado encontrado para <strong>${search}</strong>. Tente outra busca!`;
    ulSearch.appendChild(li);
  }

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


