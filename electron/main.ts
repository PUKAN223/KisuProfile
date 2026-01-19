import path from "node:path";
import { app, BrowserWindow } from "electron";
import { attachWindow } from "./wallpaper";
import fs from "fs";

// Fix for GPU/Cache errors
// app.disableHardwareAcceleration();

// Fix for Access Denied Cache errors by using a local user data directory
const userDataPath = path.join(process.cwd(), '.electron-user-data');
if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath, { recursive: true });
}
app.setPath('userData', userDataPath);

function createWindow() {
  const win = new BrowserWindow({
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
    attachWindow(win);
  });

  return win;
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
