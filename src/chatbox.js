const osc = require('node-osc');
const oscclient = new osc.Client('127.0.0.1', 9000);

const sendMessageToVRC_Chatbox = (text) => {
    oscclient.send('/chatbox/typing', false);
    oscclient.send('/chatbox/input', text, true);
}

const setProposalMessageToVRC_Chatbox = (lasttext) => {
    oscclient.send('/chatbox/typing', true);
    oscclient.send('/chatbox/input', lasttext, true);
}

module.exports.sendMessageToVRC_Chatbox = sendMessageToVRC_Chatbox;
module.exports.setProposalMessageToVRC_Chatbox = setProposalMessageToVRC_Chatbox;