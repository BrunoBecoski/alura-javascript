import requestData from './import_api.js';

async function requestApi() {
  return await requestData('https://www.alura.com.br/api/formacoes');
} 

render() 

async function render() {

  const dataResponse = await requestApi()
  const body = dataResponse.body;

  body.map(course => {

    const id = course.categoryUrlName;
    const title = course.title;
    const courseCount = course.courseCount;

    const div = document.querySelector(`#${id}`);
    const a = document.createElement("a");
    const p = document.createElement("p");
    const div2 = document.createElement("div");

    

    a.innerText = title;
    a.href= "#";
    p.innerText = `${courseCount} Cursos >`;

    div2.appendChild(a);
    div2.appendChild(p);

    div.appendChild(div2);
    
  
  });
}