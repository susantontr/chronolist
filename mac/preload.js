const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  setLayout: (mode) => ipcRenderer.send('set-layout', mode),
  onLayoutChanged: (cb) => ipcRenderer.on('layout-changed', (_, mode) => cb(mode)),
  quit: () => ipcRenderer.send('quit'),
  openAddTask: (data) => ipcRenderer.send('open-add-task', data),
  onTaskAdded: (cb) => ipcRenderer.on('task-added', (_, task) => cb(task)),
});
