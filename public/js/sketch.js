//import io from "socket.io-client";

let socket = io(); // = io()  = io.connect()    "https://socket-io-paint-magratea.vercel.app/"
function setup() {
    let anchoWin = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
	let altoWin = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
    createCanvas(anchoWin*0.987, altoWin*0.82); 
    background(51);

    //socket = io.connect("http://localhost:3000");
    /*
    socket = io("http://localhost:3002", {
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd"
        }
    });
    */
    //socket = io("http://localhost:4000");
    //socket = io();
    //socket = io("https://socket-io-paint-magratea.vercel.app", { transports : ['websocket'] });
    socket.on("mouse", newDrawing);
}

function newDrawing(data) {
    if (data.id!=socket.id) {
        noStroke();
        fill(255, 0, 100);
        ellipse(data.x, data.y, 36, 36); 
    }
}

function mouseDragged(){
    //console.log(mouseX+", "+mouseY);

    let data = {
        id: socket.id,
        x: mouseX,
        y: mouseY
    }
    socket.emit("mouse", data);

    noStroke();
    fill(255);
    ellipse(mouseX, mouseY, 36, 36);
}
function draw() {

    
}