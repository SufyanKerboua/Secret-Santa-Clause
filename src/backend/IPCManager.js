'use strict'

// External Module
const fs = require('fs');
const path = require('path');
const electron = require('electron');

// Intern Module
let MailManager = require("./MailManager");
let SettingsManager = require('./SettingsManager.js');

const dataJSONGroupFolderName = __dirname + "/../src/data/groups/";
const dataJSONUserMail = __dirname + "/../src/data/userMail.json";

class IPCManager {
    constructor() {
        this.getJsonData();
        this.myMailManager = new MailManager();
        this.settingsManager = new SettingsManager();
    }

    ListenerAll() {

        electron.ipcMain.on('send-mail-viewer', (event) => {
            event.sender.send('send-mail-viewer-reply', this.myMailManager.createMailTemplate());
        })

        electron.ipcMain.on('open-settings-pop-up', (event) => {
            let jsonUserMail = JSON.parse(fs.readFileSync(dataJSONUserMail));
            console.log("json User Mail : ", jsonUserMail.userMail);
            if (jsonUserMail.userMail == undefined)
                jsonUserMail.userMail = ""; 
            this.settingsManager.createPopUp(jsonUserMail.userMail);
            event.sender.send('current-mail', jsonUserMail);
        })

        electron.ipcMain.on('close-settings-pop-up', (event, param) => {
            this.settingsManager.closePopUp()
            console.log("param send (askip c est la mail) :", param);
            fs.writeFileSync(dataJSONUserMail, JSON.stringify({userMail: param}));
        })

        electron.ipcMain.on('get-json-group', (event) => {
            event.sender.send('get-json-group-reply', JSON.stringify(this.JsonGroups));
        })
    
        electron.ipcMain.on('create-json-group', (event, arg) => {
            let obj = JSON.parse(arg);
            console.log("Obj created : ", obj);
            let pathJSONFile = dataJSONGroupFolderName + obj.group_name + ".json";
            console.log("Path to store group : ", pathJSONFile)
            fs.writeFileSync(pathJSONFile, arg);
            this.getJsonData();
        })

        electron.ipcMain.on('send-mails', async (event, arg) => {

            if (this.myMailManager.mailAvailable()) {
                await this.myMailManager.connectGmailAccount();
                this.myMailManager.sendMail(JSON.parse(arg));
            } else {
                event.sender.send('send-mails-error');
            }
        })
          
    }

    getJsonData() {
        let arrayJsonGroup = []
        let allGroupFilenames = fs.readdirSync(dataJSONGroupFolderName)
        
        for (let index = 0; index < allGroupFilenames.length; index++) {
            let groupFullPath = path.join(dataJSONGroupFolderName, allGroupFilenames[index]);
            arrayJsonGroup.push(JSON.parse(fs.readFileSync(groupFullPath, 'utf-8')))
        }
        this.JsonGroups = arrayJsonGroup;
    }
}

module.exports = IPCManager;