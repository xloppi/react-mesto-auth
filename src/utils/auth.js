const parseResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(new Error(`Ошибка ${res.status}: ${res.statusText}`))
};
 const headers = {
   'Accept': 'application/json',
   'Content-type': 'application/json'
 }
