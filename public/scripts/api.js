!(function (App) {

  App.Api = {
    getSets: function (endpoint) {
      return new Promise(function (resolve, reject) {

        var request = new XMLHttpRequest();

        request.addEventListener('readystatechange', function () {
          if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
              var data = JSON.parse(this.response);
              var responseObj;

              if (Array.isArray(data)) {
                responseObj = data;
              } else {
                responseObj = {};
                responseObj[data.name] = data;
              }

              resolve(responseObj);
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
