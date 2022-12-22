function Test() {

    let correctAnswers = 0;

    const answers = {
        Q1: 2022,
        Q2: "ПетрГУ",
        Q3: [false, true, true, false],
        Q4: "right",
        Q5: 1940,
        Q6: [3, 1, 2]
    };

    // 1 вопрос текст
    let yearLab = document.getElementById("text").value;

    // 2 вопрос radio
    let petrsu1 = document.getElementById('petrsu').checked; // checked - проверка нажатия
    let petrsu2 = document.getElementById('other1').checked;
    let petrsu3 = document.getElementById('other2').checked;

    let valuePetrsu1 = document.getElementById('petrsu').value;
    let valuePetrsu2 = document.getElementById('other1').value;
    let valuePetrsu3 = document.getElementById('other2').value;

    // 3 вопрос checkbox
    let a = document.querySelector('[name="a"]').checked;
    let b = document.querySelector('[name="b"]').checked;
    let c = document.querySelector('[name="c"]').checked;
    let d = document.querySelector('[name="d"]').checked;

    // 4 вопрос select
    let noise = document.querySelector('[name="noise"]').value;

    // 5 вопрос number
    let yearPetrsu = document.querySelector('[name="yearPetrsu"]').value;

    // 6 вопрос сопоставление вопросов
    let aAnswer = document.querySelector('[name="aAnswer"]').value;
    let bAnswer = document.querySelector('[name="bAnswer"]').value;
    let cAnswer = document.querySelector('[name="cAnswer"]').value;

    //Проверка вопросов
    // 1 
    if (yearLab == answers.Q1) {
        correctAnswers++;
    }

    // 2
    if (petrsu1 && valuePetrsu1 == answers.Q2) {
        correctAnswers++;
    }
    else if (petrsu2 && valuePetrsu2 == answers.Q2) {
        correctAnswers++;
    }
    else if (petrsu3 && valuePetrsu3 == answers.Q2) {
        correctAnswers++;
    }
    // 3
    if (a == answers.Q3[0] && b == answers.Q3[1] && c == answers.Q3[2] && d == answers.Q3[3]) {
        correctAnswers++;
    }

    //4
    if (noise == answers.Q4) {
        correctAnswers++;
    }

    //5
    if (yearPetrsu == answers.Q5) {
        correctAnswers++;
    }

    //6
    if (aAnswer == answers.Q6[0] && bAnswer == answers.Q6[1] && cAnswer == answers.Q6[2]) {
        correctAnswers++;
    }
    

    let forResults = "";
    forResults += "<p>Ваш результат:" + correctAnswers + "/6</p>"

    if (correctAnswers == 6) {
        forResults += "<p>Все правильно!!!</p> <p>Твое звание - Senior</p>"
    }
    else if (correctAnswers > 4) {
        forResults += "<p>Неплохая работа!</p> <p>Твое звание - Middle</p>";
    }
    else if (correctAnswers > 3) {
        forResults += "<p>Можно было лучше</p> <p>Твое звание - Junior</p>";
    }
    else {
        forResults += "<p>Плохо, учись</p> <p>Твое звание: Student</p>";
    }
    
    results.innerHTML = forResults;
    msgBg.style.display = 'block';

}

function CloseMsg() {
    msgBg.style.display = "none";
}

function CloseMsg() {
    msgBg.style.display = "none";
}