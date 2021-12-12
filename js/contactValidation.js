const form = document.querySelector('#contactForm');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const subject = document.querySelector('#subject');
const errorZone = document.querySelector('.contactForm__errorZone');

document.querySelectorAll('input').forEach(element =>
    element.addEventListener('focus', function() {
        this.style.borderColor = '#525252'
    }))

form.addEventListener('submit', (e) => {
    let errorLog = [];

    if (/^$/.test(name.value) || /^$|\s+/.test(email.value) || /^$/.test(subject.value)) {
        errorLog.push('name, email and subject are required');
        if (/^$/.test(name.value)) name.style.borderColor = '#ff7070';
        if (/^$|\s+/.test(email.value)) email.style.borderColor = '#ff7070';
        if (/^$/.test(subject.value)) subject.style.borderColor = '#ff7070';
    }

    if (!/^[a-zA-Z]{4,}[@][a-zA-Z]+[.][a-zA-Z]+$/.test(email.value)) {
        errorLog.push('email must have at least 4 letters followed by @ and domain');
        email.style.borderColor = '#ff7070'
    }

    if (errorLog.length > 0) {
        e.preventDefault();
        errorZone.innerText = errorLog.join('\n');
    }
})