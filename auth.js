document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const pass = document.getElementById('login-pass').value;

            const users = JSON.parse(localStorage.getItem('swift_users') || '[]');
            const user = users.find(u => u.email === email && u.pass === pass);

            if (user) {
                localStorage.setItem('swift_auth', JSON.stringify({ name: user.name, email: user.email }));
                window.showToast(`Welcome back, ${user.name}!`);
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                window.showToast('Invalid email or password. Please try again.', 'error');
            }
        });
    }

    // Handle Registration
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const pass = document.getElementById('reg-pass').value;
            const confirmPass = document.getElementById('reg-confirm').value;

            if (pass !== confirmPass) {
                window.showToast('Passwords do not match!', 'error');
                return;
            }

            const users = JSON.parse(localStorage.getItem('swift_users') || '[]');
            if (users.find(u => u.email === email)) {
                window.showToast('Email already registered!', 'error');
                return;
            }

            users.push({ name, email, pass });
            localStorage.setItem('swift_users', JSON.stringify(users));
            
            window.showToast('Account created successfully! Please login.');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }
});
