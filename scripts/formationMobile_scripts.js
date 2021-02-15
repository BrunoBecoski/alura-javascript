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

