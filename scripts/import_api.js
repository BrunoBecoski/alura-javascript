export default async function requestData(urlApi) {

  const reponseData = requestApi(urlApi);
  const responseDataJson = await reponseData.then(response => response);
  console.log(responseDataJson.status);

  return responseDataJson;
}

async function requestApi(urlApi) {
  return fetch(urlApi)
    .then(async response =>
      response.json()
        .then(
          body => ({
            body,
            status: response.status
          })
        )
    )
}
