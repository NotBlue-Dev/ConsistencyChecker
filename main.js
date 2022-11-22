const electron = require('electron');
const { mainManager } = require('./index');
const ChainEventEmitter = require('./src/ChainEventEmitter');
const EventEmitter = require('events');
const path = require('path');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

const { app, BrowserWindow, ipcMain } = electron;

const uiEventEmitter = (webContents) => {
  return {
    send: (channel, args) => {
      if ((typeof webContents.send) === 'function') {
        webContents.send(channel, args);
        // console.log('event send ', channel, args)
      } else {
        console.log('can not send event');
      }
    },
    on: (channel, callable) => {
      ipcMain.on(channel, function (event, args) {
        // console.log('event received ', channel)
        callable(args, event);
      });
    }
  };
};

const stdEventEmitter = () => {
  const eventEmitter = new EventEmitter();
  return {
    send: eventEmitter.emit,
    on: eventEmitter.on,
  };
};

const start = (webContents) => {
  const eventEmitter = new ChainEventEmitter();
  eventEmitter.add(stdEventEmitter());
  eventEmitter.add(uiEventEmitter(webContents));
  

  const player = new mainManager(
      __dirname,
      eventEmitter
  );
  player.start();
};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'viewer', 'preload.js')
    }
  });

  mainWindow.loadFile('viewer/index.html').then(() => {
    mainWindow.webContents.openDevTools();
    start(mainWindow.webContents);
  })
  .catch((err) => console.error(err));
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    stdEventEmitter().send('app.kill');
    app.quit();
  }
});

