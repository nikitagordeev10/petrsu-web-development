var currBox = 0;
function Selected(a) {
    document.getElementById("Block" + a).style.display = "block";
    if (currBox) {
        document.getElementById("Block" + currBox).style.display = "none";
    }
    currBox = a;
}

//  Добавление номера телефона пользователя
var x = 0;
function addInput() {
    var profile = document.getElementById('profile');
    var div = document.createElement('div');
    div.id = 'input' + ++x;
    div.innerHTML = '<p>Телефон: <input type="tel" id="phone" name="phone" placeholder="+1(234)567-89-10" pattern="[+]{1}[0-9]{11,14}" required> </p>';
    profile.appendChild(div);
}

function delInput() {
    var div = document.getElementById('input' + x);
    div.remove();
    --x;
}


// Вывод информации о пользователе
const button = document.querySelector('button');
const form = document.querySelector('#blablabla');
const popup = document.querySelector('.popup');

button.addEventListener('click', () => {
    form.classList.add('open');
    popup.classList.add('popup_open');
    document.getElementById('name').innerHTML = document.getElementById('form-name').value;
});

// Test.addEventListener('submit', function (e) {
//     var point = 0;
//     // e.preventDefault(); //Чтобы форма не отправлялась
//     // document.getElementById('name').innerHTML = document.getElementById('form-name').value;
//     document.write(point);
// });

function test() {
    var point = 0;

    document.write(point);
}


//  Обязательность полей
var inputs = [].slice.call(document.querySelectorAll('input[class="necessarily"]'));
inputs.forEach(function (el) {
    el.addEventListener('input', checkInputs, false);
});

function checkInputs() {
    var empty = inputs.filter(function (el) {
        return el.value.trim() === '';
    }).length;
    button.disabled = empty !== 0;
}
checkInputs();