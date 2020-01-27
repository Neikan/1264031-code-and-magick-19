'use strict';

// Параметры магов
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var NUMBER_SIMILAR_WIZARDS = 4;
var CLASS_TO_DELETE = 'hidden';

var Selectors = {
  // Атрибуты мага
  wizardName: '.setup-similar-label',
  wizardEyesColor: '.wizard-eyes',
  wizardCoatColor: '.wizard-coat',

  // Параметры шаблона
  wizardTemplateTag: '#similar-wizard-template',
  wizardTemplateItem: '.setup-similar-item',

  // Параметры окна
  setupWindow: '.setup',
  setupSimilarPanel: '.setup-similar',
  setupSimilarList: '.setup-similar-list'
};

// Получение шаблона мага
var wizardTemplate = document.querySelector(Selectors.wizardTemplateTag).content.querySelector(Selectors.wizardTemplateItem);

// Отрисовка мага
var renderWizard = function (wizard) {
  var wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector(Selectors.wizardName).textContent = wizard.name;
  wizardElement.querySelector(Selectors.wizardEyesColor).style.fill = wizard.eyesColor;
  wizardElement.querySelector(Selectors.wizardCoatColor).style.fill = wizard.coatColor;
  return wizardElement;
};

// Получение случайного элемента из массива
var getRandomElement = function (arrayElements) {
  return arrayElements[Math.floor(Math.random() * arrayElements.length)];
};

// Создание мага со случайными параметрами
var createWizard = function () {
  var newWizard = {};
  newWizard.name = getRandomElement(NAMES) + ' ' + getRandomElement(SURNAMES);
  newWizard.coatColor = getRandomElement(COAT_COLORS);
  newWizard.eyesColor = getRandomElement(EYES_COLORS);
  return newWizard;
};

// Создание магов для панели похожих
var similarWizards = function () {
  var wizardSimilarList = [];
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < NUMBER_SIMILAR_WIZARDS; i++) {
    wizardSimilarList.push(createWizard());
    fragment.appendChild(renderWizard(wizardSimilarList[i]));
  }
  return fragment;
};

// Удаление класса из тега
var removeClass = function (variable) {
  variable.classList.remove(CLASS_TO_DELETE);
};

// Отображение окна с магами
var setupWindow = document.querySelector(Selectors.setupWindow);
removeClass(setupWindow);

// Добавление магов в список панели похожих
var setupSimilarList = setupWindow.querySelector(Selectors.setupSimilarList);
setupSimilarList.appendChild(similarWizards());

// Отображение панели похожих магов
removeClass(document.querySelector(Selectors.setupSimilarPanel));
