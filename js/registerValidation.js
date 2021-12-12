const form = document.querySelector('#registerForm');
const nickname = document.querySelector('#nickname');
const bungieName = document.querySelector('#bungieName');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const personalInformationErrorZone = document.querySelector('.registerForm__personalInformation-errorZone');
const platformsErrorZone = document.querySelector('.registerForm__platforms-errorZone');
const privacyTermsErrorZone = document.querySelector('.registerForm__privacyTerms-errorZone')

document.querySelectorAll('input').forEach(element =>
    element.addEventListener('focus', function() {
        this.style.borderColor = '#525252'
    }))


form.addEventListener('submit', (e) => {
    let personalInformationErrorLog = [];
    let platformErrorLog = [];
    let privacyTermsErrorLog = [];

    if (/^$|\s+/.test(nickname.value) || /^$|\s+/.test(bungieName.value) || /^$|\s+/.test(email.value)
        || /^$|\s+/.test(password.value) || /^$|\s+/.test(password2.value)) {
        personalInformationErrorLog.push('nickname, bungie name, email, and password are required');
        if (/^$|\s+/.test(nickname.value)) nickname.style.borderColor = '#ff7070';
        if (/^$|\s+/.test(bungieName.value)) bungieName.style.borderColor = '#ff7070';
        if (/^$|\s+/.test(email.value)) email.style.borderColor = '#ff7070';
        if (/^$|\s+/.test(password.value)) password.style.borderColor = '#ff7070';
        if (/^$|\s+/.test(password2.value)) password2.style.borderColor = '#ff7070';
    }

    if (!/^[a-zA-Z]{4,}#\d{4}$/.test(bungieName.value)) {
        personalInformationErrorLog.push('bungie name must have at least 4 letters followed by # and 4 digits');
        bungieName.style.borderColor = '#ff7070'
    }

    if (!/^[a-zA-Z]{4,}[@][a-zA-Z]+[.][a-zA-Z]+$/.test(email.value)) {
        personalInformationErrorLog.push('email must have at least 4 letters followed by @ and domain');
        email.style.borderColor = '#ff7070'
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password.value)) {
        personalInformationErrorLog.push('password must have at least 8 characters, 1 uppercase, 1 lowercase and 1 number');
        password.style.borderColor = '#ff7070'
    }

    if (password.value !== password2.value) {
        personalInformationErrorLog.push('passwords must be the equals');
        password.style.borderColor = '#ff7070'
        password2.style.borderColor = '#ff7070'
    }

    if (form.playstation.checked === false  && form.xbox.checked === false && form.steam.checked === false &&
        form.stadia.checked === false) {
        platformErrorLog.push('You must choose at least 1');
    }

    if (form.privacy.checked === false || form.terms.checked === false) {
        privacyTermsErrorLog.push('You must accept both');
    }

    if (personalInformationErrorLog.length > 0 || platformErrorLog.length > 0 || privacyTermsErrorLog.length > 0) {
        e.preventDefault();
        personalInformationErrorZone.innerText = personalInformationErrorLog.join('\n');
        platformsErrorZone.innerText = platformErrorLog.join('\n');
        privacyTermsErrorZone.innerText = privacyTermsErrorLog.join('\n');
    }
})