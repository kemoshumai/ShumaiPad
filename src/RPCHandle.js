const { sendMessageToVRC_Clipboard } = require("./sendToVRC")

module.exports = class RPCHandle{
    sendMessageToVRC(text,subtext){
        sendMessageToVRC_Clipboard(text,subtext);
    }
}