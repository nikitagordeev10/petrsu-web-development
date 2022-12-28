// // =============== СПРАЙТ КАРТА ===============
// (function () {
//     // Конструктор класса Sprite.
//     function Sprite(url, pos, size, speed, frames, dir, once) {
//         this.pos = pos; // x и y координаты изображения на спрайт карте
//         this.size = size; // размеры (только одного кадры)
//         this.speed = typeof speed === 'number' ? speed : 0; // скорость анимации в фрейм/с
//         this.frames = frames; // массив индексов фреймов в порядке анимации
//         this._index = 0;
//         this.url = url; // путь к изображению
//         this.dir = dir || 'horizontal'; // в каком направлении двигаться по спрайт карте
//         this.once = once; // отобразить только один цикл анимации
//     };

//     // Каждый спрайт должен быть обновлён для каждого фрейма.
//     Sprite.prototype = {
//         // метод update, для обновления анимации
//         update: function (dt) {
//             this._index += this.speed * dt;
//         },

//         // метод render, для отрисовки себя (основная логика анимации)
//         render: function (ctx) {
//             var frame;
            
//             // кадр должен быть отрисован
//             if (this.speed > 0) {
//                 var max = this.frames.length;
//                 var idx = Math.floor(this._index);
//                 frame = this.frames[idx % max];

//                 if (this.once && idx >= max) {
//                     this.done = true;
//                     return;
//                 }
//             }
//             else {
//                 frame = 0;
//             }

//             // рассчитывает его координаты на спрайт карте
//             var x = this.pos[0];
//             var y = this.pos[1];

//             if (this.dir == 'vertical') {
//                 y += frame * this.size[1];
//             }
//             else {
//                 x += frame * this.size[0];
//             }

//             // ctx.drawImage для отрисовки кадра
//             ctx.drawImage(resources.get(this.url),
//                 x, y,
//                 this.size[0], this.size[1],
//                 0, 0,
//                 this.size[0], this.size[1]);
//         }
//     };

//     window.Sprite = Sprite;
// })();