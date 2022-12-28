

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d"); // Задаем стиль 2d

const ground = new Image(); // Класс для работы с картинками
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32; // Ширина/высота одного квадратика

let score = 0; // Общий счет игры

// Генерация еды
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box, // Округялем и задаем координаты еды
  y: Math.floor(Math.random() * 15 + 3) * box  // * box т.к. ширина клетки в px 
};

let snake = [];
snake[0] = { // Начальные координаты головы
  x: 9 * box,
  y: 10 * box
};

let lastDir = 'right'; // Прошлый ход
let dir = 'right'; // Переменная с клавишей

// Проверка нажатия клавиши и запуск функции direction
document.addEventListener("keydown", direction);

// Функция проверки движения змеи
function direction(event) {
  // event передается автоматически и содержит номер кнопки
  if ((event.keyCode == 37 || event.keyCode == 65) ) {
    dir = "left";
  }
  else if ((event.keyCode == 38 || event.keyCode == 87) ) {
    dir = "up";
  }
  else if ((event.keyCode == 39 || event.keyCode == 68) ) {
    dir = "right";
  }
  else if ((event.keyCode == 40 || event.keyCode == 83)) {
    dir = "down";
  }
}

// Функция проверки на поедание хвоста
function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
    }
  }
}

// Функция рисования игры
function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  // Рисуем змейку
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "LimeGreen"; // Рисуем квадрат змейки
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(score, box * 2.5, box * 1.7); // Рисуем счет

  // Положение головы змеи
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Проверка на съеденную еду
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box, // Округялем и задаем координаты еды
      y: Math.floor(Math.random() * 15 + 3) * box  // * box т.к. ширина клетки в px 
    };
  } else {
    // Удаляем последний элемент массива
    snake.pop();
  }

  // Двигаем голову
  flag = false;
  if (dir == "left" && lastDir != "right") {
    snakeX -= box;
    lastDir = dir;
    flag = true;
  }
  if (dir == "right" && lastDir != "left") {
    snakeX += box;
    lastDir = dir;
    flag = true;
  }
  if (dir == "up" && lastDir != "down" ) {
    snakeY -= box;
    lastDir = dir;
    flag = true;
  }
  if (dir == "down" && lastDir != "up") {
    snakeY += box;
    lastDir = dir;
    flag = true;
  }

  if (!flag) {
    if (lastDir == "left") {
      snakeX -= box;
    }
    if (lastDir == "right") {
      snakeX += box;
    }
    if (lastDir == "up") {
      snakeY -= box;
    }
    if (lastDir == "down") {
      snakeY += box;
    }
  }
  let newHead = {
    x: snakeX,
    y: snakeY
  };

  // Проверка на столкновение с хвостом
  eatTail(newHead, snake);

  // Проверка на столкновение со стеной
  if (snakeX < box || snakeX > box * 17
    || snakeY < 3 * box || snakeY > box * 17) {
    clearInterval(game);
  }
  // Добавялем элемент в начало
  snake.unshift(newHead);

}
let game = setInterval(drawGame, 120); // Интервал 120 мили сек запуска drawGame

