const postData = (cart) => {
  return fetch('http://127.0.0.1:8000/api/orders', {
    method: 'POST',
    body: JSON.stringify(cart),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    // .then((json) => console.log(json))
    .catch(error => {
      console.error('Произошла ошибка при отправке данных:', error);
    });
}

export default postData