// ####################################################################################################
// Новые поля после выбора определенного значения
var currBox = 0;
function Selected(a) {
    document.getElementById("Block" + a).style.display = "block";
    if (currBox) {
        document.getElementById("Block" + currBox).style.display = "none";
    }
    currBox = a;
}

// ####################################################################################################
// Добавление дополнительного номера телефона пользователя
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

// ####################################################################################################
// Получить данные формы и показать их на странице JavaScript

const button = document.querySelector('button');
const form = document.querySelector('#user_data');
const popup = document.querySelector('.popup');

// Кнопка с попап
button.addEventListener('click', () => {
    form.classList.add('open');
    popup.classList.add('popup_open');
    document.getElementById('show_name').innerHTML = document.getElementById('person_name').value;
    document.getElementById('show_email').innerHTML = document.getElementById('person_email').value;
    document.getElementById('show_site').innerHTML = document.getElementById('person_site').value;
    document.getElementById('show_doc').innerHTML = document.querySelector('.messageCheckbox:checked').value;
    document.getElementById('show_regularity').innerHTML = document.querySelector('.regularityMessageCheckbox:checked').value;

});

// Input с отправкой, но проверкой
Test.addEventListener('submit', function (e) {
    e.preventDefault(); //Чтобы форма не отправлялась
    form.classList.add('open');
    popup.classList.add('popup_open');
    document.getElementById('show_name').innerHTML = document.getElementById('person_name').value;
    document.getElementById('show_email').innerHTML = document.getElementById('person_email').value;
    document.getElementById('show_site').innerHTML = document.getElementById('person_site').value;
    document.getElementById('show_doc').innerHTML = document.querySelector('.messageCheckbox:checked').value;
    document.getElementById('show_regularity').innerHTML = document.querySelector('.regularityMessageCheckbox:checked').value;

    return false;
});

// Имя на новой странице
function new_page() {
    var x1 = document.getElementById('person_name').value
    document.write(x1);
}

// ####################################################################################################
//  Расскажите о себе. Активация button при наличии данных во всех input
var inputs = [].slice.call(document.querySelectorAll('input[class="person"]'));
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

// ###########################################################################
// Убедится, что установлен хотя бы один флажок
var inputsSource = [].slice.call(document.querySelectorAll('input[name = "source"]'));
inputsSource.forEach(function (el) {
    el.addEventListener('input', checkInputs, false);
});

function checkInputsSource() {
    var empty = inputs.filter(function (el) {
        return el.value.trim() === '';
    }).length;
    button.disabled = empty !== 0;
}
checkInputsSource();

// команда в submit