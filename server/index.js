let express = require('express');
let fs = require('fs');
let path = require('path');

let app = express();

app.get('/sets/:setAbbrv/', (req, res) => {
  let data = JSON.parse(fs.readFileSync(`./server/data/${req.params.setAbbrv}.json`, 'utf8'));
  let queryKeys = Object.keys(req.query);

  if (queryKeys.length > 0) {

    data.cards = data.cards.filter((card) => {
      return queryKeys.reduce((include, paramName) => {

        let cardValue = card[paramName];
        let queryValue = req.query[paramName];
        let propType = typeof card[paramName];

        if (propType === 'string') {
          return include && cardValue.indexOf(queryValue) > -1;
        } else if (propType === 'number') {
          return include && cardValue === paramName;
        }

        // TODO : include other types

        return false;

      }, true);
    });
  }

  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.send(data);
});

const APP_PORT = 3000;
app.listen(APP_PORT, () => {
  console.log(`started on port ${APP_PORT}`);
});

