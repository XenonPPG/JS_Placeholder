import os
import subprocess

def copy2clip(txt):
    cmd='echo '+txt.strip()+'|clip'
    return subprocess.check_call(cmd, shell=True)

os.system('cls')
num = input("Введите номер задания: ")
print("\nВводите переменные через ENTER\nПример: a=2 (без = для prompt). Пустая строка для остановки")
vars = {}
while True:
    inp = input(f"Переменная #{len(vars) + 1}: ")
    if inp == "":
        break
    if "=" in inp:
        parts = inp.split(' = ')
        vars[parts[0]] = parts[1]
    else:
        vars[inp] = f'prompt("Введите {inp}:")'
# processing
with open(f'scripts/copy.js', "w", encoding='utf-8') as file:
    file.write(f"//#region Задание #{num}\n\n// Переменные")
    for key in vars.keys():
        file.write(f'\nvar {key} = {vars[key]};')
    file.write(f"\n\n// Вывод:\n")
    file.write("alert(`")
    for key in vars.keys():
        file.write(f'\n    {key} = ' + '${' + key + "}")
    file.write(f'\n`);\n//#endregion Задание #{num}')
print(f"Файл сохранен в scripts/copy.js")

with open("scripts/copy.js", "r", encoding="utf-8") as file:
    copy2clip(file.read())