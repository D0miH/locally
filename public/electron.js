const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");
const ipcMain = require("electron").ipcMain;
const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 900, height: 680 });
    mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
    mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// allow the socket to broadcast
socket.on("listening", () => socket.setBroadcast(true));
// react when a new message arrives
socket.on("message", (msg, rinfo) => {
    mainWindow.webContents.send("receivedMessage", msg.toString());
});
// listen on port 41234
socket.bind(41234);

// function to send a message
function sendMessage(event, text) {
    let msg = Buffer.from(text);
    socket.send(msg, 41234, "255.255.255.255");
}
// when a the renderer wants to send a message send it using the socket
ipcMain.on("sendMessage", (event, message) => sendMessage(event, message));
