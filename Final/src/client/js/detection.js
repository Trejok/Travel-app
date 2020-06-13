function detection(inputText) {
  console.log("::: Detection :::", inputText);

  fetch('http://localhost:3000/addNewValue',{
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputText)
  })
  .then((res) => {
    res.json().then((data) => {
      console.log(data)
      const resultat = JSON.stringify(data)
      const mess = "the current temperature is: "+data.temp+"°C and the sky is: "+data.description+"."
      document.getElementById('results').innerHTML = mess
      document.getElementById('when').innerHTML = Client.dateCompare()
      document.getElementById('url').src = data.url.pageURL

    })
  })
}


export { detection }
