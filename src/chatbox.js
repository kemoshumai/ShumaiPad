const osc = require('node-osc');
const oscclient = new osc.Client('127.0.0.1', 9000);

let latestUpdateTime = 0;

const sendMessageToVRC_Chatbox = (text) => {
    oscclient.send('/chatbox/typing', false);
    oscclient.send('/chatbox/input', text, true);
}

const setProposalMessageToVRC_Chatbox = (lasttext) => {
    if(Date.now() - latestUpdateTime < 1500) return;// スパム判定対策
    oscclient.send('/chatbox/typing', true);
    oscclient.send('/chatbox/input', lasttext, true);
    latestUpdateTime = Date.now();
}

module.exports.sendMessageToVRC_Chatbox = sendMessageToVRC_Chatbox;
module.exports.setProposalMessageToVRC_Chatbox = setProposalMessageToVRC_Chatbox;