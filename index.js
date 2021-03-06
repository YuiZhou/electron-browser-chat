const { app, BrowserWindow, Menu, Tray } = require('electron')
// Module to control application life.
// Module to create native browser window.
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, tray
let iconSrc = path.join(__dirname, 'wx.png');
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    resizable: false,
    icon: iconSrc
  })

  mainWindow.setMenu(null);

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: 'wx.qq.com',
    protocol: 'https:',
    slashes: true
  }))

  tray = new Tray(iconSrc);
  tray.setToolTip('WeChat App');
  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'quit',
      type: 'normal',
      click: function () {
        mainWindow = null;
        process.exit();
      }
    }
  ]));
  tray.on('click', function () {
    mainWindow.show();
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('close', function () {
    if (!app.isQuiting) {
      mainWindow.hide();
    }
    return false;
  })

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
