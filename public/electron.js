const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");
const ipcMain = require("electron").ipcMain;
const dgram = require("dgram");
const ip = require("ip");

const Messenger = require("./Messenger.js");
const messenger = new Messenger();

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

    // close the sockets
    messenger.close();
});

// if the app is activated on macos create a new window
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// when the user wants to send a message send it using the messageSocket
ipcMain.on("sendMessage", (event, message) => {
    messenger.sendMessage(message, "255.255.255.255");
});

// ###################
// #### MESSENGER ####
// ###################

let sendMessageToApplication = function(msg, msgInfo) {
    if (msgInfo.address === ip.address()) {
        // if the source address is the own ip address return
        return;
    } else {
        // else forward the message the the app
        mainWindow.webContents.send("receivedMessage", msg.toString());
    }
};
// initialize the messenger
messenger.sendOnPort(41234);
messenger.listenOnPort(41234);

messenger.onMessageReceived(sendMessageToApplication);
