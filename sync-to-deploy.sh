#!/usr/bin/env bash
# Sync ../Tuvi/tuvi-server → ./tuvi-server (for deploy)
set -euo pipefail

DEPLOY_ROOT="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$DEPLOY_ROOT/.." && pwd)"
SRC="$PROJECT_ROOT/Tuvi/tuvi-server"
DEST="$DEPLOY_ROOT/tuvi-server"

if [[ ! -d "$SRC" ]]; then
  echo "ERROR: Source not found: $SRC"
  exit 1
fi

mkdir -p "$DEST"

echo "Syncing:"
echo "  from: $SRC"
echo "  to:   $DEST"
echo

if command -v rsync >/dev/null 2>&1; then
  rsync -av --delete \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude 'dist' \
    --exclude 'build' \
    --exclude 'coverage' \
    --exclude '.env' \
    --exclude '.env.*' \
    --exclude '*.log' \
    --exclude '.DS_Store' \
    --exclude 'tmp' \
    --exclude 'logs' \
    --exclude 'cache' \
    "$SRC/" "$DEST/"
else
  echo "rsync not found — using cp fallback."
  TMP="$(mktemp -d)"
  trap 'rm -rf "$TMP"' EXIT

  cp -a "$SRC/." "$TMP/"
  rm -rf \
    "$TMP/node_modules" \
    "$TMP/dist" \
    "$TMP/build" \
    "$TMP/coverage" \
    "$TMP/.env" \
    "$TMP/.git" \
    "$TMP/tmp" \
    "$TMP/logs" \
    "$TMP/cache" \
    "$TMP/.DS_Store" 2>/dev/null || true
  find "$TMP" -name '*.log' -delete 2>/dev/null || true
  find "$TMP" -name '.env.*' -delete 2>/dev/null || true

  # Replace DEST contents but keep node_modules if already installed there
  shopt -s dotglob nullglob
  for item in "$DEST"/*; do
    base="$(basename "$item")"
    [[ "$base" == "node_modules" ]] && continue
    rm -rf "$item"
  done
  shopt -u dotglob nullglob

  cp -a "$TMP/." "$DEST/"
fi

echo
echo "Done. Next steps:"
echo "  cd \"$DEST\""
echo "  yarn install   # or npm install"
echo "  # then commit & push trong deploy-tuvi"
