signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    var username = document.getElementById('signup-username').value;
    var password = document.getElementById('signup-password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    hideForm(signupForm);
    signUp(username, password);
});