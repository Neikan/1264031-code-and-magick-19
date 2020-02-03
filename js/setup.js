'use strict';

// Параметры магов
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var NUMBER_SIMILAR_WIZARDS = 4;
var CLASS_TO_DELETE = 'hidden';
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var MIN_USERNAME_LENGTH = 2;
var MAX_USERNAME_LENGTH = 25;
var KEYCODE_ESC = 27;
var KEYCODE_ENTER = 13;

// Окно .setup и его параметры
var setupWindow = document.querySelector('.setup');
var setupPanelSimilarWizards = setupWindow.querySelector('.setup-similar');
var similarWizardsList = setupPanelSimilarWizards.querySelector('.setup-similar-list');

// Параметры мага
var inputUserName = setupWindow.querySelector('input[name="username"]');
var wizardSetup = setupWindow.querySelector('.setup-player');
var wizardCoatColor = wizardSetup.querySelector('.wizard-coat');
var inputCoatColor = wizardSetup.querySelector('input[name="coat-color"]');
var wizardEyesColor = wizardSetup.querySelector('.wizard-eyes');
var inputEyesColor = wizardSetup.querySelector('input[name="eyes-color"]');

// Параметры фаербола
var fireballSetup = setupWindow.querySelector('.setup-fireball-wrap');
var wizardFireballColor = fireballSetup.querySelector('.setup-fireball');
var inputFireballColor = fireballSetup.querySelector('input[name="fireball-color"]');

// Получение шаблона мага
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Получение случайного элемента из массива
var getRandomElement = function (arrayElements) {
  return arrayElements[Math.floor(Math.random() * arrayElements.length)];
};

// Удаление класса для элемента
var removeClass = function (element, className) {
  element.classList.remove(className);
};

// Добавление класса для элемента
var addClass = function (element, className) {
  element.classList.add(className);
};

// Отрисовка мага
var renderWizard = function (wizard) {
  var wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  return wizardElement;
};

// Создание мага со случайными параметрами
var createWizard = function () {
  return {
    name: getRandomElement(NAMES) + ' ' + getRandomElement(SURNAMES),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
  };
};

// Создание магов для панели похожих
var createSimilarWizards = function () {
  var wizards = [];
  for (var i = 0; i < NUMBER_SIMILAR_WIZARDS; i++) {
    wizards.push(createWizard());
  }
  return wizards;
};

// Получение магов для добавление в панель похожих
var getSimilarWizards = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return fragment;
};

// Вывод похожих магов
var displaySimilarWizards = function () {
  similarWizardsList.innerHTML = '';
  similarWizardsList.appendChild(getSimilarWizards(createSimilarWizards()));
};

// Органичения на длину имени персонажа
inputUserName.setAttribute('minlength', MIN_USERNAME_LENGTH);
inputUserName.setAttribute('maxlength', MAX_USERNAME_LENGTH);

// Изменение цвета глаз персонажа
var changeWizardEyesColor = function () {
  wizardEyesColor.style.fill = getRandomElement(EYES_COLORS);
  inputEyesColor.value = wizardEyesColor.style.fill;
};

// Изменение цвета плаща персонажа
var changeWizardCoatColor = function () {
  wizardCoatColor.style.fill = getRandomElement(COAT_COLORS);
  inputCoatColor.value = wizardCoatColor.style.fill;
};

// Изменение цвета фаербола персонажа
var changeWizardFireballColor = function () {
  var newColor = getRandomElement(FIREBALL_COLORS);
  wizardFireballColor.style.backgroundColor = newColor;
  inputFireballColor.value = newColor;
};

// Добавление фокуса для аватара пользователя
var setupOpen = document.querySelector('.setup-open-icon');
setupOpen.setAttribute('tabindex', 0);

// Прослушка событий для открытия окна .setup
setupOpen.addEventListener('click', function () {
  openSetupWindow();
}, {once: true});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODE_ENTER) {
    openSetupWindow();
  }
}, {once: true});

// Установка фокуса для кнопки закрытия окна
var setupClose = setupWindow.querySelector('.setup-close');
setupClose.setAttribute('tabindex', 0);

// Прослушка событий для закрытия окна .setup
setupClose.addEventListener('click', function () {
  closeSetupWindow();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODE_ENTER) {
    closeSetupWindow();
  }
});

// Отправка изменений в окне .setup
var saveSetup = setupWindow.querySelector('.setup-submit');
var saveChanges = function () {
  setupWindow.querySelector('.setup-wizard-form').submit();
};

// Обработчик сценариев закрытия окна по кнопке Escape
var setupWindowClickHandler = function (evt) {
  if ((evt.keyCode === KEYCODE_ESC) && (document.activeElement !== inputUserName)) {
    closeSetupWindow();
  }
};

// Открытие окна .setup
var openSetupWindow = function () {
  removeClass(setupWindow, CLASS_TO_DELETE);
  displaySimilarWizards();
  removeClass(setupPanelSimilarWizards, CLASS_TO_DELETE);
  document.addEventListener('keydown', setupWindowClickHandler);
  wizardCoatColor.addEventListener('click', changeWizardCoatColor);
  wizardEyesColor.addEventListener('click', changeWizardEyesColor);
  wizardFireballColor.addEventListener('click', changeWizardFireballColor);
  saveSetup.addEventListener('click', saveChanges);
};

// Закрытие окна .setup
var closeSetupWindow = function () {
  addClass(setupPanelSimilarWizards, CLASS_TO_DELETE);
  addClass(setupWindow, CLASS_TO_DELETE);
  document.removeEventListener('keydown', setupWindowClickHandler);
  wizardCoatColor.removeEventListener('click', changeWizardCoatColor);
  wizardEyesColor.removeEventListener('click', changeWizardEyesColor);
  wizardFireballColor.removeEventListener('click', changeWizardFireballColor);

  setupOpen.addEventListener('click', function () {
    openSetupWindow();
  }, {once: true});

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      openSetupWindow();
    }
  }, {once: true});

  saveSetup.removeEventListener('click', saveChanges);
};
