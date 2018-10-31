const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");
const ipcMain = require("electron").ipcMain;
const dgram = require("dgram");
const ip = require("ip");

let mainWindow;
let pingIntervalHandle;

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

    // close the sockets
    messageSocket.close();
    pingSocket.close();
});
// if the app is activated on macos create a new window
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
    messageSocket.bind(41234);
    pingSocket.bind(41235);
    clearInterval(pingIntervalHandle);
});

// create a new udp4 messageSocket for receiving
const messageSocket = dgram.createSocket("udp4");
// allow the messageSocket to broadcast
// TODO: disable broadcast. This is not necessary for the messageSocket
messageSocket.on("listening", () => messageSocket.setBroadcast(true));

// callback when a message is received
messageSocket.on("message", (msg, msgInfo) => {
    if (msgInfo.address === ip.address()) {
        // if the source address is the own ip address return
        return;
    } else {
        // else forward the message the the app
        mainWindow.webContents.send("receivedMessage", msg.toString());
    }
});
// when the user wants to send a message send it using the messageSocket
ipcMain.on("sendMessage", (event, message) => {
    let msg = Buffer.from(message);
    messageSocket.send(msg, 41234, "255.255.255.255");
});
// listen on port 41234
messageSocket.bind(41234);

// create a new socket to ping and discover new users
const pingSocket = dgram.createSocket("udp4");
// allow the pingSocket to broadcast
pingSocket.on("listening", () => pingSocket.setBroadcast(true));
// send a broadcast ping every 10 seconds
listenForPings();
// set the callback to receive the ping
pingSocket.on("message", (msg, msgInfo) => {
    console.log(ip.address().toString());
    if (msgInfo.address === ip.address()) {
        // if the source address is the own ip address return
        return;
    } else {
        // check if the received message is "ping". When this is the case, send the source ip to the web application.
        if (msg.toString() === "ping") {
            mainWindow.webContents.send("newUser", ip.address().toString());
        }
    }
});
// listen on port 41235 to receive the ping
pingSocket.bind(41235);

function listenForPings() {
    pingIntervalHandle = setInterval(() => {
        let ping = Buffer.from("ping");
        pingSocket.send(ping, 41235, "255.255.255.255");
    }, 10000);
}
