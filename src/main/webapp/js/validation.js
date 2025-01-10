document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.needs-validation');

    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!validateForm(form)) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
});

function validateForm(form) {
    let isValid = true;
    
    // Username validation
    const username = form.querySelector('#username');
    if (username && username.value.length < 3) {
        showError(username, 'Username must be at least 3 characters');
        isValid = false;
    }

    // Email validation
    const email = form.querySelector('#email');
    if (email && !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Password validation
    const password = form.querySelector('#password');
    if (password && password.value.length < 6) {
        showError(password, 'Password must be at least 6 characters');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(element, message) {
    const errorDiv = element.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
        errorDiv.textContent = message;
    }
}
