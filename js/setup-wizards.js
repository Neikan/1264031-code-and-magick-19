'use strict';

(function () {

  var NUMBER_SIMILAR_WIZARDS = 4;

  var setupPanelSimilarWizards = window.setup.setupWindow.querySelector('.setup-similar');
  var similarWizardsList = setupPanelSimilarWizards.querySelector('.setup-similar-list');

  // Получение шаблона мага
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Отрисовка мага с данными, пришедшими с сервера
  var renderWizard = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    return wizardElement;
  };

  // Получение магов для добавление в панель похожих
  var getSimilarWizards = function (wizards) {
    window.util.getShuffleArray(wizards);

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < NUMBER_SIMILAR_WIZARDS; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    return fragment;
  };

  // Вывод похожих магов запросом с сервера
  var displaySimilarWizards = function (wizards) {
    similarWizardsList.innerHTML = '';
    similarWizardsList.appendChild(getSimilarWizards(wizards));
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
