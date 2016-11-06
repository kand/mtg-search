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
          let transformedQuery = queryValue.toLowerCase();
          let transformedCardValue = cardValue.toLowerCase();
          return include && transformedCardValue.indexOf(transformedQuery) > -1;
        } else if (propType === 'number') {
          return include && cardValue === paramName;
        }

        return false;

      }, true);
    });

    if (typeof specialProperties.__allText === 'string') {
      let transformedQuery = specialProperties.__allText.toLowerCase();
      let cardTextFields = [
        'name',
        'text',
        'type'
      ];

      data.cards = data.cards.filter((card) => {

        return cardTextFields.reduce((include, fieldKey) => {
          let cardValue = card[fieldKey];
          if (typeof cardValue === 'undefined') {
            return include;
          }

          let transformedCardValue = cardValue.toLowerCase();
          return include || transformedCardValue.indexOf(transformedQuery) > -1;
        }, false);
      });
    }

    if (typeof specialProperties.__sort === 'string') {
     let sorts = specialProperties.__sort.split(',');

      data.cards.sort((card1, card2) => sorts.reduce((currentSort, sortField) => {
        let ascendingSort = 1;
        let fieldName;
        let sortResult = 0;

        if (sortField.startsWith('-')) {
          ascendingSort = -1;
          fieldName = sortField.substring(1);
        } else {
          fieldName = sortField;
        }

        if (card1[fieldName] < card2[fieldName]) {
          sortResult = -1;
        } else if (card1[fieldName] > card2[fieldName]) {
          sortResult = 1;
        }

        return ascendingSort * sortResult;
      }, 0));
    }

    // loop through remainder
    Object.keys(specialProperties).forEach(key => {

      if (key.startsWith('__includes__')) {

        let fieldName = key.split('__')[2];
        let filterValue = specialProperties[key];
        data.cards = data.cards.filter(card => {

          let cardField = card[fieldName];
          if (typeof cardField === 'undefined') {
            return false;
          } else if (Array.isArray(cardField) && cardField.includes(filterValue)) {
            return true;
          }

          return false;
        });
      }
    });
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

