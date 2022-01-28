setLanguage(['ja','en'].includes(navigator.language) ? navigator.language : 'en');
let flag_speech = false;

let rec_lang = "ja";
let translate_lang = "en";

let backend;
(async()=>{
    const [_backend] = await carlo.loadParams();
    backend = _backend;
})();

const translated_result = document.querySelector('#translated_result');

const recognize = () => {
    const setStatusText = text => document.querySelector('#status:not([hidden])').innerHTML = text;
    const resultTextElement = document.querySelector('#result_text:not([hidden])');
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    const recognition = new webkitSpeechRecognition();
    recognition.lang = rec_lang;
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onsoundstart = () => setStatusText(i18n("Recognizing..."));
    recognition.onnomatch = () => setStatusText(i18n("Try again!"));
    
    recognition.onerror = () =>  {
        console.log("Error occurred on a recognizing API!");
        setStatusText(i18n("Error occurred!"));
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
                resultTextElement.setAttribute("class","");
                resultTextElement.innerHTML = results[i][0].transcript;
                OnRecognitionResult(results[i][0].transcript);
                recognize();
            }
            else {
                resultTextElement.setAttribute("class","proposal");
                resultTextElement.innerHTML = results[i][0].transcript;
                flag_speech = true;
                OnProposalResult(results[i][0].transcript);
            }
        }
    }
    flag_speech = false;
    setStatusText(i18n("Listening..."));
    recognition.start();
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
    recognize();
}

updateLanguageByText();
updateTranslateByText();




const OnRecognitionResult = async (text) => {
    const translated = await translate(text,translate_lang)
    translated_result.innerHTML = translated;
    if(backend){
        backend.sendMessageToVRC(text,translated);
    }
}

let isSending = false;

const OnProposalResult = async (lasttext) => {
    if(!isSending){
        isSending = true;
        if(backend){
            await backend.setProposalMessageToVRC(lasttext);
        }
        console.log(lasttext)
        isSending = false;
    }else{
        console.log("skipped")
    }
}