'use strict';

(function () {

  var NUMBER_SIMILAR_WIZARDS = 4;
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var setupPanelSimilarWizards = window.setup.setupWindow.querySelector('.setup-similar');
  var similarWizardsList = setupPanelSimilarWizards.querySelector('.setup-similar-list');

  // Получение шаблона мага
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Создание мага со случайными параметрами
  var createWizard = function () {
    return {
      name: window.util.getRandomElement(NAMES) + ' ' + window.util.getRandomElement(SURNAMES),
      coatColor: window.util.getRandomElement(window.player.COAT_COLORS),
      eyesColor: window.util.getRandomElement(window.player.EYES_COLORS)
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

  // Отрисовка мага c вручную сгеренрированными данными
  var renderWizard = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    return wizardElement;
  };

  // Получение магов для добавление в панель похожих
  var getSimilarWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < NUMBER_SIMILAR_WIZARDS; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    return fragment;
  };

  // Вывод похожих магов
  var displaySimilarWizards = function () {
    similarWizardsList.innerHTML = '';
    similarWizardsList.appendChild(getSimilarWizards(createSimilarWizards()));
    window.util.removeClass(setupPanelSimilarWizards, window.setup.CLASS_TO_DELETE);
  };

  var displayOffSimilarWizards = function () {
    window.util.addClass(setupPanelSimilarWizards, window.setup.CLASS_TO_DELETE);
  };

  window.wizards = {
    displaySimilarWizards: displaySimilarWizards,
    displayOffSimilarWizards: displayOffSimilarWizards
  };

})();
