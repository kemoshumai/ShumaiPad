const { U } = require('win32-api');

const setForegroundVRChat = () => {
    const user32 = U.load();
    const title = 'VRChat\0';
    const lpszWindow = Buffer.from(title, 'ucs2')
    const hWnd = user32.FindWindowExW(0, 0, null, lpszWindow)
    if (typeof hWnd === 'number' && hWnd > 0 || typeof hWnd === 'bigint' && hWnd > 0 || typeof hWnd === 'string' && hWnd.length > 0)
    {
        const res = user32.SetForegroundWindow(hWnd);
        return true;
    }
    else
    {
        console.log("VRChat windows is Not Found.");
        return false;
    }
}

module.exports.setForegroundVRChat = setForegroundVRChat;