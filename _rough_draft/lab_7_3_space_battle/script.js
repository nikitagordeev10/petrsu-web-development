// ================================ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ================================

//
var requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// ------------------------ Нажатия клавиш ------------------------
(function () {
    var pressedKeys = {};

    function setKey(event, status) {
        // сохраняет состояние нажатой клавиши
        var code = event.keyCode;
        var key;


        switch (code) {
            case 32:
                key = 'SPACE'; break;
            case 37:
                key = 'LEFT'; break;
            case 38:
                key = 'UP'; break;
            case 39:
                key = 'RIGHT'; break;
            case 40:
                key = 'DOWN'; break;
            default:
                // Преобразуйте ASCII-коды в буквы
                key = String.fromCharCode(code);
        }

        pressedKeys[key] = status;
    }

    document.addEventListener('keydown', function (e) {
        setKey(e, true);
    });

    document.addEventListener('keyup', function (e) {
        setKey(e, false);
    });

    window.addEventListener('blur', function () {
        pressedKeys = {};
    });

    // принимает символ, и возвращает true, если это клавиша была нажата
    window.input = {
        isDown: function (key) {
            return pressedKeys[key.toUpperCase()];
        }
    };
})();


// ------------------------ Спрайт карта ------------------------
(function () {
    // Конструктор класса Sprite.
    function Sprite(url, pos, size, speed, frames, dir, once) {
        this.pos = pos; // x и y координаты изображения на спрайт карте
        this.size = size; // размеры (только одного кадры)
        this.speed = typeof speed === 'number' ? speed : 0; // скорость анимации в фрейм/с
        this.frames = frames; // массив индексов фреймов в порядке анимации
        this._index = 0;
        this.url = url; // путь к изображению
        this.dir = dir || 'horizontal'; // в каком направлении двигаться по спрайт карте
        this.once = once; // отобразить только один цикл анимации
    };

    // Каждый спрайт должен быть обновлён для каждого фрейма.
    Sprite.prototype = {
        // метод update, для обновления анимации
        update: function (dt) {
            this._index += this.speed * dt;
        },

        // метод render, для отрисовки себя (основная логика анимации)
        render: function (ctx) {
            var frame;

            // кадр должен быть отрисован
            if (this.speed > 0) {
                var max = this.frames.length;
                var idx = Math.floor(this._index);
                frame = this.frames[idx % max];

                if (this.once && idx >= max) {
                    this.done = true;
                    return;
                }
            }
            else {
                frame = 0;
            }

            // рассчитывает его координаты на спрайт карте
            var x = this.pos[0];
            var y = this.pos[1];

            if (this.dir == 'vertical') {
                y += frame * this.size[1];
            }
            else {
                x += frame * this.size[0];
            }

            // ctx.drawImage для отрисовки кадра
            ctx.drawImage(resources.get(this.url),
                x, y,
                this.size[0], this.size[1],
                0, 0,
                this.size[0], this.size[1]);
        }
    };

    window.Sprite = Sprite;
})();

