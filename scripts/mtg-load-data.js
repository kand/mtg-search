let setData = require('mtgjson/data/AllSets.json');

let gun = require('gun')();

let sets = gun.get('sets');
let cards = gun.get('cards');

// loop through sets once to initialize
Object.keys(setData).forEach(function (setKey) {
  let set = setData[setKey];

  sets.path(setKey).put({ name: set.name });
});

// loop through cards in each set so they can ref their printings
Object.keys(setData).forEach(function (setKey) {
  let set = setData[setKey];
  let setInDb = sets.get(setKey);

  set.cards.forEach(function (card) {
    let cardInDb = cards.path(setKey + '-' + card.number).put({
      name: card.name
    });

    setInDb.path('cards.' + card.number).put(cardInDb);
    cardInDb.path('printings.' + setKey).put(sets.path(setKey));
  }); 
});

