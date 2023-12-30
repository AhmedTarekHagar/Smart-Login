document.getElementById('userName').innerHTML = localStorage.getItem('loggedIn');

function logout(){
    localStorage.removeItem('loggedIn');
    window.location.assign('index.html');
}

document.getElementById('logoutButton').addEventListener('click',logout);