const { setClipboardText, ctrlV } = require('./clipboard');
const {setForegroundVRChat} = require('./setForegroundVRChat');
const robot = require('robotjs');

const decimationSpan = 5;
let numberOfDecimated = 0;

const sendMessageToVRC_Clipboard = (text, subtext) => {
    const isVRCfound = setForegroundVRChat();
    if(isVRCfound){
        setClipboardText(`暃${text}暃穃${subtext}穃`);
        setForegroundVRChat();
        ctrlV();
        robot.keyTap('y');
    }
}

const setProposalMessageToVRC_Clipboard = (lasttext) => {
    const isVRCfound = setForegroundVRChat();
    if(isVRCfound && numberOfDecimated == 0){
        setClipboardText(`壥${lasttext}壥`);
        setForegroundVRChat();
        ctrlV();
        robot.keyTap('g');
    }
    numberOfDecimated++;
    if(decimationSpan <= numberOfDecimated){
        numberOfDecimated = 0;
    }
}

module.exports.sendMessageToVRC_Clipboard = sendMessageToVRC_Clipboard;
module.exports.setProposalMessageToVRC_Clipboard = setProposalMessageToVRC_Clipboard;