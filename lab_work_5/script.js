var currBox = 0;
function Selected(a) {
    document.getElementById("Block" + a).style.display = "block";
    if (currBox) {
        document.getElementById("Block" + currBox).style.display = "none";
    }
    currBox = a;
}

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
function btnClick() {
    var Txt1 = "";
    var Txt2 = "";
    Txt1 = document.Test.bt.value;
    Txt2 = document.Test.bt.name;
    document.getElementById('ex1').innerHTML = "<HR>" +
        "<p>Вы нажали кнопку: " + Txt1.bold() +
        " с именем: " + Txt2.bold() + "<\p>" + "<HR>";
}

//
function asdfClick() {

    document.querySelector('#welcome').innerHTML = '<b>Гость</b>, добро пожаловать на сайт!';
}