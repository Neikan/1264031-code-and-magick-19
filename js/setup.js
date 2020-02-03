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
var wizardCoatColor = setupWindow.querySelector('.wizard-coat');
var wizardEyesColor = setupWindow.querySelector('.wizard-eyes');
var wizardFireballColor = setupWindow.querySelector('.setup-fireball');

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
  setupWindow.querySelector('input[name="eyes-color"]').value = wizardEyesColor.style.fill;
};

// Изменение цвета плаща персонажа
var changeWizardCoatColor = function () {
  wizardCoatColor.style.fill = getRandomElement(COAT_COLORS);
  setupWindow.querySelector('input[name="coat-color"]').value = wizardCoatColor.style.fill.style.fill;
};

// Изменение цвета фаербола персонажа
var changeWizardFireballColor = function () {
  var newColor = getRandomElement(FIREBALL_COLORS);
  wizardFireballColor.style.backgroundColor = newColor;
  setupWindow.querySelector('input[name="fireball-color"]').value = newColor;
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
  if ((evt.keyCode === KEYCODE_ESC) && (document.activeElement !== inputUserName)) {
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
  setupOpen.removeEventListener('click', setupOpenClickHandler);
  setupOpen.removeEventListener('keydown', setupOpenKeyDownHandler);

  removeClass(setupWindow, CLASS_TO_DELETE);
  displaySimilarWizards();
  removeClass(setupPanelSimilarWizards, CLASS_TO_DELETE);

  document.addEventListener('keydown', setupWindowClickHandler);
  setupClose.addEventListener('click', setupCloseClickHandler);
  setupClose.addEventListener('keydown', setupCloseKeyDownHandler);
  wizardCoatColor.addEventListener('click', changeWizardCoatColor);
  wizardEyesColor.addEventListener('click', changeWizardEyesColor);
  wizardFireballColor.addEventListener('click', changeWizardFireballColor);
  saveSetup.addEventListener('click', saveChanges);
};

// Закрытие окна .setup
var closeSetupWindow = function () {
  setupOpen.addEventListener('click', setupOpenClickHandler);
  setupOpen.addEventListener('keydown', setupOpenKeyDownHandler);

  addClass(setupPanelSimilarWizards, CLASS_TO_DELETE);
  addClass(setupWindow, CLASS_TO_DELETE);

  document.removeEventListener('keydown', setupWindowClickHandler);
  wizardCoatColor.removeEventListener('click', changeWizardCoatColor);
  wizardEyesColor.removeEventListener('click', changeWizardEyesColor);
  wizardFireballColor.removeEventListener('click', changeWizardFireballColor);
  setupClose.removeEventListener('click', setupCloseClickHandler);
  setupClose.removeEventListener('keydown', setupCloseKeyDownHandler);
  saveSetup.removeEventListener('click', saveChanges);
};
