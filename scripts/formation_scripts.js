import requestData from './import_api.js';

async function requestApi() {
  return await requestData('https://www.alura.com.br/api/formacoes');
} 

render();

async function render() {

  const section = document.querySelector("#section-content");

  const dataResponse = await requestApi()
  
  dataResponse.body.forEach(data => {
    
    if(document.querySelector(`#${data.categoryUrlName}`)) {
      return;      
    } else {
      const h1 = document.createElement("h1");
      h1.id = data.categoryUrlName;
      h1.innerText = data.categoryName; 
      section.appendChild(h1);
    }
  });
}