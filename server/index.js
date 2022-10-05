
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
app.use(morgan("tiny"));
//app.use(express.static("public")); 
app.use(express.static(join(__dirname, "../public")));   
//--------------------------------------------


io.on("connection", (socket) => {
    console.log("new connection: "+socket.id); 
});


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