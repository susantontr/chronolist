const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('addTaskAPI', {
  onInit: (cb) => ipcRenderer.on('init', (_, data) => cb(data)),
  submit: (task) => ipcRenderer.send('add-task-submit', task),
  cancel: () => ipcRenderer.send('add-task-cancel'),
});
