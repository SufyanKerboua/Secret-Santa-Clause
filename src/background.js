'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import fs from 'fs'
import path from 'path'

const isDevelopment = process.env.NODE_ENV !== 'production'


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])

// 
// Communication Child Process
// 

const dataJSONGroupFolderName = __dirname + "/../src/data/";
let JsonGroups = getJsonData()

function getJsonData() {
  let JsonGroup = []
  let jsonGroupArray = fs.readdirSync(dataJSONGroupFolderName)

  for (let index = 0; index < jsonGroupArray.length; index++) {
    let elem = path.join(__dirname + "/../src/data/", jsonGroupArray[index]);
    let ret = JSON.parse(fs.readFileSync(elem, 'utf-8'))
    JsonGroup.push(ret)
  }
  return JsonGroup;
}

ipcMain.on('get-json-group', (event) => {
  event.sender.send('get-json-group-reply', JSON.stringify(JsonGroups));
})

ipcMain.on('create-json-group', (event, arg) => {
  let obj = JSON.parse(arg);
  console.log("Obj created : ", obj);
  let pathJSONFile = dataJSONGroupFolderName + obj.group_name + ".json";
  console.log("Path to store group : ", pathJSONFile)
  fs.writeFileSync(pathJSONFile, arg);
  JsonGroups = getJsonData();
})


// 
// END Communication Child Process
// 


function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 1000, height: 700, minHeight: 500, minWidth: 900, resizable: true, "use-content-size": true, show: false, webPreferences: {
    nodeIntegration: true
  } })

  if (process.env.WEBPACK_DEV_SERVER_URL) {

    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // Load Debug mode
    if (process.env.IS_TEST) {
      console.log("Debug console\n")
      win.webContents.openDevTools()
    }
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.once('ready-to-show', () => {
    win.show()
  })

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }

  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
