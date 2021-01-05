console.log('crusos-scripts');

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
    
    const letter = curso.nome.substring(0, 1);

    createShortcut(letter);
    
    if(!document.getElementById(letter)) {
      const newUl = document.createElement("ul");

      newUl.id = letter;
    
      newUl.innerText = letter;
  
      mainUl.appendChild(newUl);
  
      const li = document.createElement("li");
      
      li.innerHTML = curso.nome;
      
      newUl.appendChild(li);

    } else {
      const newUl = document.getElementById(letter);

      const li = document.createElement("li");
  
      li.innerHTML = curso.nome;
        
      newUl.appendChild(li);
    }

  });  
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

// function renderCursos(data) {

//   const ul = document.querySelector("#list");

//   data.forEach(curso => {

//     const li = document.createElement("li");

//     li.innerHTML = curso.nome;

//     ul.appendChild(li);

//   });  
// }

// fetch('https://www.alura.com.br/api/cursos')
//   .then(response => {
//     if (response.status === 200) {
//       return  response.json();
//     } else {
//       throw new Error('Ops! Houve um erro em nosso servidor.');
//     }
//   })
//   .then(response => {
//     console.debug(response);
//   }).catch(error => {
//     console.log(error);
//   })



