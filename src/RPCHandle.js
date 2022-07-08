const { sendMessageToVRC_Clipboard,setProposalMessageToVRC_Clipboard } = require("./sendToVRC");
const { startRecognizeWithVosk, stopRecognizeWithVosk } = require("./vosk");

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
    startRecognizeWithVosk(target){
        startRecognizeWithVosk(target);
    }
    stopRecognizeWithVosk(){
        stopRecognizeWithVosk();
    }
}