'use strict';

(function () {

  var MIN_USERNAME_LENGTH = 2;
  var MAX_USERNAME_LENGTH = 25;

  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupWindow = window.setup.setupWindow;
  var inputUserName = setupWindow.querySelector('input[name="username"]');
  var wizardCoatColor = setupWindow.querySelector('.wizard-coat');
  var wizardEyesColor = setupWindow.querySelector('.wizard-eyes');
  var wizardFireballColor = setupWindow.querySelector('.setup-fireball');

  // Органичения на длину имени персонажа
  inputUserName.setAttribute('minlength', MIN_USERNAME_LENGTH);
  inputUserName.setAttribute('maxlength', MAX_USERNAME_LENGTH);

  // Изменение цвета глаз персонажа
  var changeWizardEyesColor = function () {
    wizardEyesColor.style.fill = window.util.getRandomElement(EYES_COLORS);
    setupWindow.querySelector('input[name="eyes-color"]').value = wizardEyesColor.style.fill;
  };

  // Изменение цвета плаща персонажа
  var changeWizardCoatColor = function () {
    wizardCoatColor.style.fill = window.util.getRandomElement(COAT_COLORS);
    setupWindow.querySelector('input[name="coat-color"]').value = wizardCoatColor.style.fill;
  };

  // Изменение цвета фаербола персонажа
  var changeWizardFireballColor = function () {
    var newColor = window.util.getRandomElement(FIREBALL_COLORS);
    wizardFireballColor.style.backgroundColor = newColor;
    setupWindow.querySelector('input[name="fireball-color"]').value = newColor;
  };

  window.player = {
    EYES_COLORS: EYES_COLORS,
    COAT_COLORS: COAT_COLORS,

    inputUserName: inputUserName,
    wizardCoatColor: wizardCoatColor,
    wizardEyesColor: wizardEyesColor,
    wizardFireballColor: wizardFireballColor,

    changeWizardEyesColor: changeWizardEyesColor,
    changeWizardCoatColor: changeWizardCoatColor,
    changeWizardFireballColor: changeWizardFireballColor
  };
})();
