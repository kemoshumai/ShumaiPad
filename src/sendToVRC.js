const { setClipboardText, ctrlV } = require('./clipboard');
const {setForegroundVRChat} = require('./setForegroundVRChat');
const robot = require('robotjs');

const sendMessageToVRC_Clipboard = (text, subtext) => {
    const isVRCfound = setForegroundVRChat();
    if(isVRCfound){
        setClipboardText(`暃${text}暃穃${subtext}穃`);
        setForegroundVRChat();
        ctrlV();
        robot.keyTap('y');
    }
}

module.exports.sendMessageToVRC_Clipboard = sendMessageToVRC_Clipboard;