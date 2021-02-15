import requestData from './apiRequest.js';

async function requestApi() {

  const url = 'https://www.alura.com.br/api/formacoes';
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

renderNumberCourse();

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
}

async function render(dataResponse) {

  const body = dataResponse.data;
  
  let devops = []; 
  let mobile = []; 
  let frontEnd = []; 
  let designUx = []; 
  let dataScience = []; 
  let programacao = []; 
  let inovacaoGestao = []; 
  let marketingDigital = []; 
  
  body.forEach(course => {

    switch (course.categoryUrlName) {

      case 'mobile':
        mobile.push({
          title: course.title,
          count: course.courseCount,
          id: course.categoryUrlName     
        });
        break;

      case 'design-ux':
        designUx.push({      
          title: course.title,
          count: course.courseCount,
          id: course.categoryUrlName
        });
        break;

      case 'devops':
        devops.push({      
          title: course.title,
          count: course.courseCount,
          id: course.categoryUrlName
        });
        break;

      case 'programacao':
        programacao.push({      
          title: course.title,
          count: course.courseCount,
          id: course.categoryUrlName
        });
        break;

      case 'inovacao-gestao':
        inovacaoGestao.push({      
          title: course.title,
          count: course.courseCount,
          id: course.categoryUrlName
        });
        break;

      case 'marketing-digital':
        marketingDigital.push({      
          title: course.title,
          count: course.courseCount,
          id: course.categoryUrlName
        });
        break;

      case 'front-end':
        frontEnd.push({      
          title: course.title,
          count: course.courseCount,
          id: course.categoryUrlName
        });
        break;

      case 'data-science':
        dataScience.push({      
          title: course.title,
          count: course.courseCount,
          id: course.categoryUrlName
        });
        break;

      }
  })

  const allCourses = [ 
    devops, 
    mobile, 
    frontEnd, 
    designUx, 
    dataScience, 
    programacao, 
    inovacaoGestao, 
    marketingDigital
  ];
  
  allCourses.map(course => {

    course.sort(function(a, b) {
      var nameA = a.title.toUpperCase();
      var nameB = b.title.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
  
      return 0;
    });

    course.filter(data => {
      
      const divSelect = document.querySelector(`#${data.id}`);
      const pSelect = document.querySelector(`#${data.id}-number`);
  
      const aCreate = document.createElement("a");
      const pCreate = document.createElement("p");
      const divCreate = document.createElement("div");
  
      pSelect.innerText = `${course.length} Formações`;
  
      aCreate.innerText = data.title;
      aCreate.href= "#";
      pCreate.innerHTML = `${data.count} Cursos <span>></span>`;
  
      divCreate.appendChild(aCreate);
      divCreate.appendChild(pCreate);
  
      divSelect.appendChild(divCreate);
    });  
  });
}

async function renderNumberCourse() {

  const url = 'https://www.alura.com.br/api/cursos'
  const dataResponse = await requestData(url); 

  const  span = document.getElementById('course-number');

  if(dataResponse.status === 200) {
    console.log('HTTP Status: ' + dataResponse.status);
    span.innerText = dataResponse.data.length;
  } else {
    console.log('HTTP Status: ' + dataResponse.status);
    console.log(dataResponse.data);
    span.innerText = 'X';
  }

}