'use strict';

(function () {

  var CLASS_TO_DELETE = 'hidden';
  var KEYCODE_ESC = 27;
  var KEYCODE_ENTER = 13;

  // Окно .setup и его параметры
  var setupWindow = document.querySelector('.setup');

  var zeroCoordinatesSetupWindow = {
    x: setupWindow.style.top,
    y: setupWindow.style.left
  };

  // Добавление фокуса для аватара пользователя
  var setupOpen = document.querySelector('.setup-open-icon');
  setupOpen.setAttribute('tabindex', 0);


  // Хендлеры и прослушка событий для открытия окна .setup
  var setupOpenClickHandler = function () {
    openSetupWindow();
  };

  var setupOpenKeyDownHandler = function (evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      openSetupWindow();
    }
  };

  setupOpen.addEventListener('click', setupOpenClickHandler);
  setupOpen.addEventListener('keydown', setupOpenKeyDownHandler);

  // Установка фокуса для кнопки закрытия окна
  var setupClose = setupWindow.querySelector('.setup-close');
  setupClose.setAttribute('tabindex', 0);

  // Хендлеры для закрытия окна .setup
  var setupCloseClickHandler = function () {
    closeSetupWindow();
  };

  var setupCloseKeyDownHandler = function (evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      closeSetupWindow();
    }
  };

  var setupWindowClickHandler = function (evt) {
    if ((evt.keyCode === KEYCODE_ESC) && (document.activeElement !== window.player.inputUserName)) {
      closeSetupWindow();
    }
  };

  // Отправка изменений в окне .setup
  var saveSetup = setupWindow.querySelector('.setup-submit');
  var saveChanges = function () {
    setupWindow.querySelector('.setup-wizard-form').submit();
  };

  // Открытие окна .setup
  var openSetupWindow = function () {

    setupWindow.style.top = zeroCoordinatesSetupWindow.x;
    setupWindow.style.left = zeroCoordinatesSetupWindow.y;

    setupOpen.removeEventListener('click', setupOpenClickHandler);
    setupOpen.removeEventListener('keydown', setupOpenKeyDownHandler);

    window.util.removeClass(setupWindow, CLASS_TO_DELETE);
    window.wizards.displaySimilarWizards();

    document.addEventListener('keydown', setupWindowClickHandler);
    setupClose.addEventListener('click', setupCloseClickHandler);
    setupClose.addEventListener('keydown', setupCloseKeyDownHandler);
    window.player.wizardCoatColor.addEventListener('click', window.player.changeWizardCoatColor);
    window.player.wizardEyesColor.addEventListener('click', window.player.changeWizardEyesColor);
    window.player.wizardFireballColor.addEventListener('click', window.player.changeWizardFireballColor);
    saveSetup.addEventListener('click', saveChanges);
  };

  // Закрытие окна .setup
  var closeSetupWindow = function () {
    setupOpen.addEventListener('click', setupOpenClickHandler);
    setupOpen.addEventListener('keydown', setupOpenKeyDownHandler);

    window.util.addClass(setupWindow, CLASS_TO_DELETE);
    window.wizards.displayOffSimilarWizards();

    document.removeEventListener('keydown', setupWindowClickHandler);
    window.player.wizardCoatColor.removeEventListener('click', window.player.changeWizardCoatColor);
    window.player.wizardEyesColor.removeEventListener('click', window.player.changeWizardEyesColor);
    window.player.wizardFireballColor.removeEventListener('click', window.player.changeWizardFireballColor);
    setupClose.removeEventListener('click', setupCloseClickHandler);
    setupClose.removeEventListener('keydown', setupCloseKeyDownHandler);
    saveSetup.removeEventListener('click', saveChanges);
  };

  window.setup = {
    CLASS_TO_DELETE: CLASS_TO_DELETE,
    setupWindow: setupWindow
  };

})();
