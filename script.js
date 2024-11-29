document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const passwordInput = document.getElementById('password');
    const passwordStrength = document.getElementById('password-strength');
    const togglePasswordVisibility = document.getElementById('toggle-password-visibility');
    const suggestPasswordButton = document.getElementById('suggest-password');
    const passwordHistoryContainer = document.getElementById('password-history');
    const passwordForm = document.getElementById('password-form');
    const quoteElement = document.getElementById('quote');

    // **QUOTES MANAGEMENT**
    const quotes = [
        "Your password is the key to your online safety.",
        "Strong passwords keep hackers at bay.",
        "Don't reuse passwords, make them unique.",
        "A password manager is your best friend.",
        "The longer the password, the stronger the security.",
        "Enable two-factor authentication wherever possible.",
        "Your online life deserves the strongest locks."
    ];

    let currentQuoteIndex = 0;

    function changeQuote() {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        quoteElement.textContent = quotes[currentQuoteIndex];
    }

    // Rotate quotes every 5 seconds
    setInterval(changeQuote, 4000);

    // **TOGGLE PASSWORD VISIBILITY**
    togglePasswordVisibility.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePasswordVisibility.textContent = 'Hide Password';
        } else {
            passwordInput.type = 'password';
            togglePasswordVisibility.textContent = 'Show Password';
        }
    });

    // **GENERATE STRONG PASSWORD**
    suggestPasswordButton.addEventListener('click', () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        let generatedPassword = '';
        for (let i = 0; i < 12; i++) {
            generatedPassword += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        passwordInput.value = generatedPassword;
        updatePasswordStrength(generatedPassword);
    });

    // **CHECK PASSWORD STRENGTH**
    passwordInput.addEventListener('input', () => {
        updatePasswordStrength(passwordInput.value);
    });

    function updatePasswordStrength(password) {
        if (password.length > 10 && /[A-Z]/.test(password) && /[!@#$%^&*]/.test(password)) {
            passwordStrength.textContent = 'Strong';
            passwordStrength.style.color = 'green';
        } else if (password.length > 6) {
            passwordStrength.textContent = 'Moderate';
            passwordStrength.style.color = 'orange';
        } else {
            passwordStrength.textContent = 'Weak';
            passwordStrength.style.color = 'red';
        }
    }

    // **SAVE PASSWORDS**
    passwordForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const service = document.getElementById('service').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = passwordInput.value.trim();

        if (!service || !username || !password) {
            alert('Please fill in all fields before saving.');
            return;
        }

        // Save password to history (you can integrate a backend API here)
        addToPasswordHistory(service, username, password);

        // Clear form inputs
        passwordForm.reset();
        passwordStrength.textContent = 'Weak';
        passwordStrength.style.color = 'red';
    });

    function addToPasswordHistory(service, username, password) {
        const listItem = document.createElement('li');
        listItem.textContent = `Service: ${service}, Username: ${username}, Password: ${password}`;
        passwordHistoryContainer.appendChild(listItem);

        // If the first history item is "No passwords saved yet", remove it
        const firstItem = passwordHistoryContainer.firstElementChild;
        if (firstItem && firstItem.textContent === 'No passwords saved yet.') {
            passwordHistoryContainer.removeChild(firstItem);
        }
    }
});
