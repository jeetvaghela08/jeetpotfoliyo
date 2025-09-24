// Theme Toggle Function
function toggleTheme() {
    const body = document.body;
    const desktopIcon = document.getElementById('theme-icon-desktop');
    const mobileIcon = document.getElementById('theme-icon-mobile');
    const themeText = document.querySelector('.theme-text');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        if (desktopIcon) desktopIcon.className = 'fas fa-moon';
        if (mobileIcon) mobileIcon.className = 'fas fa-moon';
        if (themeText) themeText.textContent = 'Dark Mode';
    } else {
        body.setAttribute('data-theme', 'dark');
        if (desktopIcon) desktopIcon.className = 'fas fa-sun';
        if (mobileIcon) mobileIcon.className = 'fas fa-sun';
        if (themeText) themeText.textContent = 'Light Mode';
    }
}

// Mobile Menu Functionality and other event listeners
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            navMenu.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });

        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });

        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Contact form submission
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Initialize theme based on user preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.setAttribute('data-theme', 'dark');
        const desktopIcon = document.getElementById('theme-icon-desktop');
        const mobileIcon = document.getElementById('theme-icon-mobile');
        const themeText = document.querySelector('.theme-text');
        if (desktopIcon) desktopIcon.className = 'fas fa-sun';
        if (mobileIcon) mobileIcon.className = 'fas fa-sun';
        if (themeText) themeText.textContent = 'Light Mode';
    }
});

// Scroll-based event listeners
window.addEventListener('scroll', function() {
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});