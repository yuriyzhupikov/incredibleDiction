#!/bin/bash
#chmod +x scripts/start-cli.sh

# Убедимся, что скрипт выполняется в корневой директории проекта
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
cd "$SCRIPT_DIR/.." || exit 1

# Установка переменных окружения (если требуется)
export NODE_ENV=development
export AUDIO_PATH=./audio

# Проверяем, установлен ли Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js не установлен. Установите Node.js и попробуйте снова."
  exit 1
fi

cd "../" || exet 1

echo "Запуск CLI-приложения..."
node -r ./tsconfig-paths-bootstrap.js build/interfaces/cli/cli.app.js "$@"

#./scripts/start-cli.sh record
#./scripts/start-cli.sh analyze
