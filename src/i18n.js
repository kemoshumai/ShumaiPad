let _lang;

const setLanguage = lang => {
    _lang = lang;
    const targets = document.querySelectorAll('*[lang]');
    for(const target of targets){
        if(target.tagName != "HTML"){
            const isTargetCurrentLang = target.getAttribute('lang') == lang;
            target.hidden = !isTargetCurrentLang;
        }
    }
}

const i18n = (text) => {
    const lang = _lang;
    return langDictionary[text][lang];
}

const langDictionary = {
    "Recognizing...":{
        "en":"Recognizing...",
        "ja":"認識中"
    },
    "Try again!":{
        "en":"Try again!",
        "ja":"認識中"
    },
    "Error occurred!":{
        "en":"Error occurred!",
        "ja":"エラーが発生しました…ごめんなさい…"
    },
    "Stopped.":{
        "en":"Stopped.",
        "ja":"停止中"
    },
    "Listening...":{
        "en":"Listening...",
        "ja":"聞き取り中"
    }
}