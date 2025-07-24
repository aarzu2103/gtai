// Advanced animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initHoverAnimations();
    initCounterAnimations();
    initParallaxEffects();
    initTypewriterEffect();
    initProgressAnimations();
});

// Scroll-triggered animations
function initScrollAnimations() {
    const animateOnScrollOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animateOnScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animate || 'fadeInUp';
                const delay = element.dataset.delay || 0;
                
                setTimeout(() => {
                    element.classList.add(`animate-${animationType}`);
                    element.style.opacity = '1';
                }, delay);
                
                animateOnScrollObserver.unobserve(element);
            }
        });
    }, animateOnScrollOptions);
    
    // Observe elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(element => {
        element.style.opacity = '0';
        animateOnScrollObserver.observe(element);
    });
    
    // Auto-observe common elements
    const autoAnimateElements = [
        '.service-card',
        '.feature-card',
        '.step-card'
    ];
    
    autoAnimateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((element, index) => {
            if (!element.dataset.animate) {
                element.dataset.animate = 'fadeInUp';
                element.dataset.delay = index * 100;
                element.style.opacity = '0';
                animateOnScrollObserver.observe(element);
            }
        });
    });
}

// Hover animations
function initHoverAnimations() {
    // Service cards hover effects
    document.querySelectorAll('.service-card').forEach(card => {
        const banner = card.querySelector('.service-banner');
        const overlay = card.querySelector('.service-overlay');
        
        card.addEventListener('mouseenter', () => {
            if (banner) {
                banner.style.transform = 'scale(1.1)';
            }
            if (overlay) {
                overlay.style.transform = 'translate(-50%, -50%) scale(1.1)';
                overlay.style.background = 'rgba(255, 255, 255, 1)';
            }
            card.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (banner) {
                banner.style.transform = 'scale(1)';
            }
            if (overlay) {
                overlay.style.transform = 'translate(-50%, -50%) scale(1)';
                overlay.style.background = 'rgba(255, 255, 255, 0.9)';
            }
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Button hover effects
    document.querySelectorAll('.cta-primary, .cta-secondary, .contact-btn, .demo-btn').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Feature icons rotation
    document.querySelectorAll('.feature-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                const duration = parseInt(counter.dataset.duration) || 2000;
                
                animateCounter(counter, 0, target, duration);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutCubic)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (range * easeProgress));
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Throttle scroll event for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Typewriter effect
function initTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
        const text = element.dataset.typewriter || element.textContent;
        const speed = parseInt(element.dataset.speed) || 50;
        
        element.textContent = '';
        element.style.borderRight = '2px solid #8b5cf6';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter(element, text, speed);
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

function typeWriter(element, text, speed) {
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Blinking cursor effect
            setInterval(() => {
                element.style.borderRight = element.style.borderRight === 'none' 
                    ? '2px solid #8b5cf6' 
                    : 'none';
            }, 500);
        }
    }
    
    type();
}

// Progress bar animations
function initProgressAnimations() {
    const progressBars = document.querySelectorAll('.progress-fill, [data-progress]');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.dataset.progress || '100';
                
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.transition = 'width 2s ease-out';
                    progressBar.style.width = `${targetWidth}%`;
                }, 200);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.3 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Interactive elements
function addInteractiveEffects() {
    // Ripple effect for buttons
    document.addEventListener('click', function(e) {
        const button = e.target.closest('button, .btn, .cta-primary, .cta-secondary, .demo-btn');
        if (!button) return;
        
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        const rippleContainer = button.querySelector('.ripple-container') || button;
        rippleContainer.style.position = 'relative';
        rippleContainer.style.overflow = 'hidden';
        rippleContainer.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    
    // Add ripple keyframes
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Magnetic effect for interactive elements
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) * 0.1;
            const deltaY = (e.clientY - centerY) * 0.1;
            
            this.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// Smooth reveal animation
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const direction = element.dataset.reveal || 'bottom';
                
                element.classList.add(`reveal-${direction}`);
                revealObserver.unobserve(element);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Add reveal CSS
    if (!document.querySelector('#reveal-styles')) {
        const style = document.createElement('style');
        style.id = 'reveal-styles';
        style.textContent = `
            [data-reveal] {
                opacity: 0;
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            [data-reveal="bottom"] {
                transform: translateY(50px);
            }
            
            [data-reveal="top"] {
                transform: translateY(-50px);
            }
            
            [data-reveal="left"] {
                transform: translateX(-50px);
            }
            
            [data-reveal="right"] {
                transform: translateX(50px);
            }
            
            .reveal-bottom,
            .reveal-top,
            .reveal-left,
            .reveal-right {
                opacity: 1;
                transform: translate(0, 0);
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize all interactive effects
document.addEventListener('DOMContentLoaded', function() {
    addInteractiveEffects();
    initMagneticEffect();
    initRevealAnimations();
});

// Performance optimization
function optimizeAnimations() {
    // Reduce animations on low-performance devices
    const isLowPerformance = navigator.hardwareConcurrency < 4 || 
                           navigator.deviceMemory < 4 || 
                           /Mobile|Android/i.test(navigator.userAgent);
    
    if (isLowPerformance) {
        document.body.classList.add('reduced-animations');
        
        // Add reduced animation styles
        const style = document.createElement('style');
        style.textContent = `
            .reduced-animations * {
                animation-duration: 0.3s !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.3s !important;
            }
            
            .reduced-animations .bubble {
                animation-duration: 8s !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize performance optimization
document.addEventListener('DOMContentLoaded', optimizeAnimations);

// Export functions for external use
window.AnimationUtils = {
    animateCounter,
    typeWriter,
    initScrollAnimations,
    initHoverAnimations,
    optimizeAnimations
};