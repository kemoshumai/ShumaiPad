const translate = async (text,target,source="") => {
    const targetURL = new URL(`https://script.google.com/macros/s/AKfycbySzpqBLTpv8xW9f4pVRa444F_VNWBQCxrmmZmvdMl_b0HMhI7iF1Wdebtjrykbqgvr/exec?text=${text}&into=${target}&source=${source}`);
    const res = await  fetch(targetURL.href);
    const translated = res.text();
    return translated;
}