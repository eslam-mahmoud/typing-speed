const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
// require NPM modules
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
const html_path = path.join(__dirname, 'app', 'view', 'html');
const css_path = path.join(__dirname, 'app', 'view', 'css');
const js_path = path.join(__dirname, 'app', 'view', 'js');

//Create/re-create the main window of the app
function createWindow() {
    //Create the main window
    mainWindow = new BrowserWindow({
        height: 800,
        width: 500
    });
    //set the view file
    mainWindow.loadURL(
        url.format({
            pathname: path.join(html_path, 'index.html'),
            protocol: 'file:',
            slashes: true
        })
    );
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object
        mainWindow = null
    });

    //register the listener for keystrocks
    listenToKeystrockes();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

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
    if (mainWindow === null) {
        createWindow()
    }
})
