const { setClipboardText, ctrlV } = require('./clipboard');
const {setForegroundVRChat} = require('./setForegroundVRChat');

const sendMessageToVRC_Clipboard = (text, subtext) => {
    const isVRCfound = setForegroundVRChat();
    if(isVRCfound){
        setClipboardText(`暃${text}暃穃${subtext}穃`);
        setForegroundVRChat();
        ctrlV();
    }
}

module.exports.sendMessageToVRC_Clipboard = sendMessageToVRC_Clipboard;