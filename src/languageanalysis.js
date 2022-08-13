const kuromoji = require("kuromoji");
const jaconv = require("jaconv");
const path = require("path");

let tokenizer = null;

kuromoji.builder({ dicPath: path.join(__dirname, "../node_modules/kuromoji/dict") }).build((err, t) => tokenizer = t);


const japaneseToRomaji = (text) => {
    if (!tokenizer) return;

    const tokenized = tokenizer.tokenize(text);

    console.log(tokenized);

    const kana = jaconv.toHiragana(tokenized.map(t=>t.reading||t.surface_form).join(" ")).replaceAll("っ ","っ").replaceAll("。",".").replaceAll("、",",");

    return jaconv.toHebon(kana).toLowerCase();
}

module.exports.japaneseToRomaji = japaneseToRomaji;