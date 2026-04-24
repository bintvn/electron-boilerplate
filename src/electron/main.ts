import { app, BrowserWindow, globalShortcut, ipcMain, Menu, Tray } from "electron"
import { copyFileSync, existsSync } from "fs"
import path from "path"

let win: BrowserWindow | null = null
let tray: Tray | null = null

const isDev = !app.isPackaged
const contextMenu = Menu.buildFromTemplate([
	{
		label: 'Open',
		click: () => {
			if (!win || win.isDestroyed()) {
				createWindow()
			} else {
				if (!win.isVisible())
					win.show()
			}
		}
	},
	{
		label: 'Quit',
		click: () => {
			app.quit()
		}
	}
])
const trayIconPath = isDev
	? path.join(process.cwd(), "src/electron/tray.ico")
	: path.join(process.resourcesPath, "tray.ico")

function createWindow() {
	const preload = isDev
		? path.join(process.cwd(), "dist/electron/preload.js")
		: path.join(__dirname, "preload.js")
	const newWindow = new BrowserWindow({
		width: 400,
		height: 600,
		frame: false,
		resizable: false,
		maximizable: false,
		show: false,
		titleBarStyle: 'hidden',
		webPreferences: {
			preload,
			contextIsolation: true,
			nodeIntegration: false,
			webSecurity: true
		}
	})

	newWindow.setMenu(null)

	if (isDev) {
		newWindow.loadURL("http://localhost:5173")
		newWindow.webContents.on("did-fail-load", () => {
			setTimeout(() => {
				newWindow.reload()
			}, 500)
		})
	} else {
		newWindow.loadFile(path.join(__dirname, "../renderer/index.html"))
	}

	newWindow.on("focus", () => {
		if (isDev) {
			globalShortcut.register("CommandOrControl+Shift+I", () => {
				win?.webContents.openDevTools()
			})

			globalShortcut.register("CommandOrControl+R", () => {
				win?.webContents.reload()
			})
		}
	})

	newWindow.on("blur", () => {
		if (isDev) {
			globalShortcut.unregisterAll()
		}
	})

	newWindow.on("ready-to-show", () => {
		newWindow.show()

		if (isDev) {
			newWindow.webContents.openDevTools({
				mode: "detach",
				activate: true,
				title: "Developer Tools"
			})
		}
	})

	return newWindow
}

function createTray() {
	if (isDev) {
		if (!existsSync(trayIconPath)) {
			const trayIconPathSrc = path.join(process.cwd(), "src", "electron", "tray.ico")
			copyFileSync(trayIconPathSrc, trayIconPath)
		}
	}

	const newtray = new Tray(trayIconPath)

	newtray.setToolTip('WAku Host Agent')
	newtray.setContextMenu(contextMenu)

	newtray.on('click', () => {
		newtray.popUpContextMenu()
	})

	return newtray
}

ipcMain.on("window:minimize", (event) => {
	const win = BrowserWindow.fromWebContents(event.sender)
	win?.minimize()
})

ipcMain.on("window:close", (event) => {
	const win = BrowserWindow.fromWebContents(event.sender)
	win?.close()
})

app.on('window-all-closed', () => {

})

app.whenReady().then(() => {
	tray = createTray()
	win = createWindow()
})
