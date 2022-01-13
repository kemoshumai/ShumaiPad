let flag_speech = false;

const setStatusText = text => document.getElementById('status').innerHTML = text;

const recognize = () => {
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'ja';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onsoundstart = () => setStatusText("Recognizing...");
    recognition.onnomatch = () => setStatusText("Try again!");
    
    recognition.onerror = () =>  {
        setStatusText("Error occurred!");
        if (flag_speech == false) recognize();
    };

    recognition.onsoundend = function () {
        setStatusText("Stopped.");
        recognize();
    };

    recognition.onresult = (event) => {
        const {results} = event;
        for (let i = event.resultIndex; i < results.length; i++) {
            if (results[i].isFinal) {
                document.getElementById('result_text').innerHTML = results[i][0].transcript;
                recognize();
            }
            else {
                document.getElementById('result_text').innerHTML = "[proposal:] " + results[i][0].transcript;
                flag_speech = true;
            }
        }
    }
    flag_speech = false;
    setStatusText("start");
    recognition.start();
}