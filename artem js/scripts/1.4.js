//#region Задание #1.4.1

// Переменные
var str = 'abcde';

// Вывод:
alert(`
    str = ${str}

    Символ #0: ${str.charAt(0)}
    Символ #2: ${str.charAt(2)}
    Символ #4: ${str.charAt(4)}
`);
//#endregion Задание #1.4.1

//#region Задание #1.4.2

// Переменные
var num = 12345;
var sum = 0;
num.toString().split('').forEach(ch => sum += parseInt(ch))

// Вывод:
alert(`
    num = ${num}

    Сумма: ${sum}
`);
//#endregion Задание #1.4.2