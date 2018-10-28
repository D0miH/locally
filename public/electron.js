const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");
const ipcMain = require("electron").ipcMain;
const dgram = require("dgram");
const ip = require("ip");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 900, height: 680, icon: path.join(__dirname, "assets/icons/png/64x64.png") });
    mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
    mainWindow.on("closed", () => (mainWindow = null));
}

// create the window when the app is ready
app.on("ready", createWindow);
// when the window is closed quit the app
app.on("window-all-closed", () => {
    // when the os is MacOS don't quit the app
    if (process.platform !== "darwin") {
        app.quit();
    }
});
// if the app is activated on macos create a new window
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// create a new udp4 socket
const socket = dgram.createSocket("udp4");
// allow the socket to broadcast
socket.on("listening", () => socket.setBroadcast(true));

// callback when a message is received
socket.on("message", (msg, msgInfo) => {
    if (msgInfo.address === ip.address()) {
        // if the source address is the own ip address return
        return;
    } else {
        // else forward the message the the app
        mainWindow.webContents.send("receivedMessage", msg.toString());
    }
});

// when the user wants to send a message send it using the socket
ipcMain.on("sendMessage", (event, message) => {
    let msg = Buffer.from(message);
    socket.send(msg, 41234, "255.255.255.255");
});

// listen on port 41234
socket.bind(41234);
