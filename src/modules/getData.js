const getData = () => {
  return fetch('https://api.mirpodarkov-navoi.uz/api/products')
  // return fetch('https://857a-84-54-90-212.ngrok-free.app/api/products', {
  //   headers: {
  //     'ngrok-skip-browser-warning': 'true',
  //     'Accept': 'application/json'
  //   },
  // })
    .then(response => response.json())
    .then(data => {
      data = data['products'];
      // console.log(data);
      return data
    })
}

export default getData