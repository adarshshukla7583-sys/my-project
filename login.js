document.addEventListener('DOMContentLoaded', () => {
    // Get all the necessary elements from the DOM
    const loginView = document.getElementById('login-view');
    const registerView = document.getElementById('register-view');
    const showRegisterBtn = document.getElementById('show-register');
    const showLoginBtn = document.getElementById('show-login');

    // Event listener for the "Register" link
    showRegisterBtn.addEventListener('click', () => {
        loginView.classList.add('hidden'); // Hide login form
        registerView.classList.remove('hidden'); // Show register form
    });

    // Event listener for the "Login" link
    showLoginBtn.addEventListener('click', () => {
        registerView.classList.add('hidden'); // Hide register form
        loginView.classList.remove('hidden'); // Show login form
    });
});

// NOTE: The code for submitting the form data to your backend
// will be added here later. For now, this makes the toggle work.