//#region Задание #1.5.1

// Переменные
var hour = prompt("Введите часы:");
var day = prompt("Введите дни:");
var month = prompt("Введите месяца:");

// Вывод:
alert(`
    Количество секунд в ${hour} часах: ${hour*60*60}
    Количество секунд в ${day} днях: ${hour*60*60*24}
    Количество секунд в ${month} месяцах: ${hour*60*60*24*30}
`);
//#endregion Задание #1.5.1

//#region Задание #1.5.2

// Переменные
var now = new Date(Date.now());
var hour = now.getHours();
var minute = now.getMinutes();
var second = now.getSeconds();

// Вывод:
alert(`
    == Текущее время ==
    ${hour}:${minute}:${second}
`);
//#endregion Задание #1.5.2

//#region Задание #1.5.3

// Переменные
var num = prompt("Введите число:");

// Вывод:
alert(`
    квадрат = ${num*num}
`);
//#endregion Задание #1.5.3