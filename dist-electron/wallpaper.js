"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachWindow = attachWindow;
const koffi_1 = __importDefault(require("koffi"));
const os_1 = __importDefault(require("os"));
// Constants
const SMTO_NORMAL = 0x0000;
// 0x052C is undocumented message used to trigger the creation of WorkerW
const WM_SPAWN_WORKER = 0x052C;
function attachWindow(window) {
    if (os_1.default.platform() !== 'win32') {
        return;
    }
    const handle = window.getNativeWindowHandle();
    // Koffi can accept the Buffer directly as a pointer/handle
    const hwnd = handle;
    try {
        const user32 = koffi_1.default.load('user32.dll');
        // Define Types
        const HWND = koffi_1.default.pointer('HWND', koffi_1.default.opaque());
        const BOOL = koffi_1.default.alias('BOOL', 'int');
        // Define Functions
        const FindWindowA = user32.func('FindWindowA', HWND, ['str', 'str']);
        // Note: koffi.pointer('char') for buffer output
        const GetClassNameA = user32.func('GetClassNameA', 'int', [HWND, koffi_1.default.pointer('char'), 'int']);
        const SendMessageTimeoutA = user32.func('SendMessageTimeoutA', 'long', [HWND, 'uint', 'long', 'long', 'uint', 'uint', 'long*']);
        const FindWindowExA = user32.func('FindWindowExA', HWND, [HWND, HWND, 'str', 'str']);
        const SetParent = user32.func('SetParent', HWND, [HWND, HWND]);
        // Generic EnumWindows callback using raw pointer
        const EnumWindowsProc = koffi_1.default.proto('bool EnumWindowsProc(HWND hwnd, long lParam)');
        const EnumWindows = user32.func('EnumWindows', BOOL, [koffi_1.default.pointer(EnumWindowsProc), 'long']);
        // 1. Find Progman
        const progman = FindWindowA('Progman', null);
        if (!progman) {
            console.error('Could not find Progman window');
            return;
        }
        // 2. Send Message to Progman to spawn WorkerW
        let result = Buffer.alloc(8);
        console.log("Sending WM_SPAWN_WORKER message to Progman...");
        SendMessageTimeoutA(progman, 0x052C, 0, 0, SMTO_NORMAL, 1000, result);
        // 3. Iterate all windows to find the specific WorkerW
        // Strategy: Find all "WorkerW" windows. One has SHELLDLL_DefView (icons), the other doesn't (wallpaper).
        let workerw = null;
        // Buffer for ClassName
        const classNameBuf = Buffer.alloc(256);
        const onWindow = (tophandle, lparam) => {
            // Get Class Name
            const len = GetClassNameA(tophandle, classNameBuf, 256);
            if (len === 0)
                return true;
            const className = classNameBuf.toString('utf8', 0, len);
            if (className === 'WorkerW') {
                // Check if it has SHELLDLL_DefView
                const shellDll = FindWindowExA(tophandle, null, 'SHELLDLL_DefView', null);
                if (shellDll) {
                    console.log("Found Icon WorkerW (SHELLDLL_DefView) at:", tophandle);
                }
                else {
                    console.log("Found Wallpaper WorkerW (Candidate) at:", tophandle);
                    workerw = tophandle;
                    // We found it!
                    return false;
                }
            }
            return true; // Continue
        };
        // Register callback
        const cb = koffi_1.default.register(onWindow, koffi_1.default.pointer(EnumWindowsProc));
        EnumWindows(cb, 0);
        koffi_1.default.unregister(cb);
        if (workerw) {
            console.log('Attaching to WorkerW:', workerw);
            SetParent(hwnd, workerw);
        }
        else {
            console.error('Could not find suitable WorkerW (No WorkerW without SHELLDLL_DefView found)');
        }
    }
    catch (err) {
        console.error('Failed to attach window:', err);
    }
}
