function digiticket()
{

    window.location = 'Digiticket.html'

}

function mlab()
{

    window.location = 'mlab.html'

}




// ===============================
// MODERN PORTFOLIO JAVASCRIPT
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.modern-nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPos = window.pageYOffset + 120;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });

    // Initialize progress bars with proper animation
    const initializeProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        // Initially set all progress bars to 0 width
        progressBars.forEach(bar => {
            const targetWidth = bar.style.width; // Get the target width from inline style
            bar.dataset.targetWidth = targetWidth; // Store target width
            bar.style.width = '0%'; // Start from 0
        });
    };

    // Animate progress bars when skills section comes into view
    const animateProgressBars = () => {
        const skillsSection = document.querySelector('#skills');
        if (!skillsSection) return;
        
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            const progressBars = document.querySelectorAll('.progress-bar');
            
            progressBars.forEach((bar, index) => {
                if (!bar.classList.contains('animated')) {
                    setTimeout(() => {
                        const targetWidth = bar.dataset.targetWidth;
                        bar.style.width = targetWidth;
                        bar.classList.add('animated');
                    }, index * 200); // Stagger animation
                }
            });
        }
    };

    // Initialize progress bars
    initializeProgressBars();

    // Throttle scroll events for better performance
    let ticking = false;
    
    const handleScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                animateProgressBars();
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let index = 0;
        const typeText = () => {
            if (index < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeText, 50);
            }
        };
        
        // Start typing effect after hero title animation
        setTimeout(typeText, 1000);
    }

    // Improved scroll behavior - disable parallax to prevent overlap issues
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;
            
            // Add fade effect when scrolling past hero instead of parallax
            if (scrolled > heroHeight * 0.8) {
                heroSection.style.opacity = Math.max(0, 1 - (scrolled - heroHeight * 0.8) / (heroHeight * 0.2));
            } else {
                heroSection.style.opacity = 1;
            }
        });
    }

    // Enhanced project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Experience card interactions
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const logo = this.querySelector('.company-logo img');
            if (logo) {
                logo.style.transform = 'scale(1.1)';
                logo.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const logo = this.querySelector('.company-logo img');
            if (logo) {
                logo.style.transform = 'scale(1)';
            }
        });
    });

    // Social links hover effects
    const socialLinks = document.querySelectorAll('.social-link, .social-link-large');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Button ripple effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // Dynamic year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer p');
    if (yearElement && yearElement.textContent.includes('2025')) {
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }

    // Enhanced mobile menu
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                    navbarToggler.classList.remove('active');
                }
            }
        });
    }



    // Contact form enhancements (if needed in future)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted');
        });
    }

    // Performance optimization: Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Recalculate any size-dependent features
            AOS.refresh();
        }, 250);
    });

    // Accessibility enhancements
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    // Add focus indicators for keyboard navigation
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #2563eb';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Preloader (if needed)
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        });
    }

    console.log('🚀 Modern Portfolio JavaScript Loaded Successfully!');
});

// CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .navbar-toggler.active {
        transform: rotate(90deg);
    }
    
    .progress-bar.animated::after {
        animation: shimmer 2s infinite;
    }
    
    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);