const path = require('path');
const child_process = require('child_process');
const robot = require("robotjs");



const setClipboardText = (text) => {
    return child_process.spawnSync(path.join(__dirname,"../bin/clipboard.exe"), ['--copy'], { input: text, shell: false });
}

const ctrlV = () => robot.keyTap("v", "control");

module.exports.setClipboardText = setClipboardText;
module.exports.ctrlV = ctrlV;
