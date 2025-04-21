#!/data/data/com.termux/files/usr/bin/bash

echo "⏳ Starte Installation für Termux..."

# Update & Paketinstallation
pkg update -y && pkg upgrade -y
pkg install -y imagemagick git nodejs ffmpeg libwebp mc nano yarn

# Alte Sessions und Module entfernen
echo "♻️ Bereinige alte Daten..."
rm -rf session.json 
rm -rf node_modules

# Abhängigkeiten installieren
echo "📦 Installiere Abhängigkeiten..."
yarn install || npm install

# Start
echo "🚀 Starte den Bot..."
node ./starter.js
