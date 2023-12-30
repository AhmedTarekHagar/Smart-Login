const nameRegex = /^(?!\s*$).+/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z]).{6,}$/;

let signUpNameInput = document.getElementById('signUpName');
let signUpEmailInput = document.getElementById('signUpEmail');
let signUpPasswordInput = document.getElementById('signUpPassword');
let confirmSignUpPasswordInput = document.getElementById('confirmSignUpPassword');

let users = [];

if (localStorage.getItem('userAccounts') != null) {
    users = JSON.parse(localStorage.getItem('userAccounts'));
}

function signUp() {
    if (emailExists()) {
        return;
    }
    if (!validate(nameRegex, signUpNameInput)) {
        return;
    }
    if (!validate(emailRegex, signUpEmailInput)) {
        return;
    }
    if (!validate(passwordRegex, signUpPasswordInput)) {
        return;
    }
    if (!match(signUpPasswordInput, confirmSignUpPasswordInput)) {
        return;
    }
    let account = {
        name: signUpNameInput.value,
        email: signUpEmailInput.value,
        password: signUpPasswordInput.value
    }
    users.push(account);
    localStorage.setItem('userAccounts', JSON.stringify(users));
    document.querySelector('.signUpSuccess').classList.remove('d-none');
    setTimeout(() => {
        window.location.assign('index.html');
    }, "1500");
}

function validate(regex, input) {
    if (regex.test(input.value)) {
        document.querySelector(`.${input.id}`).classList.add('d-none');
        document.querySelector(`#${input.id}`).classList.add('is-valid');
        document.querySelector(`#${input.id}`).classList.remove('is-invalid');
        return true;
    } else {
        document.querySelector('.signUpEmail').innerHTML = `Invalid Email!`;
        document.querySelector(`.${input.id}`).classList.remove('d-none');
        document.querySelector(`#${input.id}`).classList.add('is-invalid');
        document.querySelector(`#${input.id}`).classList.remove('is-valid');
        return false;
    }
}

function match(left, right) {
    if (left.value == right.value) {
        document.querySelector(`.${right.id}`).classList.add('d-none');
        document.querySelector(`#${right.id}`).classList.add('is-valid');
        document.querySelector(`#${right.id}`).classList.remove('is-invalid');
        return true;
    } else {
        document.querySelector(`.${right.id}`).classList.remove('d-none');
        document.querySelector(`#${right.id}`).classList.add('is-invalid');
        document.querySelector(`#${right.id}`).classList.remove('is-valid');
        return false;
    }
}

function emailExists() {
    let counter = 0;
    users.forEach(user => {
        if (user.email.toLowerCase() == signUpEmailInput.value.toLowerCase()) {
            counter++;
        }
    });
    if (counter == 1) {
        document.querySelector('.signUpEmail').innerHTML = `Email already exists!`;
        document.querySelector('.signUpEmail').classList.remove('d-none');
        document.querySelector('#signUpEmail').classList.remove('is-valid');
        document.querySelector('#signUpEmail').classList.add('is-invalid');

        return true;
    }
}

//#region event listeners

document.getElementById('signUpButton').addEventListener('click', signUp);

signUpNameInput.addEventListener('change', function () {
    validate(nameRegex, signUpNameInput);
});
signUpEmailInput.addEventListener('change', function () {
    validate(emailRegex, signUpEmailInput);
    emailExists();
});
signUpPasswordInput.addEventListener('change', function () {
    validate(passwordRegex, signUpPasswordInput);
});
confirmSignUpPasswordInput.addEventListener('change', function () {
    match(signUpPasswordInput, confirmSignUpPasswordInput);
});

//#endregion
