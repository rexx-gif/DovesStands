function hideLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    loader.classList.add('fade-out');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
}

// Coba dengan timeout fallback
const fallbackTimer = setTimeout(hideLoader, 3000); // Max 3 detik

// Gunakan MutationObserver sebagai fallback
const observer = new MutationObserver(function(mutations) {
    if (document.readyState === 'complete') {
        clearTimeout(fallbackTimer);
        hideLoader();
        observer.disconnect();
    }
});

observer.observe(document, {
    childList: true,
    subtree: true
});

// Juga gunakan event standard
window.addEventListener('load', function() {
    clearTimeout(fallbackTimer);
    hideLoader();
    observer.disconnect();
});

const body = document.body; // di luar semua fungsi

        // Theme toggle functionality
       // Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('span');
    const html = document.documentElement;

    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Apply the saved theme immediately
    if (savedTheme === 'dark') {
        html.classList.add('dark-theme');
        icon.classList.replace('fa-moon', 'fa-sun');
        themeText.textContent = 'Light Mode';
    } else {
        html.classList.remove('dark-theme');
        icon.classList.replace('fa-sun', 'fa-moon');
        themeText.textContent = 'Dark Mode';
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', function(e) {
        // Toggle the theme class
        html.classList.toggle('dark-theme');
        
        // Determine the current theme
        const isDark = html.classList.contains('dark-theme');
        
        // Update icon and text
        if (isDark) {
            icon.classList.replace('fa-moon', 'fa-sun');
            themeText.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            themeText.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }

        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = `${e.offsetX}px`;
        ripple.style.top = `${e.offsetY}px`;
        themeToggle.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

            
            // Review functionality
            const reviewForm = document.getElementById('reviewForm');
            const reviewsList = document.getElementById('reviewsList');
            
            // Load reviews from localStorage or use sample data if none exists
            let reviews = JSON.parse(localStorage.getItem('dovesReviews')) || [
                {
                    id: 1,
                    name: 'Rina Sari',
                    text: 'The sosis bakar is amazing! The sauce is perfectly balanced between sweet and spicy.',
                    rating: 5,
                    date: '2023-10-15'
                },
                {
                    id: 2,
                    name: 'Budi Santoso',
                    text: 'Great variety of food. The mie ayam is my favorite, reminds me of my childhood.',
                    rating: 4,
                    date: '2023-10-10'
                },
                {
                    id: 3,
                    name: 'Anita Wijaya',
                    text: 'The es campur is so refreshing on a hot day. Will definitely come back!',
                    rating: 5,
                    date: '2023-10-05'
                }
            ];
            
            // Save reviews to localStorage
            function saveReviews() {
                localStorage.setItem('dovesReviews', JSON.stringify(reviews));
            }
            
            // Display reviews with dark theme support
            function displayReviews() {
                reviewsList.innerHTML = '';
                
                // Sort reviews by date (newest first)
                const sortedReviews = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
                
                sortedReviews.forEach(review => {
                    const reviewElement = document.createElement('div');
                    reviewElement.className = 'review-card';
                    reviewElement.innerHTML = `
                        <div class="review-header">
                            <span class="review-name">${review.name}</span>
                            <span class="review-rating" style="color: ${body.classList.contains('dark-theme') ? '#ff6b6b' : '#e74c3c'}">
                                ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                            </span>
                        </div>
                        <p class="review-text">${review.text}</p>
                        <p class="review-date">${formatDate(review.date)}</p>
                    `;
                    reviewsList.appendChild(reviewElement);
                });
            }
            
            // Format date
            function formatDate(dateString) {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(dateString).toLocaleDateString('en-US', options);
            }
            
            // Handle form submission with dark theme support
            reviewForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('reviewName').value.trim();
                const text = document.getElementById('reviewText').value.trim();
                const rating = parseInt(document.getElementById('reviewRating').value);
                
                // Validate inputs
                if (!name || !text) {
                    // Create a more stylish alert for dark theme
                    const alertBox = document.createElement('div');
                    alertBox.className = `custom-alert ${body.classList.contains('dark-theme') ? 'dark' : 'light'}`;
                    alertBox.textContent = 'Please fill in all fields';
                    document.body.appendChild(alertBox);
                    
                    setTimeout(() => {
                        alertBox.classList.add('show');
                    }, 10);
                    
                    setTimeout(() => {
                        alertBox.classList.remove('show');
                        setTimeout(() => {
                            alertBox.remove();
                        }, 300);
                    }, 3000);
                    return;
                }
                
                // Create new review
                const newReview = {
                    id: Date.now(), // Using timestamp for unique ID
                    name,
                    text,
                    rating,
                    date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
                };
                
                // Add to reviews array
                reviews.unshift(newReview);
                
                // Save to localStorage
                saveReviews();
                
                // Display updated reviews
                displayReviews();
                
                // Reset form
                reviewForm.reset();
                
                // Create a success notification that matches the theme
                const successMsg = document.createElement('div');
                successMsg.className = `custom-success ${body.classList.contains('dark-theme') ? 'dark' : 'light'}`;
                successMsg.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <span>Thank you for your review!</span>
                `;
                document.body.appendChild(successMsg);
                
                setTimeout(() => {
                    successMsg.classList.add('show');
                }, 10);
                
                setTimeout(() => {
                    successMsg.classList.remove('show');
                    setTimeout(() => {
                        successMsg.remove();
                    }, 300);
                }, 3000);
            });
            
            // Initial display of reviews
            displayReviews();
            
            // Enhanced smooth scrolling for navigation links
            document.querySelectorAll('.button-container a').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    
                    // Add active class to clicked nav item
                    document.querySelectorAll('.button').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    this.querySelector('.button').classList.add('active');
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                });
            });
            
            // Animation on scroll with performance improvements
            let isScrolling;
            function animateOnScroll() {
                // Clear our timeout throughout the scroll
                window.clearTimeout(isScrolling);
                
                // Set a timeout to run after scrolling ends
                isScrolling = setTimeout(() => {
                    const sections = document.querySelectorAll('.section');
                    
                    sections.forEach(section => {
                        const sectionTop = section.getBoundingClientRect().top;
                        const windowHeight = window.innerHeight;
                        
                        if (sectionTop < windowHeight - 100) {
                            section.style.opacity = '1';
                            section.style.transform = 'translateY(0)';
                        }
                    });
                }, 60);
            }
            
            // Set initial styles for animation
            document.querySelectorAll('.section').forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
            
            // Run once on load
            animateOnScroll();
            
            // Run on scroll with debounce
            window.addEventListener('scroll', animateOnScroll);
            
            // Add ripple effect CSS dynamically
            const style = document.createElement('style');
            style.textContent = `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.7);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                }
                
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                
                .custom-alert, .custom-success {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 15px 25px;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transform: translateX(150%);
                    transition: transform 0.3s ease;
                    z-index: 10000;
                }
                
                .custom-alert.light, .custom-success.light {
                    background: #fff;
                    color: #e74c3c;
                    border: 1px solid #e74c3c;
                }
                
                .custom-alert.dark, .custom-success.dark {
                    background: #2d2d2d;
                    color: #ff6b6b;
                    border: 1px solid #ff6b6b;
                }
                
                .custom-success.light {
                    color: #2ecc71;
                    border: 1px solid #2ecc71;
                }
                
                .custom-success.dark {
                    color: #6e48aa;
                    border: 1px solid #6e48aa;
                }
                
                .custom-alert.show, .custom-success.show {
                    transform: translateX(0);
                }
                
                .button.active {
                    background-color: rgba(255, 255, 255, 0.2) !important;
                    transform: translateY(-3px) scale(1.1);
                }
                
                .button.active i, .button.active svg {
                    color: var(--primary-color);
                }
            `;
            document.head.appendChild(style);