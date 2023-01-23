# NotTwitter Project 🐦
[![Coverage Status](https://coveralls.io/repos/github/SyTW2223/E07/badge.svg?branch=production)](https://coveralls.io/github/SyTW2223/E07?branch=production)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=SyTW2223_E07&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=SyTW2223_E07)
[![CD](https://github.com/SyTW2223/E07/actions/workflows/DockerHub.yml/badge.svg)](https://github.com/SyTW2223/E07/actions/workflows/DockerHub.yml)
[![CI](https://github.com/SyTW2223/E07/actions/workflows/ExpressAPI.yml/badge.svg)](https://github.com/SyTW2223/E07/actions/workflows/ExpressAPI.yml)

## Autores ✍️

- [Sergio Mellado Martin](https://www.github.com/alu0101326351)
- [Mario Hernández García](https://github.com/alu0101346908)
## Descripción 📋
Este repositorio contiene el código fuente de la aplicación web NotTwitter, una copia de Twitter desarrollada como proyecto universitario de la asignatura de Sistemas y tecnologías Web del Grado en Ingeniería Informática de la Universidad de La Laguna.

Utilizamos el stack MEVN (MongoDB, Express, Vue.js y Node.js) para desarrollar nuestra aplicación, y hemos incorporado herramientas de integración continua como GitHub Actions, Slack y PivotalTracker para mejorar nuestro flujo de trabajo.

Nuestro objetivo es replicar las principales funcionalidades de Twitter, como la publicación de tweets, poder seguir a otros usuarios, etc.

## Pre-requisitos 📋
Debes tener previamente instalado NodeJS en su versión v16.3.0.
- [Node.js](https://nodejs.org/es/)
## Instalación de Not-Twitter
```bash
    git clone https://github.com/SyTW2223/E07
    cd E07
    npm i
```
## Fichero de variables de entorno del Backend (/backend/.env) ⚙️

```bash
    DATABASE_USER=XXXX
    DATABASE_NAME=XXXX
    DATABASE_PASSWORD=XXXX
    DATABASE_HOST=XXXX.XX
    DATABASE_PORT=XXXX
    BACKEND_PORT=XXXX
    JWT_SECRET=XXXX
```
## Fichero de variables de entorno del Front (/.env) ⚙️

```bash
    VITE_BACKEND_URL=XXXX
```
## Ejecución de la API ⚙️
```bash
    npm run build:express
    npm run prod:express
```
## Ejecución del Backend (VUE) ⚙️

```bash
    npm run build
    npm run preview
```

## Licencia 🏫
[MIT](https://choosealicense.com/licenses/mit/)