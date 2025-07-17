// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navMenu.addEventListener('click', function(e) {
            if (e.target.classList.contains('nav-link')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Book Now Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const bookNowButtons = document.querySelectorAll('.book-now-btn, .btn-primary[href^="tel:"]');
    
    bookNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const phoneNumber = '616-264-2390';
            
            // Check if device supports tel: links
            if (window.location.protocol === 'https:' || window.location.hostname === 'localhost') {
                // Allow the default tel: link behavior
                return;
            } else {
                // Fallback for environments that don't support tel: links
                e.preventDefault();
                alert(`Please call us at ${phoneNumber} to book your appointment.`);
            }
        });
    });
});

// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Validate form
            const isValid = validateForm();
            
            if (isValid) {
                // Show loading state
                showLoading();
                
                // Simulate form submission (replace with actual submission logic)
                setTimeout(() => {
                    showSuccess();
                    contactForm.reset();
                }, 2000);
            }
        });
    }
    
    function validateForm() {
        let isValid = true;
        
        // Name validation
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            showError(name, 'Name is required');
            isValid = false;
        }
        
        // Email validation
        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!emailPattern.test(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation
        const phone = document.getElementById('phone');
        const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phone.value.trim()) {
            showError(phone, 'Phone number is required');
            isValid = false;
        } else if (!phonePattern.test(phone.value.replace(/\D/g, ''))) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Message validation
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            showError(message, 'Message is required');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        
        // Remove existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
    }
    
    function clearErrors() {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error');
            const errorMessage = group.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
        
        // Remove success message
        const successMessage = document.querySelector('.form-success');
        if (successMessage) {
            successMessage.remove();
        }
    }
    
    function showLoading() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
        }
        contactForm.classList.add('form-loading');
    }
    
    function showSuccess() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;
        }
        contactForm.classList.remove('form-loading');
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <strong>Thank you!</strong> Your message has been sent successfully. We'll get back to you soon.
            <br><br>
            For immediate assistance, please call us at <a href="tel:616-264-2390">616-264-2390</a>.
        `;
        
        contactForm.insertBefore(successMessage, contactForm.firstChild);
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }
});

// Scroll to Top Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-bronze);
        color: var(--primary-black);
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(205, 127, 50, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for Fade-in Animation
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    const elementsToObserve = document.querySelectorAll('.service-card, .testimonial-card, .value-card, .why-choose-item, .mission-point, .contact-item');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});

// Form Input Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Add focus and blur effects
        input.addEventListener('focus', function() {
            this.closest('.form-group').classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.closest('.form-group').classList.remove('focused');
        });
        
        // Real-time validation feedback
        input.addEventListener('input', function() {
            const formGroup = this.closest('.form-group');
            if (formGroup.classList.contains('error')) {
                formGroup.classList.remove('error');
                const errorMessage = formGroup.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
    });
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            this.value = value;
        });
    }
});

// Testimonials Slider Enhancement (if needed)
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // Add hover effects for testimonials
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Service Cards Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.05)';
            this.style.boxShadow = '0 20px 50px rgba(205, 127, 50, 0.4)';
            this.style.borderColor = 'rgba(205, 127, 50, 0.5)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
            this.style.borderColor = 'rgba(192, 192, 192, 0.1)';
        });
    });
});

// Navbar Scroll Effect
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
});

// Performance Optimization - Lazy Loading
document.addEventListener('DOMContentLoaded', function() {
    // Add loading="lazy" to images if not already present
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
});

// Error Handling for External Resources
window.addEventListener('error', function(e) {
    console.error('Resource loading error:', e);
    // You can add custom error handling here
});

// Animated Counters for Statistics
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
});

// Keyboard Navigation Enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for custom elements
    const interactiveElements = document.querySelectorAll('.service-card, .testimonial-card, .value-card');
    
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Add custom interaction behavior if needed
                const link = this.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        });
    });
});

// Browser Compatibility Checks
document.addEventListener('DOMContentLoaded', function() {
    // Check for CSS Grid support
    if (!CSS.supports('display', 'grid')) {
        document.body.classList.add('no-grid');
    }
    
    // Check for Intersection Observer support
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        const elements = document.querySelectorAll('.service-card, .testimonial-card, .value-card');
        elements.forEach(element => {
            element.classList.add('fade-in');
        });
    }
});

// Print Styles Handler
window.addEventListener('beforeprint', function() {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
});

// Local Storage for User Preferences (if needed in future)
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (!hasVisited) {
        localStorage.setItem('hasVisited', 'true');
        // You can add first-time visitor logic here
    }
});
