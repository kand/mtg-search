let setData = require('mtgjson/data/AllSets.json');

let gun = require('gun')();

let sets = gun.get('sets');

Object.keys(setData).forEach(function (setKey) {
  sets.path(setKey).put({ name: setData[setKey].name });
});

sets.map(function (v, k) {
  console.log(v.name, k)
});

