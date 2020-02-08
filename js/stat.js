'use strict';

(function () {

  // Параметры облака
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_COLOR = '#FFF';

  // Параметры тени облака
  var SHADOW_SLIP = 10;
  var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

  // Параметры сообщения
  var TEXT_WIN_MESSAGE = 'Ура вы победили!';
  var TEXT_LIST_RESULTS = 'Список результатов:';
  var TEXT_COLOR = '#000';
  var TEXT_FONT = '16px PT Mono';
  var TEXT_LINE_SPACING = 20;

  // Смещение текста и гистограммы
  var SLIP_X = 50;
  var SLIP_Y = 40;

  // Параметры гистограммы
  var BAR_GRAPH_HEIGHT = 150;
  var BAR_GRAPH_WIDTH = 40;
  var BAR_GRAPH_SPACING = 50;
  var CURRENT_PLAYER_NAME = 'Вы';
  var CURRENT_PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';

  // Получение цвета гистограммы для игрока
  var getPlayerColor = function (playerName) {
    if (playerName === CURRENT_PLAYER_NAME) {
      return CURRENT_PLAYER_BAR_COLOR;
    }
    return 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, ' + '77%)';
  };

  // Отрисовка облака/тени
  var renderCTX = function (ctx, color, x, y) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  // Отрисовка сообщения
  var renderText = function (ctx, text, x, y) {
    ctx.fillStyle = TEXT_COLOR;
    ctx.font = TEXT_FONT;
    ctx.fillText(text, x, y);
  };

  // Максимальное время прохождения игры
  var getMaxResult = function (results) {
    var maxResult = 0;

    for (var i = 0; i < results.length; i++) {
      if (results[i] > maxResult) {
        maxResult = results[i];
      }
    }
    return Math.floor(maxResult);
  };

  // Отрисовка гистограммы
  var renderHistogram = function (ctx, playerName, playerTime, maxTime, count) {
    var pointX = CLOUD_X + SLIP_X + (BAR_GRAPH_WIDTH + BAR_GRAPH_SPACING) * count;
    var pointY = CLOUD_Y + CLOUD_HEIGHT;
    var ratioPlayer = Math.floor(playerTime) / maxTime;

    renderText(ctx, playerName, pointX, pointY - TEXT_LINE_SPACING); // Имя игрока
    renderText(ctx, Math.floor(playerTime), pointX, pointY - TEXT_LINE_SPACING * 2.5 - BAR_GRAPH_HEIGHT * ratioPlayer); // Результат игрока

    ctx.fillStyle = getPlayerColor(playerName);
    ctx.fillRect(pointX, pointY - TEXT_LINE_SPACING * 2, BAR_GRAPH_WIDTH, -BAR_GRAPH_HEIGHT * ratioPlayer);
  };

  // Экран успешного прохождения уровня
  window.renderStatistics = function (ctx, players, times) {
    renderCTX(ctx, SHADOW_COLOR, CLOUD_X + SHADOW_SLIP, CLOUD_Y + SHADOW_SLIP); // Тень
    renderCTX(ctx, CLOUD_COLOR, CLOUD_X, CLOUD_Y); // Облако
    renderText(ctx, TEXT_WIN_MESSAGE, SLIP_X * 3, SLIP_Y); // Победное сообщение
    renderText(ctx, TEXT_LIST_RESULTS, SLIP_X * 3, SLIP_Y + TEXT_LINE_SPACING); // Сообщение о результатах

    // Вывод статистики по игрокам
    for (var i = 0; i < players.length; i++) {
      renderHistogram(ctx, players[i], times[i], getMaxResult(times), i);
    }
  };
})();
