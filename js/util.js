'use strict';

(function () {

  // Получение случайного элемента массива
  var getRandomElement = function (arrayElements) {
    return arrayElements[Math.floor(Math.random() * arrayElements.length)];
  };

  // Добавление класса для элемента
  var addClass = function (element, className) {
    element.classList.add(className);
  };

  // Удаление класса для элемента
  var removeClass = function (element, className) {
    element.classList.remove(className);
  };

  window.util = {
    getRandomElement: getRandomElement,
    addClass: addClass,
    removeClass: removeClass
  };

})();
