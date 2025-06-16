// Smooth scrolling
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Enhanced Intersection Observer for smooth animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate cards on scroll
    const cards = document.querySelectorAll('.skill-card, .project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
        observer.observe(card);
    });

    // Enhanced parallax for floating elements
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            el.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${scrolled * 0.05}deg)`;
        });
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Typing effect for hero subtitle
    const subtitle = document.querySelector('.hero .subtitle');
    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    
    setTimeout(() => {
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                subtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        };
        typeWriter();
    }, 1000);

    // Enhanced nav scroll effect
    let lastScrollTop = 0;
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        
        // Add background when scrolled
        if (scrollTop > 50) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.8)';
        }
        
        lastScrollTop = scrollTop;
    });
});