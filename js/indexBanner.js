let counter = 1;
setInterval(() => {
    document.querySelector(`#radio${counter}`).checked = true;
    counter ++
    if (counter > 3) {
        counter = 1;
    }
}, 5000);
