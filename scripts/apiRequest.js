export default async  function requestApi(urlApi) {

  const fetchData = await fetch(urlApi)
    .then(response => response)
    .catch(err => err);
    
  if(!fetchData.ok) {
    return {
        data: fetchData,
        status: 400,
    }
  }

  const responseJson = fetchData.json().then(response => response);

  return responseJson.then(data => ({
    data,
    status: 200
  }));
}
