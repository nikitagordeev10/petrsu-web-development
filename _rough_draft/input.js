// // Нажатия клавиш
// (function () {
//     var pressedKeys = {};

//     function setKey(event, status) {
//         // сохраняет состояние нажатой клавиши
//         var code = event.keyCode;
//         var key;


//         switch (code) {
//             case 32:
//                 key = 'SPACE'; break;
//             case 37:
//                 key = 'LEFT'; break;
//             case 38:
//                 key = 'UP'; break;
//             case 39:
//                 key = 'RIGHT'; break;
//             case 40:
//                 key = 'DOWN'; break;
//             default:
//                 // Преобразуйте ASCII-коды в буквы
//                 key = String.fromCharCode(code);
//         }

//         pressedKeys[key] = status;
//     }

//     document.addEventListener('keydown', function (e) {
//         setKey(e, true);
//     });

//     document.addEventListener('keyup', function (e) {
//         setKey(e, false);
//     });

//     window.addEventListener('blur', function () {
//         pressedKeys = {};
//     });

//     // принимает символ, и возвращает true, если это клавиша была нажата
//     window.input = {
//         isDown: function (key) {
//             return pressedKeys[key.toUpperCase()];
//         }
//     };
// })();