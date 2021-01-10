const url = 'https://www.alura.com.br/api/cursos';

requestAPI(url);

function requestAPI(urlAPI) {
  fetch(urlAPI)
    .then(response => {
      console.log('Request successful');
      response.json()
        .then(cursos => {
          renderCursos(cursos);
        });
    });
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
