'use strict';

(function () {
  var URL_GET = 'https://javascript.pages.academy/code-and-magick/data';
  var URL_POST = 'https://javascript.pages.academy/code-and-magick';

  var TIMEOUT = 10000; // 10s

  var StatusCode = {
    OK: 200,
    NOT_FOUND: 404
  };

  window.load = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      switch (xhr.status) {
        case (StatusCode.OK):
          successHandler(xhr.response);
          break;
        case (StatusCode.NOT_FOUND):
          errorHandler('Сервер недоступен. Мы работаем, чтобы скорее все починить!');
          break;
        default:
          errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения. Пожалуйста, проверьте сетевое подключение');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + TIMEOUT + 'мс. Пожалуйста, проверьте качество сетевого подключения');
    });

    xhr.open('GET', URL_GET);

    xhr.send();
  };

  window.save = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      successHandler(xhr.response);
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения. Пожалуйста, проверьте подключение');
    });

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

})();
