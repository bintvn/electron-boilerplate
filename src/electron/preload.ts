import { contextBridge, ipcRenderer } from "electron"
import type { ElectronAPI } from "./types"

const api: ElectronAPI = {
	ping: () => "pong",
	minimize: () => ipcRenderer.send("window:minimize"),
	close: () => ipcRenderer.send("window:close")
}

contextBridge.exposeInMainWorld("api", api)