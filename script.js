function digiticket()
{

    window.location = 'Digiticket.html'

}

function mlab()
{

    window.location = 'mlab.html'

}




document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize EmailJS
    emailjs.init("1RMchPbECF_t2HLD-"); // Replace with your EmailJS PUBLIC KEY (not service ID)
    
    function updateAgeAndExperience() {
        const birthDate = new Date('1994-01-17'); 
        const careerStartDate = new Date('2020-06-01'); 
        
        const today = new Date();
        
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        // Calculate years of experience (increases every June 1st)
        let experience = today.getFullYear() - careerStartDate.getFullYear();
        
        // Check if June 1st has passed this year
        const thisYearJune1st = new Date(today.getFullYear(), 5, 1); // Month 5 = June (0-indexed)
        if (today < thisYearJune1st) {
            experience--;
        }
        
        // Update experience in description text
        const experienceTextElement = document.getElementById('experience-text');
        if (experienceTextElement) {
            experienceTextElement.textContent = experience + '';
        }
        
        // Update experience in stats
        const experienceStatElement = document.getElementById('experience-stat');
        if (experienceStatElement) {
            experienceStatElement.textContent = experience + '';
        }
        
        // Update age in stats
        const ageStatElement = document.getElementById('age-stat');
        if (ageStatElement) {
            ageStatElement.textContent = age;
        }
        
        // Console log for debugging
        console.log(`Age: ${age}, Experience: ${experience}+ years`);
        console.log(`Next experience increase: June 1st, ${today.getFullYear() + 1}`);
        console.log(`Next birthday: ${birthDate.getMonth() + 1}/${birthDate.getDate()}/${today.getFullYear() + 1}`);
    }
    
    // Call the function immediately
    updateAgeAndExperience();
    
    // Optional: Set up automatic yearly updates (runs every hour to check for date changes)
    setInterval(updateAgeAndExperience, 3600000); // 1 hour = 3,600,000 milliseconds
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });



    // Enhanced navbar scroll effect
    const navbar = document.querySelector('.modern-nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
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
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            
            const skillsSection = document.querySelector('#skills');
            if (skillsSection) {
                const offsetTop = skillsSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
        
        // Add hover effect
        scrollIndicator.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-50%) scale(1.1)';
        });
        
        scrollIndicator.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(-50%) scale(1)';
        });
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formMessages = document.getElementById('form-messages');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Disable submit button and show loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            
            // Hide previous messages
            formMessages.style.display = 'none';
            formMessages.className = '';
            
            // Get form data
            const formData = new FormData(contactForm);
            const templateParams = {
                to_name: 'Ean Bosman',
                username: formData.get('user_name'),
                email: formData.get('user_email'),
                subject: formData.get('subject'),
                contact: formData.get('user_email'), // Using email since we don't have phone field
                message: formData.get('message')
            };
            
            // Send email using EmailJS
            emailjs.send('service_kug2w28', 'template_e23m3rp', templateParams)
                .then(function(response) {
                    console.log('Email sent successfully:', response);
                    
                    // Show success message
                    formMessages.innerHTML = '<i class="fas fa-check-circle me-2"></i>Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.';
                    formMessages.className = 'success';
                    
                    // Reset form
                    contactForm.reset();
                    
                }, function(error) {
                    console.error('Email sending failed:', error);
                    
                    // Show error message
                    formMessages.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Sorry, there was an error sending your message. Please try again or contact me directly at macdonaldbosman@gmail.com';
                    formMessages.className = 'error';
                })
                .finally(function() {
                    // Re-enable submit button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
                });
        });
    }

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

    // Enhanced progress bars
    const initializeProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.dataset.targetWidth = targetWidth;
            bar.style.width = '0%';
        });
    };

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
                    }, index * 150);
                }
            });
        }
    };

    initializeProgressBars();

    // Elegant typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let index = 0;
        const typeText = () => {
            if (index < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeText, 40);
            }
        };
        
        setTimeout(typeText, 800);
    }

    // Subtle parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;
            
            if (scrolled < heroHeight) {
                heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }

    // Enhanced card interactions
    const cards = document.querySelectorAll('.project-card, .timeline-card, .info-card, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Timeline dot animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const marker = this.querySelector('.timeline-dot');
            if (marker) {
                marker.style.transform = 'scale(1.2)';
                marker.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const marker = this.querySelector('.timeline-dot');
            if (marker) {
                marker.style.transform = 'scale(1)';
            }
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Scroll progress indicator
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    };

    // Fade up animation for elements
    const observeElements = () => {
        const elements = document.querySelectorAll('.section-header, .about-content, .skill-item, .timeline-card, .project-card, .contact-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-up', 'animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(el => {
            el.classList.add('fade-up');
            observer.observe(el);
        });
    };

    // Floating animations for specific elements
    const addFloatingAnimations = () => {
        const floatingElements = document.querySelectorAll('.floating-badge, .social-link-large, .info-icon');
        floatingElements.forEach((element, index) => {
            element.classList.add('floating-element');
            element.style.animationDelay = `${index * 0.5}s`;
        });
    };

    // Enhanced project filter with smooth transitions
    const projectTabs = document.querySelectorAll('[data-bs-toggle="pill"]');
    const projectCards = document.querySelectorAll('.project-card');
    
    projectTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Add subtle fade effect
            projectCards.forEach(card => {
                card.style.opacity = '0.5';
                card.style.transform = 'scale(0.95)';
            });
            
            setTimeout(() => {
                projectCards.forEach(card => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                });
            }, 200);
        });
    });

    // Smooth page load animation
    const initPageLoad = () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.6s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    };

    // Image lazy loading with fade effect
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.src = img.dataset.src;
                    img.onload = () => {
                        img.style.transition = 'opacity 0.3s ease';
                        img.style.opacity = '1';
                    };
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Custom cursor for desktop
    const createCustomCursor = () => {
        if (window.innerWidth > 768) {
            const cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            cursor.style.cssText = `
                width: 20px;
                height: 20px;
                border: 2px solid #2563eb;
                border-radius: 50%;
                position: fixed;
                pointer-events: none;
                z-index: 9999;
                transition: all 0.15s ease;
                opacity: 0;
            `;
            document.body.appendChild(cursor);
            
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX - 10 + 'px';
                cursor.style.top = e.clientY - 10 + 'px';
                cursor.style.opacity = '1';
            });
            
            document.addEventListener('mouseleave', () => {
                cursor.style.opacity = '0';
            });
            
            // Enhanced cursor for interactive elements
            const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .project-card, .timeline-card');
            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    cursor.style.width = '40px';
                    cursor.style.height = '40px';
                    cursor.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
                });
                
                element.addEventListener('mouseleave', () => {
                    cursor.style.width = '20px';
                    cursor.style.height = '20px';
                    cursor.style.backgroundColor = 'transparent';
                });
            });
        }
    };

    // Throttled scroll handler
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

    // Initialize all effects
    window.addEventListener('scroll', handleScroll);
    
    // Initialize on load
    initPageLoad();
    createScrollProgress();
    observeElements();
    addFloatingAnimations();
    createCustomCursor();
    
    // Simple welcome message
    console.log(`
    ┌─────────────────────────────────────────────────────────┐
    │                                                         │
    │  🚀 Ean Bosman - Software Developer Portfolio         │
    │                                                         │
    │  ✨ Minimal & Unique Design                            │
    │  💼 4+ Years Experience                                │
    │  🎯 Web & Mobile Development Specialist                │
    │                                                         │
    └─────────────────────────────────────────────────────────┘
    `);
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