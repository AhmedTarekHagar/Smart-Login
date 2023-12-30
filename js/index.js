if (localStorage.getItem('loggedIn') != null) {
    window.location.assign('welcome.html');
}

let loginEmailInput = document.getElementById('loginEmail');
let loginPasswordInput = document.getElementById('loginPassword');

let users = [];

if (localStorage.getItem('userAccounts') != null) {
    users = JSON.parse(localStorage.getItem('userAccounts'));
}

function login(){
    users.forEach(user => {
        if((loginEmailInput.value.toLowerCase() == user.email.toLowerCase())
        && (loginPasswordInput.value.toLowerCase() == user.password.toLowerCase())){
            localStorage.setItem('loggedIn',user.name)
            window.location.assign('welcome.html');
        }else{
            setTimeout(() => {
                document.querySelector('.loginValidation').classList.remove('d-none');
            }, "100");
            setTimeout(() => {
                document.querySelector('.loginValidation').classList.add('d-none');
            }, "1500");
        }
    });
}

document.getElementById('loginButton').addEventListener('click', login);