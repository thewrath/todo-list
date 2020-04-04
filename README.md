# TODO List Web extension and API

## Overview

This project is a simple task list API written with Node.js, it applies good practices of object-oriented design including SOLID principles. This project is not aim to be in a production environment and does not rely on libraries designed for this purpose (error handling and HTTP request managment are done without libraries).

![alt text](https://github.com/thewrath/todo-list/blob/master/examples/preview/preview_mini.png)

## ✔️ Features
  * CRUD for task management
  * Filter for task searching
  * Dependancies injection of services for controller
  * API Error handling
  * Try of async await use (it can be better)
  * SQLite3 database
  * ES6 with eslint standard
  * .env configuration file

## 🏗️ Installation
```js
$ npm install
```

## 🤖 Usage
The project is divided into two parts, the API written in Node.js, and a client (a Firefox webExtension) that consumes this API.

The server launches with this command (he's listening in on port 3000):
```js
$ npm run server:start
```
The WebExtension is located in the examples folder and can be installed using Firefox `about:debugging` page.

## 🃏 Test

The tests are not automatic, you have to load them in Postman.

## 🏗️ Dependencies
  * hapi
  * hapi-cors
  * dotenv
  * esm
  * sqlite3
 
## ⚙️ TODO
  * Update in GUI
  * Tags display in GUI
  * Date display in GUI
  * Add OAuth compatibilty with JSON Web Token
  
## 🔧 TO FIX 
  * Better try/catch and error management
  * Better filter implementation


