let express = require('express');
let fs = require('fs');
let path = require('path');

let app = express();

app.get('/sets/:setAbbrv/', (req, res) => {
  let data = JSON.parse(fs.readFileSync(`./server/data/${req.params.setAbbrv}.json`, 'utf8'));

  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.send(data);
});

const APP_PORT = 3000;
app.listen(APP_PORT, () => {
  console.log(`started on port ${APP_PORT}`);
});

