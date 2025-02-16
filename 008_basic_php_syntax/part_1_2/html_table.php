<!DOCTYPE html>
<html lang="ru">
<head>
    <!-- указываем кодировку страницы и заголовок страницы -->
    <meta charset="utf-8" />
    <title>lab_1_gordeev</title>

    <!-- задаем стили таблицы -->
    <style>
        table {
            table-layout: fixed;
            border: 1px solid black;
            width: 100%;
        }

        td, th {
            width: 2%;
            border: 1px solid black;
        }
        
        td:nth-child(3), /* каждой третьей ячейки */  
        th:nth-child(3) { /* и заголовка таблицы */
            word-break: break-word; /* делаем переносы слов */
            white-space: pre-line; /* сохраняем исходные переносы */
        } 
    </style>
</head>

<body>
    <table>
        <colgroup>
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 45%;">
            <col span="1" style="width: 45%;">
        </colgroup>
        <tbody>
            <!-- Заголовок таблицы -->
            <tr>
                <th>Номер задания</th>
                <th>Решение</th>
                <th>Результат</th>
            </tr>

            <?php
            include 'all_variables.php'; // подключаем файл с общими переменными и функциями

            $dir = scandir("."); // получаем список файлов в текущей директории
            $files = preg_grep("/^(\d+)/", $dir); // оставляем только файлы, которые начинаются с цифры (один или более повторов)
            natsort($files); // сортируем файлы в порядке возрастания

            
            foreach ($files as $task) { // Обрабатываем каждое задание
                echo '<tr>';
                
                $task_num = explode(".", $task); // дробим строку $task на две части
                echo '<td>', $task_num[0], '</td>'; // номер задания

                echo '<td>';
                echo "< ? php\n\n"; // открывающий тег PHP-кода
                $task_handle = fopen($task, "r"); // открываем файл на чтение
                while (!feof($task_handle)) { 
                    $line = fgets($task_handle); // читаем файл построчно
                    echo nl2br($line); // выводим каждую строку с переносом строки
                }
                fclose($task_handle); //  закрываем файл
                echo '</td>';


                echo '<td>';
                include $task; // выполняем код из файла и выводим результат
                echo '<br>', '</td>';

                echo '</tr>'; // закрываем строку
            } 
            ?>
        </tbody>
    </table>
</body>
</html>