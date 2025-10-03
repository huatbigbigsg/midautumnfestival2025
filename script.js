// Mid-Autumn Festival Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Countdown Timer for Mid-Autumn Festival 2025 (October 6, 2025)
    function updateCountdown() {
        const festivalDate = new Date('October 6, 2025 00:00:00').getTime();
        const now = new Date().getTime();
        const distance = festivalDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // Festival has started or passed
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Change countdown text
            const countdownContainer = document.querySelector('.countdown-container h3');
            if (countdownContainer) {
                countdownContainer.textContent = 'Festival is Here! 🎉';
            }
        }
    }

    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background change on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.tradition-card, .lantern-item, .mooncake-card, .event-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Interactive lantern hover effects
    const lanternItems = document.querySelectorAll('.lantern-item');
    lanternItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const lanternSvg = this.querySelector('.lantern-svg');
            if (lanternSvg) {
                lanternSvg.style.animation = 'lanternSway 0.5s ease-in-out infinite';
            }
        });

        item.addEventListener('mouseleave', function() {
            const lanternSvg = this.querySelector('.lantern-svg');
            if (lanternSvg) {
                lanternSvg.style.animation = 'lanternSway 4s ease-in-out infinite';
            }
        });
    });

    // Mooncake card interactive effects
    const mooncakeCards = document.querySelectorAll('.mooncake-card');
    mooncakeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });
    });

    // Add floating particles effect
    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #fbbf24;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.7;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            animation: floatUp ${5 + Math.random() * 5}s linear forwards;
        `;
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 10000);
    }

    // Add CSS for floating particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.7;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .nav-menu.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            flex-direction: column;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            padding: 1rem 2rem;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Create floating particles periodically
    setInterval(createFloatingParticle, 3000);

    // Add click effect to tradition cards
    const traditionCards = document.querySelectorAll('.tradition-card');
    traditionCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-10px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1)';
            }, 150);
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-lanterns .lantern');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Add typing effect to hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect after a delay
    setTimeout(() => {
        const chineseTitle = document.querySelector('.chinese-text');
        const englishTitle = document.querySelector('.english-text');
        
        if (chineseTitle && englishTitle) {
            typeWriter(chineseTitle, '中秋节快乐', 200);
            setTimeout(() => {
                typeWriter(englishTitle, 'Happy Mid-Autumn Festival', 100);
            }, 2000);
        }
    }, 1000);

    // Add festival greeting based on time
    function addTimeBasedGreeting() {
        const now = new Date();
        const hour = now.getHours();
        let greeting = '';
        
        if (hour >= 5 && hour < 12) {
            greeting = 'Good Morning! ☀️';
        } else if (hour >= 12 && hour < 17) {
            greeting = 'Good Afternoon! 🌤️';
        } else if (hour >= 17 && hour < 21) {
            greeting = 'Good Evening! 🌅';
        } else {
            greeting = 'Good Night! 🌙';
        }
        
        // Add greeting to hero subtitle
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            subtitle.innerHTML = `${greeting}<br>${subtitle.textContent}`;
        }
    }

    addTimeBasedGreeting();

    console.log('🏮 Mid-Autumn Festival Website Loaded Successfully! 🥮');
    console.log('🌕 May the full moon bring you happiness and prosperity! 🌕');
});