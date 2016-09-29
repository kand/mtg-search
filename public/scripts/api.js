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
              cardCache = JSON.parse(this.response);
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
