// Advanced Visual Effects for Futuristic Portfolio
document.addEventListener('DOMContentLoaded', function() {
    
    // Add futuristic cursor trail effect
    function createCursorTrail() {
        const trail = [];
        const trailLength = 20;
        
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.style.cssText = `
                position: fixed;
                width: ${6 - (i * 0.2)}px;
                height: ${6 - (i * 0.2)}px;
                background: rgba(0, 212, 255, ${0.8 - (i * 0.04)});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: all 0.1s ease-out;
                box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
            `;
            document.body.appendChild(dot);
            trail.push(dot);
        }
        
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateTrail() {
            let x = mouseX, y = mouseY;
            
            trail.forEach((dot, index) => {
                const nextDot = trail[index + 1] || trail[0];
                
                dot.style.left = x + 'px';
                dot.style.top = y + 'px';
                
                if (nextDot) {
                    x += (parseFloat(nextDot.style.left) - x) * 0.3;
                    y += (parseFloat(nextDot.style.top) - y) * 0.3;
                }
            });
            
            requestAnimationFrame(animateTrail);
        }
        
        animateTrail();
    }

    // Add matrix rain effect for dark theme
    function createMatrixRain() {
        if (document.body.getAttribute('data-theme') !== 'dark') return;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.1;
        `;
        
        document.body.appendChild(canvas);
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const charArray = chars.split('');
        
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        function drawMatrix() {
            ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F4';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        const matrixInterval = setInterval(drawMatrix, 50);
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        // Listen for theme changes to remove matrix rain
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    const theme = document.body.getAttribute('data-theme');
                    if (theme !== 'dark') {
                        clearInterval(matrixInterval);
                        canvas.remove();
                        observer.disconnect();
                    }
                }
            });
        });
        
        observer.observe(document.body, { attributes: true });
    }

    // Floating particles background effect
    function createFloatingParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        `;
        
        document.body.appendChild(particlesContainer);
        
        function createParticle() {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 2;
            const colors = ['#00D4FF', '#B026FF', '#39FF14', '#FF6B00'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: 100%;
                opacity: ${Math.random() * 0.5 + 0.2};
                animation: floatUp ${Math.random() * 10 + 5}s linear infinite;
                box-shadow: 0 0 ${size * 2}px ${color};
            `;
            
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 15000);
        }
        
        // Create particles periodically
        setInterval(createParticle, 500);
        
        // Add CSS animation for floating particles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatUp {
                to {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Glitch effect for text elements
    function createGlitchEffect() {
        const glitchElements = document.querySelectorAll('.hero-content h1, .section-header h2');
        
        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animation = 'glitch 0.5s ease-in-out';
                
                setTimeout(() => {
                    element.style.animation = '';
                }, 500);
            });
        });
        
        // Add glitch CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes glitch {
                0%, 100% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
            }
        `;
        document.head.appendChild(style);
    }

   

    // Interactive hover glow for cards
    function createInteractiveGlow() {
        const cards = document.querySelectorAll('.project-card, .skill-category, .education-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                card.style.background = `
                    radial-gradient(circle at ${x}% ${y}%, 
                    rgba(0, 212, 255, 0.1) 0%, 
                    rgba(176, 38, 255, 0.05) 50%, 
                    transparent 100%),
                    rgba(255, 255, 255, 0.05)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.background = 'rgba(255, 255, 255, 0.05)';
            });
        });
    }

    // Typewriter effect with neon cursor
    function createTypewriterEffect() {
        const typeElements = document.querySelectorAll('[data-typewriter]');
        
        typeElements.forEach(element => {
            const text = element.getAttribute('data-typewriter') || element.textContent;
            element.textContent = '';
            
            let i = 0;
            const cursor = document.createElement('span');
            cursor.className = 'typewriter-cursor';
            cursor.textContent = '|';
            cursor.style.cssText = `
                color: #00D4FF;
                animation: blink 1s infinite;
                font-weight: normal;
            `;
            
            element.appendChild(cursor);
            
            function typeChar() {
                if (i < text.length) {
                    element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
                    i++;
                    setTimeout(typeChar, 100);
                } else {
                    cursor.style.animation = 'none';
                    setTimeout(() => cursor.remove(), 1000);
                }
            }
            
            setTimeout(typeChar, 1000);
        });
        
        // Add blinking cursor animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Holographic card tilt effect
    function createHolographicTilt() {
        const tiltCards = document.querySelectorAll('.project-card, .skill-category');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const rotateX = (e.clientY - centerY) / 10;
                const rotateY = (centerX - e.clientX) / 10;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(10px)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // Initialize all effects
    function initAllEffects() {
        try {
            // Only create cursor trail on desktop
            if (window.innerWidth > 768) {
                createCursorTrail();
            }
            
            createMatrixRain();
            createFloatingParticles();
            createGlitchEffect();
            createNeonPulse();
            createInteractiveGlow();
            createTypewriterEffect();
            createHolographicTilt();
            
            console.log('Advanced effects initialized successfully!');
        } catch (error) {
            console.warn('Some effects could not be initialized:', error);
        }
    }

    // Initialize effects after a delay to ensure page is fully loaded
    setTimeout(initAllEffects, 1000);

    // Re-initialize matrix rain when theme changes
    document.addEventListener('themeChange', () => {
        setTimeout(() => {
            if (document.body.getAttribute('data-theme') === 'dark') {
                createMatrixRain();
            }
        }, 100);
    });

    // Performance optimization: pause effects when page is not visible
    document.addEventListener('visibilitychange', () => {
        const particles = document.querySelector('.particles-container');
        const canvas = document.querySelector('canvas');
        
        if (document.hidden) {
            // Pause animations
            if (particles) particles.style.display = 'none';
            if (canvas) canvas.style.display = 'none';
        } else {
            // Resume animations
            if (particles) particles.style.display = 'block';
            if (canvas) canvas.style.display = 'block';
        }
    });
});