"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const electron_1 = require("electron");
const wallpaper_1 = require("./wallpaper");
const fs_1 = __importDefault(require("fs"));
// Fix for GPU/Cache errors
// app.disableHardwareAcceleration();
// Fix for Access Denied Cache errors by using a local user data directory
const userDataPath = node_path_1.default.join(process.cwd(), '.electron-user-data');
if (!fs_1.default.existsSync(userDataPath)) {
    fs_1.default.mkdirSync(userDataPath, { recursive: true });
}
electron_1.app.setPath('userData', userDataPath);
function createWindow() {
    const win = new electron_1.BrowserWindow({
        width: 1280,
        height: 720,
        frame: false,
        transparent: true,
        resizable: false,
        show: false,
        skipTaskbar: true,
        focusable: false,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    // A) Load URL (Next.js / localhost)
    const url = "http://localhost:3000/desktop";
    // B) Vercel URL
    // const url = "https://kisux3.vercel.app/desktop";
    win.loadURL(url);
    win.once("ready-to-show", () => {
        // Expand to full screen
        win.setFullScreen(true);
        win.showInactive();
        // Attach as wallpaper
        (0, wallpaper_1.attachWindow)(win);
    });
    return win;
}
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on("window-all-closed", () => {
    electron_1.app.quit();
});
