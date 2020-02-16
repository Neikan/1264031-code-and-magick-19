'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;

  // Получение случайного элемента массива
  var getRandomElement = function (arrayElements) {
    return arrayElements[Math.floor(Math.random() * arrayElements.length)];
  };

  // Перемешивание массива
  var getShuffleArray = function (array) {
    var j;
    var temp;
    for (var i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }
    return array;
  };

  // Добавление класса для элемента
  var addClass = function (element, className) {
    element.classList.add(className);
  };

  // Удаление класса для элемента
  var removeClass = function (element, className) {
    element.classList.remove(className);
  };

  var removeErrorMessage = function () {
    if (document.querySelector('div[name="errormessage"]') !== null) {
      document.querySelector('div[name="errormessage"]').remove();
    }
  };

  var errorMessageForm = function () {
    removeErrorMessage();
    var item = document.createElement('div');
    item.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    item.style.position = 'absolute';
    item.style.left = 0;
    item.style.right = 0;
    item.style.fontSize = '30px';
    item.setAttribute('name', 'errormessage');
    return item;
  };

  // Форма сообщения об ошибке
  var showErrorMessageHandler = function (errorMessage) {
    var item = errorMessageForm();
    item.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', item);
  };

  // Функция устранения "разрыва"
  var debounce = function (callbackFunc) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        callbackFunc.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    getRandomElement: getRandomElement,
    getShuffleArray: getShuffleArray,
    addClass: addClass,
    removeClass: removeClass,
    showErrorMessageHandler: showErrorMessageHandler,
    removeErrorMessage: removeErrorMessage,
    debounce: debounce
  };

})();