// ------------------------ Загрузка ресурсов и запуск игры ------------------------
(function () {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    // Загрузите URL-адрес изображения или массив URL-адресов изображений
    function load(urlOrArr) {
        if (urlOrArr instanceof Array) {
            urlOrArr.forEach(function (url) {
                _load(url);
            });
        }
        else {
            _load(urlOrArr);
        }
    }

    function _load(url) {
        if (resourceCache[url]) {
            return resourceCache[url];
        }
        else {
            var img = new Image();
            img.onload = function () {
                resourceCache[url] = img;

                if (isReady()) {
                    readyCallbacks.forEach(function (func) { func(); });
                }
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }

    function get(url) {
        return resourceCache[url];
    }

    function isReady() {
        var ready = true;
        for (var k in resourceCache) {
            if (resourceCache.hasOwnProperty(k) &&
                !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    function onReady(func) {
        readyCallbacks.push(func);
    }

    window.resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();

// ------------------------------------------------ 

// проверка на пересечения
function collides(x, y, r, b, x2, y2, r2, b2) {
    return !(r <= x2 || x > r2 ||
        b <= y2 || y > b2);
}

// принимающая массивы с положением и размером каждого элемента
function boxCollides(pos, size, pos2, size2) {
    return collides(pos[0], pos[1],
        pos[0] + size[0], pos[1] + size[1],
        pos2[0], pos2[1],
        pos2[0] + size2[0], pos2[1] + size2[1]);
}

// обходим циклом массивы сущностей и отрисовывает их
function renderEntities(list) {
    for (var i = 0; i < list.length; i++) {
        renderEntity(list[i]);
    }
}

// трансформацию canvas для размещения объекта на экране
function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.starships.render(ctx);
    ctx.restore();
}

//

// ================================ ЦИКЛ ИГРЫ ================================

// Создаём тег. Задаём ширину и высоту. ctx - перем. для отображ. всех элементов
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1500;
canvas.height = 800;
document.body.appendChild(canvas);

var lastTime;

function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0; // разница между текущим временем и временем последнего обновления

    update(dt);
    render();

    // Постановка в очередь следующего цикла
    lastTime = now;
    requestAnimFrame(main);
};

// Загрузка ресурсов и запуск игры
function init() {
    // фоновое изображение
    spacePattern = ctx.createPattern(resources.get('space.png'), 'repeat');

    document.getElementById('play-again').addEventListener('click', function () {
        reset();
    });

    reset();
    lastTime = Date.now();
    main();
}

resources.load([
    'starships.png',
    'space.png'
]);
resources.onReady(init);

// ================================ СОСТОЯНИЕ ИГРЫ ================================

var player = {
    pos: [0, 0],
    starships: new Sprite('starships.png', [0, 0], [39, 39], 16, [0, 1])
};

var shots = []; // пули
var enemies = []; // враги
var explosions = []; // взрывы

var lastFire = Date.now(); // игрок последний раз выстрелил
var gameTime = 0; // как долго запущена игра
var isGameOver; // закончена ли игра
var spacePattern; // изображение местности

// Скорость в пикселях в секунду
var playerSpeed = 200;
var shotSpeed = 500;
var enemySpeed = 100;

// ================================ ОБНОВЛЕНИЕ СЦЕНЫ ================================

function update(dt) {
    gameTime += dt;

    handleInput(dt);
    updateEntities(dt);

    // Добавляем врагов на карту. Используется это уравнение: 1-.993^gameTime
    if (Math.random() < 1 - Math.pow(.993, gameTime)) {
        enemies.push({
            pos: [canvas.width, Math.random() * (canvas.height - 39)],
            // обход спрайтов
            starships: new Sprite('starships.png', [0, 78], [80, 39], 6, [0, 1, 2, 3, 2, 1])
        });
    }

    checkCollisions();
};

// ================================ ОБРАБОТКА НАЖАТИЯ КЛАВИШ ================================

function handleInput(dt) {
    if (input.isDown('DOWN') || input.isDown('s')) {
        player.pos[1] += playerSpeed * dt;
    }

    if (input.isDown('UP') || input.isDown('w')) {
        player.pos[1] -= playerSpeed * dt;
    }

    if (input.isDown('LEFT') || input.isDown('a')) {
        player.pos[0] -= playerSpeed * dt;
    }

    if (input.isDown('RIGHT') || input.isDown('d')) {
        player.pos[0] += playerSpeed * dt;
    }

    if (input.isDown('SPACE') &&
        !isGameOver && Date.now() - lastFire > 100) {
        var x = player.pos[0] + player.starships.size[0] / 2;
        var y = player.pos[1] + player.starships.size[1] / 2;

        shots.push({
            pos: [x, y],
            starships: new Sprite('starships.png', [0, 39], [18, 8])
        });

        lastFire = Date.now();
    }
}

// ================================ СУЩНОСТИ ================================

function updateEntities(dt) {

    // Обновление анимации спрайтов игрока.
    player.starships.update(dt);

    // Обновление пуль
    for (var i = 0; i < shots.length; i++) {
        var shot = shots[i];

        switch (shot.dir) {
            case 'up': shot.pos[1] -= shotSpeed * dt; break;
            case 'down': shot.pos[1] += shotSpeed * dt; break;
            default:
                shot.pos[0] += shotSpeed * dt;
        }

        // Удаление пули, если она выходит за пределы экрана
        if (shot.pos[1] < 0 || shot.pos[1] > canvas.height || shot.pos[0] > canvas.width) {
            shots.splice(i, 1);
            i--;
        }
    }

    // Обновление врагов
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].pos[0] -= enemySpeed * dt;
        enemies[i].starships.update(dt);

        // Удалить, если за кадром
        if (enemies[i].pos[0] + enemies[i].starships.size[0] < 0) {
            enemies.splice(i, 1);
            i--;
        }
    }

    // Обновление взрывов
    for (var i = 0; i < explosions.length; i++) {
        explosions[i].starships.update(dt);

        // Удалить, если анимация завершена
        if (explosions[i].starships.done) {
            explosions.splice(i, 1);
            i--;
        }
    }
}

// ================================ ОТСЛЕЖИВАНИЕ СТОЛКНОВЕНИЙ ================================

// обнаруживает столкновения
function checkCollisions() {
    checkPlayerBounds();

    // Враги и пули
    for (var i = 0; i < enemies.length; i++) {
        var pos = enemies[i].pos;
        var size = enemies[i].starships.size;

        for (var j = 0; j < shots.length; j++) {
            var pos2 = shots[j].pos;
            var size2 = shots[j].starships.size;

            if (boxCollides(pos, size, pos2, size2)) {

                // Удаление врага
                enemies.splice(i, 1);
                i--;

                // Добавление сущности взрыва
                explosions.push({
                    pos: pos,
                    starships: new Sprite('starships.png', [0, 117], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], null, true)
                });

                // Удаление пули. Остановка внутреннего цикла перебора пуль, так как врага уже не существует
                shots.splice(j, 1);
                break;
            }
        }
        
        // проверяем столкновения игрока и врага
        if (boxCollides(pos, size, player.pos, player.starships.size)) {
            gameOver();
        }
    }
}

// не даёт игроку выйти за пределы карты, держа его координаты в пределах 0 и canvas.width/canvas.height
function checkPlayerBounds() {
    // влево
    if (player.pos[0] < 0) {
        player.pos[0] = 0;
    }

    // вправо
    else if (player.pos[0] > canvas.width - player.starships.size[0]) {
        player.pos[0] = canvas.width - player.starships.size[0];
    }

    // вниз
    if (player.pos[1] < 0) {
        player.pos[1] = 0;
    }
    
    // вверх
    else if (player.pos[1] > canvas.height - player.starships.size[1]) {
        player.pos[1] = canvas.height - player.starships.size[1];
    }
}

// ================================ РЕНДЕР ================================

// вызываться наших игровым циклом для отображения сцены каждого фрейма
function render() {
    // отрисовка фона
    ctx.fillStyle = spacePattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // рисуем игрока
    if (!isGameOver) {
        renderEntity(player);
    }

    // рисуем пули, врагов и взрывы
    renderEntities(shots);
    renderEntities(enemies);
    renderEntities(explosions);
};

// ================================ ИГРА ОКОНЧЕНА ================================

function gameOver() {
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over-overlay').style.display = 'block';
    isGameOver = true;
}

function reset() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-over-overlay').style.display = 'none';
    isGameOver = false;
    gameTime = 0;

    enemies = [];
    shots = [];

    player.pos = [50, canvas.height / 2];
};
