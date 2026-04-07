document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const searchForm = document.getElementById('search-form');
    const dateInput = document.getElementById('date-input');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    // 1. Navbar Scroll Effect
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else if (!document.body.classList.contains('force-navbar-scrolled')) {
            navbar?.classList.remove('scrolled');
        }
    };

    if (navbar) {
        window.addEventListener('scroll', handleNavbarScroll);
        handleNavbarScroll(); // Initial check
    }

    // 1.5 Mobile Menu Toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-xmark');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-xmark');
            });
        });
    }

    // 2. Authentication Check & UI Update
    const checkAuthStatus = () => {
        const authData = localStorage.getItem('swift_auth');
        const navAuth = document.querySelector('.nav-links li:last-child');

        if (authData && navAuth) {
            try {
                const user = JSON.parse(authData);
                navAuth.innerHTML = `
                    <div class="user-menu" style="display: flex; align-items: center; gap: 1rem; background: rgba(255,255,255,0.05); padding: 0.25rem 0.25rem 0.25rem 1rem; border-radius: 50px; border: 1px solid var(--glass-border);">
                        <span style="font-size: 0.9rem; font-weight: 500;"><i class="fa-solid fa-user-circle"></i> ${user.name.split(' ')[0]}</span>
                        <a href="#" id="logout-btn" class="btn" style="background: var(--accent); color: white; padding: 0.4rem 1rem; font-size: 0.8rem; border-radius: 50px;">Logout</a>
                    </div>
                `;
                
                document.getElementById('logout-btn')?.addEventListener('click', (e) => {
                    e.preventDefault();
                    localStorage.removeItem('swift_auth');
                    window.location.reload();
                });
            } catch (error) {
                console.error("Auth parsing error:", error);
                localStorage.removeItem('swift_auth');
            }
        }
    };

    checkAuthStatus();

    // 3. Set minimum date for search inputs (if present)
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        if (!dateInput.value) dateInput.value = today;
    }

    // 4. Global Form Handling (Search)
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(searchForm);
            const from = formData.get('from');
            const to = formData.get('to');
            const date = formData.get('date');

            if (from === to) {
                showToast('Origin and Destination cannot be the same!', 'error');
                return;
            }

            const queryParams = new URLSearchParams({ from, to, date }).toString();
            window.location.href = `search.html?${queryParams}`;
        });
    }

    // 5. Scroll Reveal Implementation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => revealObserver.observe(el));

    // Simple Toast Notification
    window.showToast = (message, type = 'info') => {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed; bottom: 20px; right: 20px; 
            background: ${type === 'error' ? 'var(--accent)' : 'var(--primary)'};
            color: white; padding: 1rem 2rem; border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 9999;
            transform: translateY(100px); transition: all 0.5s ease;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.style.transform = 'translateY(0)', 100);
        setTimeout(() => {
            toast.style.transform = 'translateY(100px)';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    };
});
