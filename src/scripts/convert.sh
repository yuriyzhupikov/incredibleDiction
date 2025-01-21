#!/bin/bash

# Проверка на наличие ffmpeg
if ! command -v ffmpeg &> /dev/null
then
    echo "ffmpeg is not installed. Install it before using it."
    exit 1
fi

# Проверка аргумента
if [ -z "$1" ]; then
    echo "Use: ./convert.sh path/to/file.mp3"
    exit 1
fi

# Путь к файлу
INPUT_FILE="$1"

# Проверка существования файла
if [ ! -f "$INPUT_FILE" ]; then
    echo "The file $INPUT_FILE was not found!"
    exit 1
fi

node convert.js "$INPUT_FILE"
