#!/bin/bash

# Проверка на наличие ffmpeg
if ! command -v ffmpeg &> /dev/null
then
    echo "ffmpeg не установлен. Установите его перед использованием."
    exit 1
fi

# Проверка аргумента
if [ -z "$1" ]; then
    echo "Использование: ./convert.sh path/to/file.mp3"
    exit 1
fi

# Путь к файлу
INPUT_FILE="$1"

# Проверка существования файла
if [ ! -f "$INPUT_FILE" ]; then
    echo "Файл $INPUT_FILE не найден!"
    exit 1
fi

# Запуск Node.js скрипта
node convert.js "$INPUT_FILE"
