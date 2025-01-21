#!/bin/bash
#chmod +x scripts/start-cli.sh

# Make sure that the script is executed in the root directory of the project
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
cd "$SCRIPT_DIR/.." || exit 1

export NODE_ENV=development
export AUDIO_PATH=.upload/audio

# Проверяем, установлен ли Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed. Install Node.js and try again."
  exit 1
fi

cd "../" || exet 1

echo "Start CLI-app..."
node -r ./tsconfig-paths-bootstrap.js build/interfaces/cli/cli.app.js "$@"
