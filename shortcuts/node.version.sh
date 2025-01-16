#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 

nvm_version=$(<$HOME/.nvmrc)
echo "Version in .nvmrc is $nvm_version"

if [[ -z "$nvm_version" ]]; then
  echo "Error: .nvmrc file is empty or not found."
  exit 1
fi

resolved_nvm_version=$(nvm ls --no-colors "$nvm_version" | tail -1 | tr -d '\->*' | tr -d '[:space:]')

if [[ "$resolved_nvm_version" == "N/A" ]]; then
  nvm install "$nvm_version";
fi

if [[ $(nvm current) != "$resolved_nvm_version" ]]; then
  nvm use "$nvm_version"
fi

echo "Version $(nvm current) is currently"