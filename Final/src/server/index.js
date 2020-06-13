const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());


app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

let dataLink = {};
let dataFinal = {temp: "", description: "", url: ""};

const http = require('http');
const https = require('https');

app.post('/addNewValue', addNewValue);

async function addNewValue(req, res){
  console.log(req.body)
 dataLink = {
    city: req.body.city,
    country: req.body.country,
    date: req.body.date
  }
  const city= dataLink.city
  const country = dataLink.country
  const date = dataLink.date
  gLink = "http://api.geonames.org/searchJSON?q="+city+"&maxRows=1"+process.env.geoCode

 http.get(gLink, (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    const stock = JSON.parse(data);
    if (stock.totalResultsCount === 0){console.log("error");return("error")}
    const long = stock.geonames[0].lng;
    const lat = stock.geonames[0].lat;

    wLink = "http://api.weatherbit.io/v2.0/current?lat="+lat+"&lon="+long+process.env.weaCode

    http.get(wLink, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        const newStock = JSON.parse(data);
        dataFinal.temp = newStock.data[0].temp
        dataFinal.description = newStock.data[0].weather.description
        console.log(dataFinal)
        let pLink = "https://pixabay.com/api/"+process.env.pixaCode+"q="+city+"+"+country+"&image_type=photo"
        https.get(pLink, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
              data += chunk;
            });

            resp.on('end', () => {
              console.log(pLink)
              const nStock = JSON.parse(data);
              //if no city found show country
              if(nStock.total <= 1){
                pLink = "https://pixabay.com/api/"+process.env.pixaCode+"q="+country+"&image_type=photo"
                https.get(pLink, (resp) => {
                    let data = '';

                    resp.on('data', (chunk) => {
                      data += chunk;
                    });

                    resp.on('end', () => {
                      console.log(pLink)
                      const nStock = JSON.parse(data);
                      //if no country found show the world
                      if(nStock.total <= 1){
                        pLink = "https://pixabay.com/api/"+process.env.pixaCode+"q=world"
                        https.get(pLink, (resp) => {
                            let data = '';

                            resp.on('data', (chunk) => {
                              data += chunk;
                            });

                            resp.on('end', () => {
                              console.log(pLink)
                              const nStock = JSON.parse(data);

                              const url = {pageURL: nStock.hits[1].webformatURL}
                              console.log(url)
                              dataFinal.url = url
                              res.send(dataFinal)
                            });

                        }).on("error", (err) => {
                          console.log("Error: " + err.message);
                        });

                        return("over")
                      }
                      const url = {pageURL: nStock.hits[1].webformatURL}
                      console.log(url)
                      dataFinal.url = url
                      res.send(dataFinal)
                    });

                }).on("error", (err) => {
                  console.log("Error: " + err.message);
                });


              }
              else{
                const url = {pageURL: nStock.hits[1].webformatURL}
                console.log(url)
                dataFinal.url = url
                res.send(dataFinal)}
            });

        }).on("error", (err) => {
          console.log("Error: " + err.message);
        });
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

      });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });

}

