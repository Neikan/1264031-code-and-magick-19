'use strict';

(function () {

  window.setup.setupWindow.querySelector('.upload').addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // Размеры рабочей области браузера и окна .setup
    var windowWidth = document.documentElement.clientWidth;
    var setupWindowWidth = window.setup.setupWindow.offsetWidth;

    // Начальные координаты клика
    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Флаг смещения
    var dragged = false;

    // Хендлер смещения
    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      // Новые координаты относительно прежних
      var newCoordinates = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // Новое положение окна .setup
      window.setup.setupWindow.style.top = (window.setup.setupWindow.offsetTop - newCoordinates.y) + 'px';
      window.setup.setupWindow.style.left = (window.setup.setupWindow.offsetLeft - newCoordinates.x) + 'px';
    };

    // Хендлер завершения перемещения окна
    var mouseClickUpHandler = function (upEvt) {
      upEvt.preventDefault(); // перехватываем дефотное открытие окна загрузки изображения

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseClickUpHandler);

      // Предотвращение перемещение окна .setup за пределы рабочей области
      // Верхняя граница
      if (window.setup.setupWindow.offsetTop < 0) {
        window.setup.setupWindow.style.top = 0 + 'px';
      }

      // Левая граница
      if (window.setup.setupWindow.offsetLeft < setupWindowWidth / 2) {
        window.setup.setupWindow.style.left = setupWindowWidth / 2 + 'px';
      }

      // Правая граница
      if (window.setup.setupWindow.offsetLeft > windowWidth - setupWindowWidth / 2) {
        window.setup.setupWindow.style.left = (windowWidth - setupWindowWidth / 2) + 'px';
      }

      if (dragged) {
        var mouseClickPreventDefaultHandler = function (clickEvt) {
          clickEvt.preventDefault();
          window.setup.dialogUpload.removeEventListener('click', mouseClickPreventDefaultHandler);
        };
        window.setup.dialogUpload.addEventListener('click', mouseClickPreventDefaultHandler);
      }
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseClickUpHandler);
  });
})();
