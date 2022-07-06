const setStatusText = text => document.querySelector('#status:not([hidden])').innerHTML = text;

setLanguage(['ja', 'en'].includes(navigator.language) ? navigator.language : 'en');
let flag_speech = false;

let rec_lang = "ja";
let translate_lang = "en";
let recognition = null;

let backend;
(async () => {
    const [_backend] = await carlo.loadParams();
    backend = _backend;
})();

window.console.log = (...text) => {
    backend.debugLog("\x1b[36m[Log]\x1b[39m", ...text);
}
window.console.error = (...text) => {
    backend.debugLog("\x1b[31m[Error]\x1b[39m", ...text);
}
window.console.warn = (...text) => {
    backend.debugLog("\x1b[33m[Warn]\x1b[39m", ...text);
}

const translated_result = document.querySelector('#translated_result');

const recognize = () => {
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    recognition = new webkitSpeechRecognition();
    recognition.lang = rec_lang;
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onsoundstart = () => setStatusText(i18n("Recognizing..."));
    recognition.onnomatch = () => setStatusText(i18n("Try again!"));

    recognition.onerror = (e) =>  {
        console.error(e.error);
        if (flag_speech == false) recognize();
    };

    recognition.onsoundend = function () {
        setStatusText(i18n("Stopped."));
        recognize();
    };

    recognition.onresult = (event) => {
        const {results} = event;
        for (let i = event.resultIndex; i < results.length; i++) {
            if (results[i].isFinal) {
                OnRecognitionResult(results[i][0].transcript);
                recognize();
            }
            else {
                flag_speech = true;
                OnProposalResult(results[i][0].transcript);
            }
        }
    }
    flag_speech = false;
    setStatusText(i18n("Listening..."));
    recognition.start();
}

const recognizeWithVosk = () => {
    if(recognition){
        recognition.stop();
    }
    backend.startRecognizeWithVosk(rec_lang);
}


const updateLanguageByText = () => document.querySelector('#lang_select_by_text').hidden = document.querySelector("#language_selector").value != "_not_";

const OnChangeLanguageSelector = ()=>updateLanguageByText();

const updateTranslateByText = () => document.querySelector('#translate_select_by_text').hidden = document.querySelector("#translate_selector").value != "_not_";

const OnChangeTranslateSelector = ()=>updateTranslateByText();

const apply = ()=>{
    {
        const {value} = document.querySelector('#language_selector');
        rec_lang = value != "_not_" ? value : document.querySelector('#lang_select_by_text').value;
    }
    {
        const {value} = document.querySelector('#translate_selector');
        translate_lang = value != "_not_" ? value : document.querySelector('#translate_select_by_text').value;
    }
    translated_result.innerHTML = "";
    document.querySelector('#result_text:not([hidden])').innerHTML = "";
    if(rec_lang == "eo"){
        setStatusText(i18n("Launching VOSK engine..."));
        recognizeWithVosk();
        const wssock = new WebSocket('ws://127.0.0.1:56573');
        wssock.addEventListener('open', ()=>console.log("WS Connection OK."));
        wssock.addEventListener('message', OnVosk);
    }else{
        backend.stopRecognizeWithVosk();
        recognize();
    }
}

updateLanguageByText();
updateTranslateByText();


const OnVosk = (received) => {
    const {data} = received;
    const [type, ...receivedtext] = data.split(":");
    const text = receivedtext?.length ? receivedtext.join() : receivedtext;
    if(!text) return;
    switch(type){
        case "ready":{
            setStatusText(i18n("Listening..."));
            break;
        }
        case "partial":{
            OnProposalResult(text);
            break;
        }
        case "text":{
            OnRecognitionResult(text);
            break;
        }
    }
}

const OnRecognitionResult = async (text) => {
    const resultTextElement = document.querySelector('#result_text:not([hidden])');
    resultTextElement.setAttribute("class","");
    resultTextElement.innerHTML = text;
    const translated = await translate(text,translate_lang,rec_lang)
    translated_result.innerHTML = translated;
    if(backend){
        backend.sendMessageToVRC(text,translated);
    }
}

let isSending = false;

const OnProposalResult = async (lasttext) => {
    const resultTextElement = document.querySelector('#result_text:not([hidden])');
    resultTextElement.setAttribute("class","proposal");
    resultTextElement.innerHTML = lasttext;
    if(!isSending){
        isSending = true;
        if(backend){
            await backend.setProposalMessageToVRC(lasttext);
        }
        console.log(lasttext)
        isSending = false;
    }else{
        console.log("skipped");
    }
}