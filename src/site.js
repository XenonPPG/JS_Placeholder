// gears
const gear1 = document.getElementById("gear1");
const gear2 = document.getElementById("gear2");
const gear3 = document.getElementById("gear3");

let deg = 5;
setInterval(() => {
    deg++;
    gear1.style = `transform: rotate(${deg}deg);`;
    gear2.style = `transform: rotate(${-deg/2}deg);`;
    gear3.style = `transform: rotate(${deg*3}deg);`;
}, 40);

const fileInput = document.getElementById("file_input");
//#region fileInput 

function updateValue(newValue, cursorPos) {
    // Проверяем, не остался ли только суффикс ".js"
    let finalValue = newValue + ".js";
    if (finalValue === ".js") {
        finalValue = "";
        cursorPos = 0; // Сбрасываем позицию курсора
    }
    
    fileInput.value = finalValue;
    cursorPos = Math.min(cursorPos, newValue.length);
    fileInput.setSelectionRange(cursorPos, cursorPos);
}

fileInput.addEventListener('keydown', function(e) {
    const rawValue = fileInput.value.replace(/\.js$/, '');
    let start = fileInput.selectionStart;
    let end = fileInput.selectionEnd;
    const hasSelection = start !== end;
    
    // Обработка ввода символов с заменой выделения
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const newValue = rawValue.slice(0, start) + e.key + rawValue.slice(end);
        updateValue(newValue, start + 1);
    }
    
    // Обработка Backspace
    else if (e.key === 'Backspace') {
        e.preventDefault();
        if (hasSelection) {
            const newValue = rawValue.slice(0, start) + rawValue.slice(end);
            updateValue(newValue, start);
        } else if (start > 0) {
            const newValue = rawValue.slice(0, start - 1) + rawValue.slice(start);
            updateValue(newValue, start - 1);
        }
    }
    
    // Обработка Delete
    else if (e.key === 'Delete') {
        e.preventDefault();
        if (hasSelection) {
            const newValue = rawValue.slice(0, start) + rawValue.slice(end);
            updateValue(newValue, start);
        } else if (start < rawValue.length) {
            const newValue = rawValue.slice(0, start) + rawValue.slice(start + 1);
            updateValue(newValue, start);
        }
    }
});

fileInput.addEventListener('paste', function(e) {
    e.preventDefault();
    const pasteData = (e.clipboardData || window.clipboardData).getData('text');
    const rawValue = fileInput.value.replace(/\.js$/, '');
    let start = fileInput.selectionStart;
    let end = fileInput.selectionEnd;
    
    const newValue = rawValue.slice(0, start) + pasteData + rawValue.slice(end);
    updateValue(newValue, start + pasteData.length);
});

// Блокировка курсора в .js части (прежний обработчик)
fileInput.addEventListener('keyup', function() {
    const maxPos = fileInput.value.length - 3;
    if (fileInput.selectionStart > maxPos) {
        fileInput.setSelectionRange(maxPos, maxPos);
    }
});
//#endregion

const output = document.getElementById("output");
function RunFile(){
    document.getElementById("output").innerHTML = "";
    const scripts = document.querySelectorAll('script[src]');
    const fileUrl = "../scripts/" + fileInput.value;

    // 1. Удаляем все скрипты, кроме main.js
    scripts.forEach(script => {
        const basePath = script.src.split('?')[0];
        if (!basePath.endsWith('main.js')) {
            script.remove();
        }
    });

    // 2. Добавляем новый скрипт с уникальным URL
    const newScript = document.createElement('script');
    newScript.src = `${fileUrl}?r=${Math.random()}`; // Случайный параметр
    newScript.async = true;
    document.head.appendChild(newScript);
}

(function() {
    const originalAlert = window.alert;
    
    window.alert = function(message) {
        if (output) {
            output.innerHTML += `<span style="color: gray;">Вывод:</span> ${message}</br>`;
        }
        originalAlert(message);
    };
})();

(function() {
    const originalPrompt = window.prompt;
    
    window.prompt = function(message) {
        // Вызываем оригинальный prompt и получаем ответ пользователя
        const userInput = originalPrompt.apply(this, arguments);
        
        if (output) {
            // Форматируем запись с учетом отмены (null)
            const displayValue = userInput === null ? '[отменено]' : userInput;
            output.innerHTML += `<span style="color: gray;">Ввод:</span> ${message} = ${displayValue}</br>`;
        }
        
        return userInput;
    };
})();