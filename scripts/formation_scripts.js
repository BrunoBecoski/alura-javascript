import requestData from './import_api.js';

async function requestApi() {
  return await requestData('https://www.alura.com.br/api/formacoes');
} 

render() 

async function render() {

  const dataResponse = await requestApi()
  const body = dataResponse.body;

  // console.log(body);
  
  // let mobile = []; 
  
  // body.forEach(course => {

  //   if(course.categoryName === 'Mobile') {
  //     mobile.push({      
  //       title: course.title,
  //       count: course.courseCount
  //     });
  //   }
  // })

  // console.log(mobile);
    

  
  body.map(course => {
    

    const id = course.categoryUrlName;
    const title = course.title;
    const courseCount = course.courseCount;
    
    const div = document.querySelector(`#${id}`);
    const p = document.querySelector(`#${id}-number`);


    const a = document.createElement("a");
    const p2 = document.createElement("p");
    const div2 = document.createElement("div");

    

    p.innerText = `X Formações`;

    a.innerText = title;
    a.href= "#";
    p2.innerHTML = `${courseCount} Cursos <span>></span>`;

    div2.appendChild(a);
    div2.appendChild(p2);

    div.appendChild(div2);
    
  
  });
}