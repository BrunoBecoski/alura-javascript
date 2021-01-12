const url = 'https://www.alura.com.br/api/cursos';

requestAPI(url);

const search = getQueryParams();

function handleSubmitSearch(event) {

  event.preventDefault();

  const searchValue = document.getElementById("input-search").value;

  window.location.href = `http://127.0.0.1:5500/courses.html?name=${searchValue}`;
}

function requestAPI(urlAPI) {
  fetch(urlAPI)
    .then(response => {
      console.log('Request successful');
      response.json()
        .then(cursos => {
          render(cursos);
        });
    });
}

function getQueryParams() {
  const params = new URLSearchParams(document.location.search.substring(1));
  const search = params.get("name"); 
  return search;
}

function render(cursos) {

  if (!search) {
    renderCursos(cursos);
  } else {
    renderSearch(cursos);
  }

}

function renderCursos(data) {

  const mainUl = document.querySelector("#list");
  
  data.forEach(curso => {
      
    const name = formatRegex(curso);

    createShortcut(name);
    
    if(!document.getElementById(name)) {
      
      const newUl = document.createElement("ul");

      newUl.id = name;
    
      newUl.innerText = name;
  
      mainUl.appendChild(newUl);
  
      const li = document.createElement("li");
      
      li.innerHTML = curso.nome;
      
      newUl.appendChild(li);

    } else {

      const newUl = document.getElementById(name);

      const li = document.createElement("li");
  
      li.innerHTML = curso.nome;
        
      newUl.appendChild(li);
    }

  });  
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

function renderSearch(cursos) {
  
  const mainUl = document.querySelector("#list");
  const h1 = document.createElement("h1");
  const newUl = document.createElement("ul");

  
  h1.innerText = search;
  mainUl.appendChild(h1);
  newUl.id = search; 
  mainUl.appendChild(newUl);
  
  cursos.forEach(curso => {

    const lowerCaseName = curso.nome.toLowerCase();
    const lowerCaseSearch = search.toLowerCase();
    
    if(lowerCaseName.includes(lowerCaseSearch)){
      const li = document.createElement("li");
      li.innerText = curso.nome;
      newUl.appendChild(li);
    }
  });

}