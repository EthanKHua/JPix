const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    getImages: () => ipcRenderer.invoke('get-images'),
    captureRect: (x, y, width, height) => ipcRenderer.invoke('capture', x, y, width, height)
})