const postData = (cart) => {
  return fetch('https://api.mirpodarkov-navoi.uz/api/orders', {
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