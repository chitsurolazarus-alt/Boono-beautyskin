// JavaScript for Bono BeautySkin Website (No Prices)

// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff69b4, #db7093);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(255, 105, 180, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Contact Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        // Validate form
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully! We\'ll contact you soon.');
            
            // Reset form
            contactForm.reset();
            
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // In a real application, you would send data to a server
            console.log('Contact form submitted:', {
                name: name,
                email: email,
                subject: subject,
                message: message
            });
            
        }, 2000);
    });
}

// Quick View Product Functionality (Without Price)
const quickViewButtons = document.querySelectorAll('.quick-view');
quickViewButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productDescription = productCard.querySelector('p').textContent;
        
        // Create modal for quick view
        createQuickViewModal(productName, productDescription);
    });
});

function createQuickViewModal(name, description) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.quick-view-modal');
    if (existingModal) existingModal.remove();
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close"><i class="fas fa-times"></i></button>
            <h3>${name}</h3>
            <div class="modal-image"></div>
            <p class="modal-description">${description}</p>
            <div class="modal-actions">
                <a href="#contact" class="btn btn-primary">
                    <i class="fas fa-comment-dots"></i> Inquire Now
                </a>
                <button class="btn btn-secondary close-modal-btn">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
        </div>
    `;
    
    // Add styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .quick-view-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: relative;
            background: white;
            padding: 40px;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            z-index: 1001;
            animation: modalSlideIn 0.3s ease;
            box-shadow: 0 20px 40px rgba(255, 105, 180, 0.2);
            text-align: center;
        }
        
        .modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #ff69b4;
            cursor: pointer;
        }
        
        .modal-image {
            width: 100%;
            height: 200px;
            background: linear-gradient(135deg, #ffe4e9, #ffb6c1);
            border-radius: 10px;
            margin: 20px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ff69b4;
            font-size: 3rem;
        }
        
        .modal-description {
            color: var(--text-light);
            margin: 20px 0;
            line-height: 1.6;
        }
        
        .modal-actions {
            display: flex;
            gap: 15px;
            margin-top: 30px;
            justify-content: center;
        }
        
        .modal-actions .btn {
            padding: 12px 25px;
            font-size: 0.95rem;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(modalStyle);
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
        modalStyle.remove();
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', () => {
        modal.remove();
        modalStyle.remove();
    });
    
    modal.querySelector('.close-modal-btn').addEventListener('click', () => {
        modal.remove();
        modalStyle.remove();
    });
}

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(255, 105, 180, 0.2)';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.boxShadow = '';
        header.style.background = '';
        header.style.backdropFilter = '';
    }
});

// Product Card Animations on Scroll
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

// Observe all product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Transformation Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
});

function initializeCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const indicatorsContainer = document.querySelector('.indicators-container');
    const autoPlayButton = document.querySelector('.auto-play-btn');
    
    let currentSlide = 0;
    let autoPlayInterval;
    let isAutoPlaying = true;
    
    // Create indicators for 11 slides
    for (let i = 0; i < 6; i++) { // Currently showing 6 slides
        const indicator = document.createElement('button');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
    
    // Next button
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % 6;
        updateCarousel();
    });
    
    // Previous button
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + 6) % 6;
        updateCarousel();
    });
    
    // Auto-play functionality
    function startAutoPlay() {
        if (isAutoPlaying) {
            autoPlayInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % 6;
                updateCarousel();
            }, 5000); // Change slide every 5 seconds
        }
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Auto-play button
    autoPlayButton.addEventListener('click', () => {
        isAutoPlaying = !isAutoPlaying;
        if (isAutoPlaying) {
            startAutoPlay();
            autoPlayButton.innerHTML = '<i class="fas fa-pause"></i> Pause';
        } else {
            stopAutoPlay();
            autoPlayButton.innerHTML = '<i class="fas fa-play"></i> Play';
        }
    });
    
    // Update carousel position
    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update indicators
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Update slide numbers
        document.querySelectorAll('.slide-number').forEach((slideNumber, index) => {
            if (index === currentSlide) {
                slideNumber.textContent = `${index + 1} / 6`;
            }
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextButton.click();
        } else if (e.key === 'ArrowLeft') {
            prevButton.click();
        }
    });
    
    // Pause auto-play on hover
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', () => {
        if (isAutoPlaying) startAutoPlay();
    });
    
    // Start auto-play initially
    startAutoPlay();
}

// View All Transformations Functionality
function showAllTransformations() {
    const gallery = document.getElementById('allTransformations');
    const galleryGrid = gallery.querySelector('.gallery-grid');
    
    // Clear existing content
    galleryGrid.innerHTML = '';
    
    // Create gallery items for all 11 transformations
    for (let i = 1; i <= 11; i++) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <div class="gallery-images">
                <div class="gallery-before" style="background-image: url('images/transformations/before${i}.jpg');"></div>
                <div class="gallery-after" style="background-image: url('images/transformations/after${i}.jpg');"></div>
            </div>
            <div class="gallery-info">
                <h4>Transformation #${i}</h4>
                <p>Customer success story - See the amazing results!</p>
            </div>
        `;
        galleryGrid.appendChild(galleryItem);
    }
    
    gallery.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAllTransformations() {
    const gallery = document.getElementById('allTransformations');
    gallery.classList.remove('active');
    document.body.style.overflow = '';
}

// Close gallery on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllTransformations();
    }
});

// Close gallery when clicking outside
document.addEventListener('click', (e) => {
    const gallery = document.getElementById('allTransformations');
    if (gallery.classList.contains('active') && e.target === gallery) {
        closeAllTransformations();
    }
});

// Add hover effect to product images
document.addEventListener('DOMContentLoaded', () => {
    const productImages = document.querySelectorAll('.product-image');
    productImages.forEach(image => {
        image.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.05)';
        });
        
        image.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)';
        });
    });
    
    // Update current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    console.log('Bono BeautySkin website loaded successfully!');
});

// WhatsApp Direct Chat
const whatsappButton = document.querySelector('a[href*="wa.me"]');
if (whatsappButton) {
    whatsappButton.addEventListener('click', function(e) {
        console.log('WhatsApp clicked - 066 252 3100');
    });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.quick-view-modal');
        if (modal) {
            modal.remove();
            document.querySelector('style[data-modal]')?.remove();
        }
        closeAllTransformations();
    }
});