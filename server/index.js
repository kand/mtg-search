let express = require('express');
let fs = require('fs');
let path = require('path');

let app = express();

app.get('/sets/:setAbbrv/', (req, res) => {
  let data = JSON.parse(fs.readFileSync(`./server/data/${req.params.setAbbrv}.json`, 'utf8'));
  let queryKeys = Object.keys(req.query);

  if (queryKeys.length > 0) {

    let cardProperties = queryKeys.filter(key => !key.startsWith('__'));
    let specialProperties = queryKeys
      .filter(key => key.startsWith('__'))
      .reduce(function (props, key) {
        props[key] = req.query[key];
        return props;
      }, {});

    data.cards = data.cards.filter((card) => {
      return cardProperties.reduce((include, paramName) => {

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

    if (typeof specialProperties.__sort === 'string') {
     let sorts = specialProperties.__sort.split(',');

      data.cards.sort((card1, card2) => sorts.reduce((currentSort, sortField) => {

        if (card1[sortField] < card2[sortField]) {
          return -1;
        }
        if (card1[sortField] > card2[sortField]) {
          return 1;
        }
        return 0;
      }, 0));
    }
  }

  // allow local CORs
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.send(data);
});

const APP_PORT = 3000;
app.listen(APP_PORT, () => {
  console.log(`started on port ${APP_PORT}`);
});

