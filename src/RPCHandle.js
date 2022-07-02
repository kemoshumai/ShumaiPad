const { sendMessageToVRC_Clipboard,setProposalMessageToVRC_Clipboard } = require("./sendToVRC")

module.exports = class RPCHandle{
    sendMessageToVRC(text,subtext){
        sendMessageToVRC_Clipboard(text,subtext);
    }
    setProposalMessageToVRC(lasttext){
        setProposalMessageToVRC_Clipboard(lasttext);
    }
    debugLog(...text){
        console.log(...text);
    }
}