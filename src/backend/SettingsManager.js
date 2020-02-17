'use strict'

// External Module
// const fs = require('fs');
// const path = require('path');
const electron = require('electron');

class SettingsManager {
    constructor() {
        this.win;
    }
    createPopUp (paramUser) {
        this.win = new electron.BrowserWindow({ width: 375, height: 667, resizable: false, "use-content-size": true, show: false, webPreferences: {
            nodeIntegration: true
          } });
        // win2.loadURL(urlParam, { userAgent: 'Chrome' });
        console.log("path : ", __dirname);
        console.log("path : ", {__dirname});
        // this.win.loadURL("file://${__dirname}/../src/backend/indexSettings.html");

        if (process.env.WEBPACK_DEV_SERVER_URL) {

            console.log("Serv url : ", process.env.WEBPACK_DEV_SERVER_URL)
    
            // Load the url of the dev server if in development mode
            this.win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + "settings?userMail=" + paramUser)
            // Load Debug mode
            if (process.env.IS_TEST) {
                console.log("Debug console\n")
                this.win.webContents.openDevTools()
            }
        }
    
        this.win.once('ready-to-show', () => {
            this.win.show()
        })
        
    }
    closePopUp() {
        this.win.close();
    }
}

module.exports = SettingsManager;