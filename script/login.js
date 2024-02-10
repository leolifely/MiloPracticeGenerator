function getDetails() {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        var username = document.getElementById('login-username').value;
        var password = document.getElementById('login-password').value;
        hideForm(loginForm);
    });
    return [username, password];
}