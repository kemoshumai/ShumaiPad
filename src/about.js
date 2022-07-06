const about = () => {
    Swal.fire({
        imageUrl: '/res/KemoshumaiLogoLit.png',
        title:'ShumaiPad',
        text : `v0.2.0
        Made by Kemoshumai.`
    });
}

const showlicense = () => {
    location.href = "license.html";
}