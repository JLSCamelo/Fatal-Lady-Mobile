#!/bin/sh
set -eu

PROJECT_ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
NPMRC_BYPASS="${HOME}/.config/fatal-lady/npmrc"

mkdir -p "$(dirname "$NPMRC_BYPASS")"
: > "$NPMRC_BYPASS"

unset CHROME_DESKTOP
unset ELECTRON_RUN_AS_NODE
unset VSCODE_CLI

export NPM_CONFIG_GLOBALCONFIG="$NPMRC_BYPASS"
export BROWSER=none
export EXPO_NO_TELEMETRY=1

cd "$PROJECT_ROOT"
exec ./node_modules/.bin/expo start --web "$@"
