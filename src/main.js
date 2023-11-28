const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const MainScreen = require("./main/mainScreen");
// const UpdateScreen = require("./update/updateScreen");
const { autoUpdater, AppUpdater } = require("electron-updater");
const path = require("path");

let curWindow;

//Basic flags
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        title: "Installer",
        show: true,
        removeMenu: true,
        autoHideMenuBar: true,
        icon: 'icon.ico',
        backgroundColor: '#1b2434',
        webPreferences: {
            devTools: false,
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, './main/mainPreload.js')
        },
    })

    win.loadFile('./src/main/index.html')
}

// function createWindow() {
//     curWindow = new MainScreen();
// }

// function createUpdateWindow() {
//     curWindow = new UpdateScreen();
// }

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
});

/*New Update Available*/
autoUpdater.on("update-available", (info) => {
    curWindow.showMessage(`Update available. Current version ${app.getVersion()}`);
    let pth = autoUpdater.downloadUpdate();
    curWindow.showMessage(pth);
});

autoUpdater.on("update-not-available", (info) => {
    curWindow.showMessage(`No update available. Current version ${app.getVersion()}`);
});

/*Download Completion Message*/
autoUpdater.on("update-downloaded", (info) => {
    curWindow.showMessage(`Update downloaded. Current version ${app.getVersion()}`);
});

autoUpdater.on("error", (info) => {
    curWindow.showMessage(info);
});




//Global exception handler
process.on("uncaughtException", function (err) {
    console.log(err);
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});