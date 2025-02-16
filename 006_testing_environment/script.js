function Test() {

    // СТАТИСТИКА ПРАВИЛЬНЫХ ОТВЕТОВ  
    let correctAnswers = 0;

    // ТАБЛИЦА ПРАВИЛЬНЫХ ОТВЕТОВ  
    const answers = {
        Q1: "384 467 км",
        Q2: "4",
        Q3: [false, false, true],
        Q4: 1861,
        Q5: [3, 2, 1],
        Q6: "Пшеница"
    };

    // ПОЛУЧЕНИЕ ВЫБРАННЫХ ПОЛЬЗОВАТЕЛЕМ ВАРИАНТОВ  
    let question1 = document.querySelector('input[name="distance"]:checked').value;

    let question2 = document.querySelector('[name="number_volumes"]').value;

    let question3_a = document.querySelector('[name="3_a"]').checked;
    let question3_b = document.querySelector('[name="3_b"]').checked;
    let question3_c = document.querySelector('[name="3_c"]').checked

    let question4 = document.querySelector('[name="serfdom"]').value;

    let question5_a = document.querySelector('[name="5_a"]').value;
    let question5_b = document.querySelector('[name="5_b"]').value;
    let question5_c = document.querySelector('[name="5_c"]').value;

    let question6 = document.getElementById("question6_text").value;

    // ПРОВЕРКА ПРАВИЛЬНОСТИ ОТВЕТОВ 
    if (question1 == answers.Q1) correctAnswers++;

    if (question2 == answers.Q2) correctAnswers++;

    if (question3_a == answers.Q3[0] && question3_b == answers.Q3[1] && question3_c == answers.Q3[2]) correctAnswers++;

    if (question4 == answers.Q4) correctAnswers++;

    if (question5_a == answers.Q5[0] && question5_b == answers.Q5[1] && question5_c == answers.Q5[2]) correctAnswers++;

    if (question6 == answers.Q6) correctAnswers++;

    // ОЦЕНКА РЕЗУЛЬТАТОВ
    let commentResult = "";
    commentResult += "<p>Ваш результат:" + correctAnswers + "/6</p>"

    if (correctAnswers == 6) commentResult += "<p>Отлично!</p>"
    else if (correctAnswers > 4) commentResult += "<p>Хорошо!</p>";
    else if (correctAnswers > 3) commentResult += "<p>Удовлетворительно!</p>";
    else commentResult += "<p>Плохо!</p>";

    results.innerHTML = commentResult;
    MessageBackground.style.display = 'block';
}

function CloseMessage() {
    MessageBackground.style.display = "none";
}