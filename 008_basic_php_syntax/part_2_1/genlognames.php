<?php

$user_rname = $argv[1];    # исходное имя 
$user_lname = "";        # имя латиницей
$user_pass  = "";        # пароль

function allLettersRussianCheck($name) { // проверяет, что текст на русском языке
    $flag = preg_match("/[^\p{Cyrillic}]/ui", $name); // [всё кроме кирилич. симв], utf8, люб. регистр 
    if ($flag != 0) {
        echo 'Имя должно состоять только из кириллических символов', "\n";
        exit(1);
    }
}


if ($user_rname == null){
    exit(45);
}

function latinize($russian_name) { // преобразование стр. с руск. симв. в стр. с латинск. симв.
    $alpha = array( // массив соответствий символов
        "а" => "a",
        "б" => "b",
        "в" => "v",
        "г" => "g",
        "д" => "d",
        "е" => "e",
        "ё" => "e",
        "ж" => "zh",
        "з" => "z",
        "и" => "i",
        "й" => "i",
        "к" => "k",
        "л" => "l",
        "м" => "m",
        "н" => "n",
        "о" => "o",
        "п" => "p",
        "р" => "r",
        "с" => "s",
        "т" => "t",
        "у" => "u",
        "ф" => "f",
        "х" => "kh",
        "ц" => "c",
        "ч" => "ch",
        "ш" => "sh",
        "щ" => "sch",
        "ь" => "",
        "ы" => "y",
        "ъ" => "",
        "э" => "e",
        "ю" => "yu",
        "я" => "ya"
    );

    allLettersRussianCheck($russian_name); // все буквы русские?
    
    $english_name = "";
    for ($i = 0; $i < mb_strlen($russian_name, "UTF-8"); $i++) { // посимв. замена русских букв
        $character = mb_substr($russian_name, $i, 1, "UTF-8"); // извлекаем символ в позиции $i
        $english_name .= $alpha[$character]; // добавляем соответствующее значение из массива $alpha к строке
    }
    return $english_name;
}

$user_lname = latinize(mb_strtolower($user_rname, "utf8")); // латинизация строки, приведенной к нижнему регистру
 
$user_pass = exec("pwgen -1 -c -B"); // пароль: 1 вар, 1 заглавная, не исп неоднозн. символы

echo $user_lname, "\n", $user_pass; // вывод на экран полученного имени и пароля

// php genlognames.php никита
// php genlognames.php АнДрЕй
// php genlognames.php АЛЕКСАНДР123
// php genlognames.php Alexander
?>

