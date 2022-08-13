const { sendMessageToVRC_Clipboard,setProposalMessageToVRC_Clipboard } = require("./sendToVRC");
const { sendMessageToVRC_Chatbox, setProposalMessageToVRC_Chatbox } = require('./chatbox');
const { startRecognizeWithVosk, stopRecognizeWithVosk } = require("./vosk");
const { japaneseToRomaji } = require("./languageanalysis");

module.exports = class RPCHandle{
    sendMessageToVRC(text,subtext){
        sendMessageToVRC_Clipboard(text,subtext);
        sendMessageToVRC_Chatbox(japaneseToRomaji(text));
    }
    setProposalMessageToVRC(lasttext){
        setProposalMessageToVRC_Clipboard(lasttext);
        setProposalMessageToVRC_Chatbox(japaneseToRomaji(lasttext));
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