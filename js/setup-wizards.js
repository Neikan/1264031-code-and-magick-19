'use strict';

(function () {

  var NUMBER_SIMILAR_WIZARDS = 4;

  var similarWizardsArray = [];
  var eyesColor = window.player.wizardEyesColor.style.fill;
  var coatColor = window.player.wizardCoatColor.style.fill;

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

  // Отрисовка магов на панели похожих
  var renderSimilarWizards = function (wizards) {
    similarWizardsList.innerHTML = '';
    for (var i = 0; i < NUMBER_SIMILAR_WIZARDS; i++) {
      similarWizardsList.appendChild(renderWizard(wizards[i]));
    }
  };

  // Ранжирование похожих магов
  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  // Обновление списка похожих магов при изменении цвета
  var updateSimilarWizards = function () {
    renderSimilarWizards(similarWizardsArray.slice().
      sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = similarWizardsArray.indexOf(left) - similarWizardsArray.indexOf(right);
        }
        return rankDiff;
      }));
  };

  var updateSimilarWizardEyesHandler = window.util.debounce(function (color) {
    eyesColor = color;
    updateSimilarWizards();
  });

  var updateSimilarWizardCoatHandler = window.util.debounce(function (color) {
    coatColor = color;
    updateSimilarWizards();
  });

  // Вывод похожих магов запросом с сервера с учетом цветов дефолтного мага игрока
  var displaySimilarWizards = function (response) {
    similarWizardsArray = response;
    updateSimilarWizardEyesHandler(eyesColor);
    updateSimilarWizardCoatHandler(coatColor);
    updateSimilarWizards();
  };

  var displayOffSimilarWizards = function () {
    window.util.addClass(setupPanelSimilarWizards, window.setup.CLASS_TO_DELETE);
  };

  window.wizards = {
    setupPanelSimilarWizards: setupPanelSimilarWizards,
    displaySimilarWizards: displaySimilarWizards,
    displayOffSimilarWizards: displayOffSimilarWizards,
    updateSimilarWizardCoatHandler: updateSimilarWizardCoatHandler,
    updateSimilarWizardEyesHandler: updateSimilarWizardEyesHandler
  };

})();
