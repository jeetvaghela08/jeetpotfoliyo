// Portfolio Animations and Visual Effects
document.addEventListener('DOMContentLoaded', function() {
    
    // Staggered Animation for Skills
    function animateSkills() {
        const skillCategories = document.querySelectorAll('.skill-category');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 150);
                    skillObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        skillCategories.forEach((category, index) => {
            category.style.opacity = '0';
            category.style.transform = 'translateY(50px) scale(0.9)';
            category.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            skillObserver.observe(category);
        });
    }

    // Project Cards Hover Animation
    function animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Scale up the card
                card.style.transform = 'translateY(-8px) scale(1.02) rotateX(5deg)';
                card.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.2)';
                
                // Animate project image
                const projectImage = card.querySelector('.project-image');
                if (projectImage) {
                    projectImage.style.transform = 'scale(1.1)';
                }
                
                // Animate tags
                const tags = card.querySelectorAll('.tag');
                tags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'translateY(-2px) scale(1.05)';
                        tag.style.boxShadow = '0 5px 15px rgba(176, 38, 255, 0.3)';
                    }, index * 50);
                });
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
                card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                
                const projectImage = card.querySelector('.project-image');
                if (projectImage) {
                    projectImage.style.transform = 'scale(1)';
                }
                
                const tags = card.querySelectorAll('.tag');
                tags.forEach(tag => {
                    tag.style.transform = 'translateY(0) scale(1)';
                    tag.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.2)';
                });
            });
        });
    }

    // Awards Timeline Animation
    function animateAwardsTimeline() {
        const awardItems = document.querySelectorAll('.award-item');
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0) scale(1)';
                        
                        // Animate the award icon
                        const icon = entry.target.querySelector('.award-icon');
                        if (icon) {
                            icon.style.animation = 'iconPulse 2s ease-in-out infinite';
                        }
                        
                        // Animate the award content
                        const content = entry.target.querySelector('.award-content');
                        if (content) {
                            content.style.transform = 'scale(1)';
                            content.style.opacity = '1';
                        }
                    }, index * 200);
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, {
                            threshold: 0.3,
                            rootMargin: '0px 0px -30px 0px'
                        });
                }
            
                // Initialize all animations
                animateSkills();
                animateProjectCards();
                animateAwardsTimeline();
            });