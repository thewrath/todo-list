# Overview

This project is a simple task list API written with Node.js, it puts into practice the good practices of object-oriented design including SOLID principles. This project is not aim to in a production environment and does not rely on libraries designed for this purpose (error handling and HTTP request managment are done without libraries).

## ✔️ Features
  * CRUD for task management
  * Filter for task searching
  * Dependancies injection of services for controller
  * API Error handling
  * Try of async await use (it can be better)
  * SQLite3 database

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
## 🃏 Test

Test are write in `test` folder with the jest framework from Facebook

```
$ npm run server:test
```

## 🏗️ Dependencies

## ⚙️ TODO
  * 
  
## 🔧 TO FIX 
  * 


