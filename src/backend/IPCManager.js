'use strict'

// External Module
const fs = require('fs');
const path = require('path');
const electron = require('electron');

// Intern Module
let MailManager = require("./MailManager");
let SettingsManager = require('./SettingsManager.js');

const dataJSONGroupFolderName = __dirname + "/../src/data/groups/";

class IPCManager {
    constructor() {
        this.getJsonData();
        this.myMailManager = new MailManager();
        this.settingsManager = new SettingsManager();
    }

    ListenerAll() {

        electron.ipcMain.on('open-settings-pop-up', () => {
            this.settingsManager.createPopUp();
        })

        // Not used for the moment
        electron.ipcMain.on('close-settings-pop-up', (event, param) => {
            this.settingsManager.closePopUp()
            console.log("param send (askip c est la mail) :", param);
        })

        electron.ipcMain.on('get-json-group', (event) => {
            event.sender.send('get-json-group-reply', JSON.stringify(this.JsonGroups));
        })

        electron.ipcMain.on('get-reloaded-json-group', (event) => {
            this.getJsonData();
            console.log("JSON GROUPS : ",this.JsonGroups);
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
            await this.myMailManager.connectGmailAccount();
            if (this.myMailManager.mailAvailable()) {
                this.myMailManager.sendMail(JSON.parse(arg));
            } else {
                event.sender.send('send-mails-error');
            }
        })

        electron.ipcMain.on('delete-group', (event, param) => {
            console.log("Group to delete : ", param);

            if (fs.existsSync(dataJSONGroupFolderName + param + '.json'))
                fs.unlinkSync(dataJSONGroupFolderName + param + '.json');
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