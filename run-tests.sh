#!/bin/bash

echo "========================================="
echo "Iniciando sistema StockFlow para pruebas..."
echo "========================================="

node index.js &
SERVER_PID=$!

sleep 3

echo "========================================="
echo "Ejecutando suite de pruebas con Mocha..."
echo "========================================="

npx mocha test/**/*.test.js

echo "========================================="
echo "Deteniendo el servidor de pruebas..."
echo "========================================="

kill $SERVER_PID

echo "¡Automatización de pruebas finalizada con éxito!"