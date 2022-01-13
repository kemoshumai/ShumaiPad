setLanguage(['ja','en'].includes(navigator.language) ? navigator.language : 'en');
let flag_speech = false;

const recognize = () => {
    const setStatusText = text => document.querySelector('#status:not([hidden])').innerHTML = text;
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'ja';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onsoundstart = () => setStatusText(i18n("Recognizing..."));
    recognition.onnomatch = () => setStatusText(i18n("Try again!"));
    
    recognition.onerror = () =>  {
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
                document.querySelector('#result_text:not([hidden])').innerHTML = results[i][0].transcript;
                recognize();
            }
            else {
                document.querySelector('#result_text:not([hidden])').innerHTML = "[proposal:] " + results[i][0].transcript;
                flag_speech = true;
            }
        }
    }
    flag_speech = false;
    setStatusText(i18n("Listening..."));
    recognition.start();
}