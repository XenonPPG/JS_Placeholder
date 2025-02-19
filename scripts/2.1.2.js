//#region Задание #2.1.2.1

// Переменные
var fruits = ["яблоко", "апельсин", "груша", "гранат"];
var fruitBuf = fruits.slice();
var buf = fruits.pop()
fruits.pop()
fruits.push("ананас")
fruits.push(buf)

// Вывод:
alert(`
    изначальный массив = ${fruitBuf}
    изменённый = ${fruits}
`);
//#endregion Задание #2.1.2.1

//#region Задание #2.1.2.2

// Переменные
var arr1 = prompt("Введите массив #1 через запятую:").replace(/\s/g, '').split(',');
var arr2 = prompt("Введите массив #2 через запятую:").replace(/\s/g, '').split(',');

// Вывод:
alert(`
    массив #1 = ${arr1}
    массив #2 = ${arr2}

    объединённые = ${arr1.concat(...arr2)}
`);
//#endregion Задание #2.1.2.2