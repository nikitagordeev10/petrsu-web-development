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
    div.innerHTML = '<p>Телефон: <input type="phone" class="link" placeholder="+1(234)567-89-10"> </p>';
    profile.appendChild(div);
}

function delInput() {
    var div = document.getElementById('input' + x);
    div.remove();
    --x;
}
