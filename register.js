function saveCredentials(event) {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!username) {

        alert("Please fill out username!!");
        event.preventDefault();
    }

    if (password === confirmPassword) {

        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        location.reload();
    }

    else {

        alert("Passwords do not match! Try again.");
        location.reload();
    }
}