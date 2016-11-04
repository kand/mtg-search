!(function (App) {

  if (typeof App.actions === 'undefined') {
    return new Error('requirement App.actions not available for App.Api!');
  }

  if (typeof App.store === 'undefined') {
    return new Error('requirement App.store not available for App.Api!');
  }

  var paramBuilder = function (obj) {

    if (typeof obj === 'undefined') {
      return '';
    }

    var keys = Object.keys(obj);
    if (keys.length === 0) {
      return '';
    }

    return keys.reduce(function (params, key, i) {
      return params += (i === 0 ? '' : '&') + key + '=' + obj[key];
    }, '?');
  };

  App.Api = {
    getSet: function (setKey, params) {

      return new Promise(function (resolve, reject) {

        App.store.dispatch(App.actions.requestCards(setKey));

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
                responseObj[data.code] = data;
              }

              resolve();
              App.store.dispatch(App.actions.receiveCards(setKey, responseObj));
            } else {
              reject();
              App.store.dispatch(App.actions.cardsRequestError(setKey));
            }
          }
        });
        request.open('GET', window.API_ENDPOINT_ROOT + '/sets/' + setKey + paramBuilder(params));
        request.send();
      });
    }
  };
})(App);
