'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var CLOUD_CORNER = 10;

var COLUMN_WIDTH = 40;
var COLUMN_HEIGHT = 150;
var COLUMN_GAP = 50;

var FONT_GAP = 16;

function renderCloud (ctx, x, y, color) {
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y - CLOUD_CORNER);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH - CLOUD_CORNER, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_HEIGHT + CLOUD_CORNER);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x - CLOUD_CORNER, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

function getMax (times) {
  var maxItem = times[0];

  times.forEach(function (item) {
    if (item > maxItem) maxItem = item;
  });

  return maxItem;
}

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + 2 * CLOUD_CORNER, CLOUD_Y +  FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + 2 * CLOUD_CORNER, CLOUD_Y + 2 * FONT_GAP);

  var maxColumn = getMax (times);

  for (var i = 0; i < times.length; i++) {
    ctx.fillText(names[i], CLOUD_X + CLOUD_CORNER * 2 + (COLUMN_GAP + COLUMN_WIDTH) * i,  CLOUD_Y + CLOUD_HEIGHT - 2 * FONT_GAP);

    var saturation = Math.floor(Math.random() * 100)
    names[i] === 'Вы' ? ctx.fillStyle = 'rgba(255, 0, 0, 1)' : ctx.fillStyle = 'hsl(240, ' + saturation + '%, 50%)';

    var itemHeight = COLUMN_HEIGHT * times[i] / maxColumn;
    ctx.fillRect(CLOUD_X + CLOUD_CORNER * 2 + (COLUMN_GAP + COLUMN_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - 3 * FONT_GAP - itemHeight, COLUMN_WIDTH, itemHeight);

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + CLOUD_CORNER * 2 + (COLUMN_GAP + COLUMN_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - 4 * FONT_GAP - itemHeight);
  }
}
