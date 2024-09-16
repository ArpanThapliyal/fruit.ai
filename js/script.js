function validateLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "user" && password === "password") {
        window.location.href = "home.html";
    } else {
        document.getElementById("error-message").textContent = "Invalid username or password!";
        return false;
    }
}

function validateSignup() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (username && email && password) {
        window.location.href = "index.html";
    } else {
        document.getElementById("error-message").textContent = "All fields are required!";
        return false;
    }
}
