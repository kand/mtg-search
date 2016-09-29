!(function (App) {

  App.Api = {
    getSets: function (endpoint) {
      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        request.addEventListener('readystatechange', function () {
          if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
              resolve(JSON.parse(this.response));
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
