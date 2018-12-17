const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");

// include all own modules
const messenger = require("./Messenger.js");
const userManager = require("./UserManager.js");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 900, height: 680, icon: path.join(__dirname, "assets/icons/png/64x64.png") });
    mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
    mainWindow.on("closed", () => (mainWindow = null));

    // set the reference to the main window
    messenger.mainWindow = mainWindow;
    userManager.mainWindow = mainWindow;
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

// ###################
// #### MESSENGER ####
// ###################

// initialize the messenger
messenger.sendOnPort(41234);
messenger.listenOnPort(41234);

// ######################
// #### USER MANAGER ####
// ######################

userManager.sendOnPort(41235);
userManager.listenOnPort(41235);
userManager.activate();
