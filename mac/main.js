const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, screen } = require('electron');
const path = require('path');

let win, addWin, tray, currentLayout = 'v';

function buildTrayMenu() {
  return Menu.buildFromTemplate([
    { label: 'Show Todoline', click: () => { win.show(); win.focus(); } },
    { type: 'separator' },
    {
      label: currentLayout === 'h' ? 'Switch to Vertical' : 'Switch to Horizontal',
      click: () => {
        currentLayout = currentLayout === 'h' ? 'v' : 'h';
        win.webContents.send('layout-changed', currentLayout);
        applyWindowLayout(currentLayout);
        tray.setContextMenu(buildTrayMenu());
      }
    },
    { type: 'separator' },
    { label: 'Quit Todoline', click: () => app.quit() }
  ]);
}

function applyWindowLayout(mode) {
  const display = screen.getPrimaryDisplay();
  const { width: sw, height: sh } = display.workAreaSize;
  if (mode === 'v') {
    win.setSize(100, sh);
    win.setPosition(0, 0);
  } else {
    win.setSize(Math.min(sw, 1400), 100);
    win.setPosition(Math.round((sw - Math.min(sw, 1400)) / 2), 0);
  }
}

function createTray() {
  // 16x16 pink circle as tray icon
  const size = 16;
  const img = nativeImage.createEmpty();
  const canvas = { width: size, height: size };
  // Use a simple template image approach: create a small buffer
  // We'll use a white circle (template image shown as dark/light by macOS)
  // 16x16 pink circle tray icon using raw RGBA buffer
  const iconSize = 16;
  const buf = Buffer.alloc(iconSize * iconSize * 4);
  const cx = 7.5, cy = 7.5, r = 6.5;
  for (let y = 0; y < iconSize; y++) {
    for (let x = 0; x < iconSize; x++) {
      const i = (y * iconSize + x) * 4;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const alpha = Math.max(0, Math.min(1, r - dist + 0.5));
      buf[i]   = 224; // R (#e06c9f)
      buf[i+1] = 108; // G
      buf[i+2] = 159; // B
      buf[i+3] = Math.round(alpha * 255);
    }
  }
  const icon = nativeImage.createFromBuffer(buf, { width: iconSize, height: iconSize });
  tray = new Tray(icon);
  tray.setToolTip('Todoline');
  tray.setContextMenu(buildTrayMenu());
}

function createWindow() {
  const { width: sw, height: sh } = screen.getPrimaryDisplay().workAreaSize;
  win = new BrowserWindow({
    width: 90,
    height: sh,
    alwaysOnTop: false,
    resizable: true,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.setPosition(0, 0);

  win.loadFile('app.html');
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('layout-changed', currentLayout);
  });

  ipcMain.on('quit', () => app.quit());
  ipcMain.on('set-layout', (event, mode) => {
    currentLayout = mode;
    applyWindowLayout(currentLayout);
    tray.setContextMenu(buildTrayMenu());
  });

  ipcMain.on('open-add-task', (_, data) => {
    if (addWin && !addWin.isDestroyed()) { addWin.focus(); return; }
    const { x, y, width } = win.getBounds();
    addWin = new BrowserWindow({
      width: 260,
      height: 230,
      x: Math.round(x + width / 2 - 130),
      y: Math.round(y + 60),
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      resizable: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload-add.js'),
        nodeIntegration: false,
        contextIsolation: true,
      },
    });
    addWin.loadFile('add-task.html');
    addWin.webContents.on('did-finish-load', () => {
      addWin.webContents.send('init', data);
    });
    addWin.on('closed', () => { addWin = null; });
  });

  ipcMain.on('add-task-submit', (_, task) => {
    win.webContents.send('task-added', task);
    if (addWin && !addWin.isDestroyed()) addWin.close();
  });

  ipcMain.on('add-task-cancel', () => {
    if (addWin && !addWin.isDestroyed()) addWin.close();
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

app.on('window-all-closed', () => app.quit());
