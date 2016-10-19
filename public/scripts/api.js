!(function (App) {

  var cardCache;

  App.Api = {
    getSets: function (endpoint) {
      return new Promise(function (resolve, reject) {
        if (cardCache) {
          resolve(cardCache);
        }

        var request = new XMLHttpRequest();

        request.addEventListener('readystatechange', function () {
          if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
              var data = JSON.parse(this.response);
              if (Array.isArray(data)) {
                cardCache = data;
              } else {
                cardCache = {};
                cardCache[data.name] = data;
              }

              resolve(cardCache);
            } else {
              reject();
            }
          }
        });
        request.open('GET', endpoint);
        request.send();
      });
    }
  };
})(App);
