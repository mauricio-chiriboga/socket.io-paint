/*
//===================================================
//-- PARA IMPORTAR Y NO USAR REQUIRE
//   SE AGRAGA "type": "module" AL package.json 
//      const morgan = require('morgan');
//      const express = require("express");  
//===================================================
//  SE EJECUTA CON ...
//  npm run dev O CON
//  nodemon server/index.js
//
//  http://localhost:4000/
//===================================================
//-- MODULO DE SERVIDOR MEJORADO
import express from "express";
//-- MODULO DE TIEMPO DE CARGA (CONSOLA)
import morgan from "morgan";
//-- MODULO DE COMUNICACION
import {Server as SocketServer} from "socket.io";
//-- MODULO DE PROTOCOLO HTTP
import http from "http";
//-- PARA CONECTARSE CON SOCKET.IO DESDE OTROS PUERTOS
//import cors from "cors";
import {PORT} from "./config.js";
//-- PARA CREAR LA VARIABLE __dirname - CON REQUIRE SI EXISTE 
//   PERO CON IMPORT HAY Q CREARLA
import { dirname, join } from "path";
import { fileURLToPath } from "url";
//===================================================

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
//console.log(join(__dirname, "../public"));
//-- SOCKET.IO REQUIERE CREAR UN SERVER HTTP
const server = http.createServer(app);
const io = new SocketServer(server);
//--------------------------------------------
//app.use(cors()); 
//app.use(morgan("tiny"));
//app.use(express.static("public")); 
app.use(express.static(join(__dirname, "../public")));   
//--------------------------------------------


io.on("connection", newConnection);
function newConnection(socket) {
    console.log("new connection: "+socket.id); 
    
    socket.on("mouse", mouseMsg);
    function mouseMsg(data) {
        socket.broadcast.emit("mouse", data);
        //console.log(data); 
    }
    
}

 
//--------------------------------------------
//app.listen(PORT);
server.listen(PORT);
//console.log("Server2 on port", PORT);
console.log("Socket server is running on "+PORT);  
//--------------------------------------------
*/

const express = require("express");  
const app = express();
//-----
const socketServer = require("socket.io");
const http = require("http");

const server = http.Server(app);
const io = new socketServer(server);
//-----


//const server = require('http').Server(app);
//const io = require('socket.io')(server);
//--
const port = process.env.PORT || 3000;
const join = require("path").join;

app.use(express.static(join(__dirname, "../public"))); 

io.on('connection', (socket) => {
  socket.on('mouse', msg => {
    io.emit('mouse', msg);
  });
});


server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});


//-- LO QUE FUNCIONA
/*
const express = require("express"); 
const app = express();

//const app = require('express')(); 
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const join = require("path").join;


//app.get('/', (req, res) => {
//  res.sendFile(join(__dirname, "../public/index.html"));
//});


app.use(express.static(join(__dirname, "../public"))); 
io.on('connection', (socket) => {
  socket.on('mouse', msg => {
    io.emit('mouse', msg);
  });
});

//http.listen(port, () => {
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
*/