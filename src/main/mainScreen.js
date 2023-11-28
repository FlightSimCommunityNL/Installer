const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const path = require("path");

class MainScreen {
    window;

    position = {
        width: 1280,
        height: 800,
        maximized: false,
    };

    constructor() {
        this.window = new BrowserWindow({
            width: this.position.width,
            height: this.position.height,
            title: "Installer",
            show: false,
            removeMenu: true,
            autoHideMenuBar: true,
            icon: 'icon.ico',
            backgroundColor: '#1b2434',
            webPreferences: {
                devTools: false,
                nodeIntegration: true,
                contextIsolation: false,
                preload: path.join(__dirname, "updatePreload.js"),
            },
        });

        this.window.once("ready-to-show", () => {
            this.window.show();

            if (this.position.maximized) {
                this.window.maximize();
            }
        });

        this.handleMessages();

        let wc = this.window.webContents;
        wc.openDevTools({ mode: "undocked" });

        this.window.loadFile("./src/main/index.html");
    }

    showMessage(message) {
        console.log("showMessage trapped");
        console.log(message);
        this.window.webContents.send("updateMessage", message);
    }

    close() {
        this.window.close();
        ipcMain.removeAllListeners();
    }

    hide() {
        this.window.hide();
    }

    handleMessages() {
        //Ipc functions go here.
    }
}

module.exports = MainScreen;