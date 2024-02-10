function getDetails() {
    return new Promise((resolve, reject) => {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            var username = document.getElementById('login-username').value;
            var password = document.getElementById('login-password').value;
            hideForm(loginForm);
            resolve [username, password];
        });
    });
}