const path = require('path');
const child_process = require('child_process');
const robot = require("robotjs");



const setClipboardText = (text) => {
    return child_process.execFileSync(path.join(__dirname,"../bin/clipboard.exe"), ['--copy'], { input: text, windowsHide:true });
}

const ctrlV = () => robot.keyTap("v", "control");

module.exports.setClipboardText = setClipboardText;
module.exports.ctrlV = ctrlV;
