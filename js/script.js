/**
 * UNIVERSAL MAXIMUM INTELLIGENCE JAVASCRIPT
 * Premium Fruit Website - Advanced Interactive Features
 * 
 * Features:
 * - Progressive Web App capabilities
 * - Advanced accessibility support
 * - Performance optimizations
 * - Smooth animations and interactions
 * - Intelligent cart management
 * - Real-time form validation
 * - Intersection Observer animations
 * - Lazy loading and image optimization
 * - Service Worker integration
 * - Advanced error handling
 */

'use strict';

// ================================
// MODERN WEB APP CONFIGURATION
// ================================

class FruitWebsite {
    constructor() {
        this.cart = new CartManager();
        this.forms = new FormManager();
        this.animations = new AnimationManager();
        this.navigation = new NavigationManager();
        this.performance = new PerformanceManager();
        this.accessibility = new AccessibilityManager();
        this.images = new ImageManager();
        this.theme = new ThemeManager();
        
        this.init();
    }

    async init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
            } else {
                this.initializeComponents();
            }
        } catch (error) {
            console.error('Failed to initialize website:', error);
            this.handleCriticalError(error);
        }
    }

    initializeComponents() {
        // Initialize all components
        this.navigation.init();
        this.cart.init();
        this.forms.init();
        this.animations.init();
        this.performance.init();
        this.accessibility.init();
        this.theme.init();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initialize loading screen
        this.hideLoadingScreen();
        
        // Setup intersection observers
        this.setupIntersectionObservers();
        
        // Initialize progressive enhancements
        this.initializeProgressiveEnhancements();
        
        console.log('🍎 FreshFruit Paradise - Website initialized successfully!');
    }

    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.addEventListener('click', this.handleSmoothScroll.bind(this));
        
        // Keyboard navigation support
        document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
        
        // Back to top button
        this.setupBackToTop();
        
        // Fruit filtering
        this.setupFruitFiltering();
        
        // Search functionality
        this.setupFruitSearch();
        
        // Sort functionality
        this.setupFruitSorting();
        
        // Quantity selectors
        this.setupQuantitySelectors();
        
        // Hero button actions
        this.setupHeroActions();
        
        // Hero statistics animation
        this.setupStatisticsAnimation();
        
        // Newsletter form
        this.setupNewsletterForm();
        
        // Window events
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Error handling
        window.addEventListener('error', this.handleGlobalError.bind(this));
        window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 350);
            }, 1500);
        }
    }

    handleSmoothScroll(event) {
        const link = event.target.closest('a[href^="#"]');
        if (!link) return;

        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update focus for accessibility
            targetElement.tabIndex = -1;
            targetElement.focus();
            
            // Update navigation active state
            this.navigation.updateActiveLink(link);
        }
    }

    handleKeyboardNavigation(event) {
        // ESC key to close modals/sidebars
        if (event.key === 'Escape') {
            this.cart.closeCart();
            this.navigation.closeMobileMenu();
        }
        
        // Enter/Space on buttons
        if ((event.key === 'Enter' || event.key === ' ') && event.target.role === 'button') {
            event.preventDefault();
            event.target.click();
        }
    }

    setupBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupFruitFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const fruitCards = document.querySelectorAll('.fruit-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active filter
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');
                
                // Filter fruits with animation
                this.filterFruits(fruitCards, filter);
                
                // Announce filter change for screen readers
                this.accessibility.announceFilterChange(filter);
            });
        });
    }

    filterFruits(cards, filter) {
        cards.forEach((card, index) => {
            const category = card.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            setTimeout(() => {
                if (shouldShow) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        if (card.classList.contains('hidden')) {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            }, index * 50);
        });
    }

    setupFruitSearch() {
        const searchInput = document.getElementById('fruit-search');
        const searchBtn = document.querySelector('.search-btn');
        const searchResults = document.getElementById('search-results');
        
        if (!searchInput) return;
        
        const performSearch = () => {
            const query = searchInput.value.toLowerCase().trim();
            const fruitCards = document.querySelectorAll('.fruit-card');
            let visibleCount = 0;
            
            fruitCards.forEach(card => {
                const fruitName = card.querySelector('.fruit-name').textContent.toLowerCase();
                const fruitDesc = card.querySelector('.fruit-description').textContent.toLowerCase();
                const isMatch = query === '' || fruitName.includes(query) || fruitDesc.includes(query);
                
                if (isMatch && !card.classList.contains('hidden')) {
                    card.style.display = 'block';
                    card.classList.remove('search-hidden');
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                    card.classList.add('search-hidden');
                }
            });
            
            // Update results count
            if (query) {
                searchResults.textContent = `Found ${visibleCount} fruit${visibleCount !== 1 ? 's' : ''}`;
            } else {
                searchResults.textContent = '';
            }
            
            // Show no results message if needed
            const fruitsGrid = document.querySelector('.fruits-grid');
            const existingNoResults = fruitsGrid.querySelector('.no-results');
            
            if (visibleCount === 0 && query) {
                if (!existingNoResults) {
                    const noResultsDiv = document.createElement('div');
                    noResultsDiv.className = 'no-results';
                    noResultsDiv.textContent = `No fruits found for "${query}". Try a different search term.`;
                    fruitsGrid.appendChild(noResultsDiv);
                }
            } else if (existingNoResults) {
                existingNoResults.remove();
            }
        };
        
        // Search on input
        searchInput.addEventListener('input', performSearch);
        
        // Search on button click
        searchBtn.addEventListener('click', performSearch);
        
        // Search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    setupFruitSorting() {
        const sortSelect = document.getElementById('sort-select');
        if (!sortSelect) return;
        
        sortSelect.addEventListener('change', () => {
            const sortValue = sortSelect.value;
            const fruitsGrid = document.querySelector('.fruits-grid');
            const fruitCards = Array.from(fruitsGrid.querySelectorAll('.fruit-card'));
            
            // Sort cards
            fruitCards.sort((a, b) => {
                switch (sortValue) {
                    case 'name':
                        const nameA = a.querySelector('.fruit-name').textContent;
                        const nameB = b.querySelector('.fruit-name').textContent;
                        return nameA.localeCompare(nameB);
                        
                    case 'name-desc':
                        const nameDescA = a.querySelector('.fruit-name').textContent;
                        const nameDescB = b.querySelector('.fruit-name').textContent;
                        return nameDescB.localeCompare(nameDescA);
                        
                    case 'price-asc':
                        const priceA = parseFloat(a.querySelector('.fruit-price').dataset.price || 0);
                        const priceB = parseFloat(b.querySelector('.fruit-price').dataset.price || 0);
                        return priceA - priceB;
                        
                    case 'price-desc':
                        const priceDescA = parseFloat(a.querySelector('.fruit-price').dataset.price || 0);
                        const priceDescB = parseFloat(b.querySelector('.fruit-price').dataset.price || 0);
                        return priceDescB - priceDescA;
                        
                    default:
                        return 0;
                }
            });
            
            // Re-append cards in sorted order
            fruitCards.forEach((card, index) => {
                setTimeout(() => {
                    fruitsGrid.appendChild(card);
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                }, index * 50);
            });
        });
    }

    setupQuantitySelectors() {
        document.addEventListener('click', (event) => {
            // Handle quantity buttons
            if (event.target.classList.contains('qty-btn')) {
                const input = event.target.parentElement.querySelector('.qty-input');
                const currentValue = parseInt(input.value) || 1;
                
                if (event.target.classList.contains('plus')) {
                    input.value = Math.min(currentValue + 1, 99);
                } else if (event.target.classList.contains('minus')) {
                    input.value = Math.max(currentValue - 1, 1);
                }
                
                // Trigger change event
                input.dispatchEvent(new Event('change'));
            }
            
            // Handle add to cart with quantity
            if (event.target.classList.contains('add-to-cart-btn')) {
                const card = event.target.closest('.fruit-card');
                const quantityInput = card.querySelector('.qty-input');
                const quantity = parseInt(quantityInput?.value) || 1;
                
                // Add loading state
                event.target.classList.add('loading');
                event.target.disabled = true;
                
                // Simulate adding to cart
                setTimeout(() => {
                    const fruitName = card.querySelector('.fruit-name').textContent;
                    const price = event.target.dataset.price;
                    
                    // Add to cart multiple times based on quantity
                    for (let i = 0; i < quantity; i++) {
                        this.cart.addToCart({
                            name: fruitName,
                            price: `$${price}`,
                            id: this.cart.generateId(fruitName)
                        });
                    }
                    
                    // Remove loading state
                    event.target.classList.remove('loading');
                    event.target.disabled = false;
                    
                    // Reset quantity
                    if (quantityInput) {
                        quantityInput.value = 1;
                    }
                    
                    // Show success animation
                    event.target.textContent = '✓ Added!';
                    setTimeout(() => {
                        event.target.textContent = 'Add to Cart';
                    }, 1500);
                }, 600);
            }
        });
        
        // Handle quantity input changes
        document.addEventListener('change', (event) => {
            if (event.target.classList.contains('qty-input')) {
                const value = parseInt(event.target.value) || 1;
                event.target.value = Math.max(1, Math.min(value, 99));
            }
        });
    }

    setupHeroActions() {
        // Handle hero action buttons
        document.addEventListener('click', (event) => {
            const button = event.target.closest('[data-action]');
            if (!button) return;

            const action = button.dataset.action;
            
            switch (action) {
                case 'explore-fruits':
                    this.handleExploreFruits(button);
                    break;
                case 'learn-more':
                    this.handleLearnMore(button);
                    break;
                default:
                    console.warn(`Unknown action: ${action}`);
            }
        });
    }

    handleExploreFruits(button) {
        // Add loading state
        button.classList.add('loading');
        button.disabled = true;
        
        // Smooth scroll to fruits section
        const fruitsSection = document.getElementById('fruits');
        if (fruitsSection) {
            fruitsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Highlight the fruits section briefly
            setTimeout(() => {
                fruitsSection.classList.add('highlighted');
                setTimeout(() => {
                    fruitsSection.classList.remove('highlighted');
                }, 2000);
            }, 800);
        }
        
        // Remove loading state
        setTimeout(() => {
            button.classList.remove('loading');
            button.disabled = false;
        }, 1000);
        
        // Track action for analytics
        this.trackUserAction('explore_fruits_clicked');
    }

    handleLearnMore(button) {
        // Add loading state
        button.classList.add('loading');
        button.disabled = true;
        
        // Smooth scroll to about section
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Highlight the about section briefly
            setTimeout(() => {
                aboutSection.classList.add('highlighted');
                setTimeout(() => {
                    aboutSection.classList.remove('highlighted');
                }, 2000);
            }, 800);
        }
        
        // Remove loading state
        setTimeout(() => {
            button.classList.remove('loading');
            button.disabled = false;
        }, 1000);
        
        // Track action for analytics
        this.trackUserAction('learn_more_clicked');
    }

    trackUserAction(action) {
        // Simple analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: 'user_interaction',
                event_label: 'hero_buttons'
            });
        }
        
        // Log for debugging
        console.info(`User action tracked: ${action}`);
    }

    setupStatisticsAnimation() {
        const stats = document.querySelectorAll('.stat-number[data-count]');
        let animationTriggered = false;
        
        const animateStats = () => {
            if (animationTriggered) return;
            animationTriggered = true;
            
            stats.forEach((stat, index) => {
                const target = parseInt(stat.dataset.count);
                const duration = 2000;
                const startDelay = index * 200; // Stagger animations
                
                setTimeout(() => {
                    this.animateNumber(stat, 0, target, duration);
                }, startDelay);
            });
        };

        // Trigger animation when hero section is visible or immediately if already visible
        const heroSection = document.getElementById('home');
        if (heroSection) {
            const rect = heroSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                // Delay to ensure DOM is ready
                setTimeout(animateStats, 500);
            } else {
                const heroObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateStats();
                            heroObserver.disconnect();
                        }
                    });
                }, { threshold: 0.3 });
                
                heroObserver.observe(heroSection);
            }
        }
    }

    animateNumber(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    setupNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (!newsletterForm) return;

        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (this.validateEmail(email)) {
                this.handleNewsletterSubscription(email);
            }
        });
    }

    handleNewsletterSubscription(email) {
        // Simulate newsletter subscription
        const button = document.querySelector('.newsletter-form button');
        const originalText = button.textContent;
        
        button.textContent = '✓';
        button.disabled = true;
        
        setTimeout(() => {
            this.showNotification('Successfully subscribed to newsletter!', 'success');
            button.textContent = originalText;
            button.disabled = false;
            document.querySelector('.newsletter-form input').value = '';
        }, 1000);
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    setupIntersectionObservers() {
        // Animate elements on scroll
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(element => {
            observer.observe(element);
        });

        // Add scroll classes to sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('animate-on-scroll');
            observer.observe(section);
        });
    }

    initializeProgressiveEnhancements() {
        // Add modern CSS features detection
        this.detectCSSFeatures();
        
        // Initialize service worker
        this.initializeServiceWorker();
        
        // Setup offline detection
        this.setupOfflineDetection();
        
        // Initialize performance monitoring
        this.monitorPerformance();
    }

    detectCSSFeatures() {
        const html = document.documentElement;
        
        // Check for CSS Grid support
        if (CSS.supports('display', 'grid')) {
            html.classList.add('css-grid');
        }
        
        // Check for CSS Custom Properties support
        if (CSS.supports('color', 'var(--test)')) {
            html.classList.add('css-custom-properties');
        }
        
        // Check for backdrop-filter support
        if (CSS.supports('backdrop-filter', 'blur(10px)')) {
            html.classList.add('backdrop-filter');
        }
    }

    async initializeServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('sw.js');
                console.log('Service Worker registered:', registration);
            } catch (error) {
                console.log('Service Worker registration failed:', error);
            }
        }
    }

    setupOfflineDetection() {
        const updateOnlineStatus = () => {
            const status = navigator.onLine ? 'online' : 'offline';
            document.body.classList.toggle('offline', !navigator.onLine);
            
            if (!navigator.onLine) {
                this.showNotification('You are currently offline', 'warning');
            }
        };

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        updateOnlineStatus();
    }

    monitorPerformance() {
        // Monitor Core Web Vitals
        if (typeof PerformanceObserver !== 'undefined') {
            const vitalsCallback = (metric) => {
                console.log('Web Vital:', metric.name, metric.value);
            };

            // Monitor Largest Contentful Paint (LCP)
            this.measureLCP(vitalsCallback);
            
            // Monitor First Input Delay (FID)
            this.measureFID(vitalsCallback);
            
            // Monitor Cumulative Layout Shift (CLS)
            this.measureCLS(vitalsCallback);
        }
    }

    measureLCP(callback) {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            callback({
                name: 'LCP',
                value: lastEntry.startTime,
                entries
            });
        }).observe({ entryTypes: ['largest-contentful-paint'] });
    }

    measureFID(callback) {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                callback({
                    name: 'FID',
                    value: entry.processingStart - entry.startTime,
                    entries
                });
            });
        }).observe({ entryTypes: ['first-input'] });
    }

    measureCLS(callback) {
        let clsValue = 0;
        let clsEntries = [];

        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    clsEntries.push(entry);
                }
            }
            callback({
                name: 'CLS',
                value: clsValue,
                entries: clsEntries
            });
        }).observe({ entryTypes: ['layout-shift'] });
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        // Update navbar appearance
        this.navigation.updateNavbarOnScroll(scrollY);
        
        // Update back to top button
        this.updateBackToTopButton(scrollY);
        
        // Parallax effects
        this.updateParallaxEffects(scrollY);
    }

    updateBackToTopButton(scrollY) {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;

        if (scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    updateParallaxEffects(scrollY) {
        // Subtle parallax effect for hero elements
        const heroParticles = document.querySelector('.hero-particles');
        if (heroParticles) {
            heroParticles.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
        
        const floatingFruits = document.querySelectorAll('.floating-fruit');
        floatingFruits.forEach((fruit, index) => {
            const speed = 0.05 + (index * 0.01);
            fruit.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }

    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 1023) {
            this.navigation.closeMobileMenu();
        }
        
        // Update cart sidebar width on mobile
        this.cart.updateSidebarWidth();
        
        // Recalculate parallax effects
        this.updateParallaxEffects(window.scrollY);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <p>${message}</p>
                <button class="notification-close" aria-label="Close notification">×</button>
            </div>
        `;

        const container = document.getElementById('notifications');
        if (container) {
            container.appendChild(notification);

            // Auto-remove after 5 seconds
            setTimeout(() => {
                this.removeNotification(notification);
            }, 5000);

            // Handle close button
            const closeBtn = notification.querySelector('.notification-close');
            closeBtn.addEventListener('click', () => {
                this.removeNotification(notification);
            });
        }
    }

    removeNotification(notification) {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }

    handleGlobalError(event) {
        console.error('Global error:', event.error);
        this.showNotification('An unexpected error occurred. Please refresh the page.', 'error');
    }

    handleUnhandledRejection(event) {
        console.error('Unhandled promise rejection:', event.reason);
        this.showNotification('Something went wrong. Please try again.', 'error');
    }

    handleCriticalError(error) {
        console.error('Critical error:', error);
        const fallbackHTML = `
            <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
                <h1>🍎 FreshFruit Paradise</h1>
                <p>We're experiencing technical difficulties. Please refresh the page.</p>
                <button onclick="window.location.reload()" style="padding: 10px 20px; background: #ff6b35; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Refresh Page
                </button>
            </div>
        `;
        document.body.innerHTML = fallbackHTML;
    }
}

// ================================
// NAVIGATION MANAGER
// ================================

class NavigationManager {
    constructor() {
        this.navbar = null;
        this.navToggle = null;
        this.navMenu = null;
        this.isMenuOpen = false;
    }

    init() {
        this.navbar = document.querySelector('.navbar');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');

        if (this.navToggle && this.navMenu) {
            this.setupMobileMenu();
        }

        this.setupActiveNavigation();
    }

    setupMobileMenu() {
        this.navToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu when clicking on nav links
        this.navMenu.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                this.closeMobileMenu();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (this.isMenuOpen && !this.navbar.contains(event.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.navMenu.classList.toggle('active');
        this.navToggle.setAttribute('aria-expanded', this.isMenuOpen);
        
        // Prevent scrolling when menu is open
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.isMenuOpen = false;
        this.navMenu.classList.remove('active');
        this.navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    setupActiveNavigation() {
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        const sections = document.querySelectorAll('section[id]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const activeLink = document.querySelector(`.nav-menu a[href="#${id}"]`);
                    
                    navLinks.forEach(link => link.removeAttribute('aria-current'));
                    if (activeLink) {
                        activeLink.setAttribute('aria-current', 'page');
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-20% 0px -20% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    updateNavbarOnScroll(scrollY) {
        if (!this.navbar) return;

        if (scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    updateActiveLink(clickedLink) {
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => link.removeAttribute('aria-current'));
        clickedLink.setAttribute('aria-current', 'page');
    }
}

// ================================
// CART MANAGER
// ================================

class CartManager {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('fruitCart')) || [];
        this.sidebar = null;
        this.cartCount = null;
        this.cartItems = null;
        this.cartTotal = null;
    }

    init() {
        this.sidebar = document.getElementById('cart-sidebar');
        this.cartCount = document.querySelector('.cart-count');
        this.cartItems = document.getElementById('cart-items');
        this.cartTotal = document.getElementById('cart-total');

        this.setupCartEvents();
        this.updateCartDisplay();
        this.renderCartItems();
    }

    setupCartEvents() {
        // Cart toggle button
        const cartBtn = document.querySelector('.cart-btn');
        if (cartBtn) {
            cartBtn.addEventListener('click', (event) => {
                event.preventDefault();
                this.toggleCart();
            });
        }

        // Cart close button
        const cartClose = document.querySelector('.cart-close');
        if (cartClose) {
            cartClose.addEventListener('click', () => {
                this.closeCart();
            });
        }

        // Add to cart buttons
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('add-to-cart-btn') || 
                event.target.classList.contains('quick-add-btn')) {
                const fruitName = event.target.dataset.fruit || 
                                event.target.closest('.fruit-card').querySelector('.fruit-name').textContent;
                const fruitPrice = event.target.closest('.fruit-card').querySelector('.fruit-price').textContent;
                
                this.addToCart({
                    name: fruitName,
                    price: fruitPrice,
                    id: this.generateId(fruitName)
                });
            }
        });

        // Checkout button
        const checkoutBtn = document.querySelector('.cart-checkout');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                this.proceedToCheckout();
            });
        }
    }

    addToCart(fruit) {
        const existingItem = this.items.find(item => item.id === fruit.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...fruit,
                quantity: 1,
                addedAt: new Date().toISOString()
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        this.renderCartItems();
        this.showAddToCartAnimation(fruit);
        
        // Show notification
        const notification = `${fruit.name} added to cart!`;
        window.fruitWebsite.showNotification(notification, 'success');
    }

    removeFromCart(fruitId) {
        this.items = this.items.filter(item => item.id !== fruitId);
        this.saveCart();
        this.updateCartDisplay();
        this.renderCartItems();
    }

    updateQuantity(fruitId, newQuantity) {
        const item = this.items.find(item => item.id === fruitId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(fruitId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.updateCartDisplay();
                this.renderCartItems();
            }
        }
    }

    calculateTotal() {
        return this.items.reduce((total, item) => {
            const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
            return total + (price * item.quantity);
        }, 0);
    }

    updateCartDisplay() {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.calculateTotal();

        if (this.cartCount) {
            this.cartCount.textContent = totalItems;
            if (totalItems > 0) {
                this.cartCount.style.animation = 'cartPulse 0.3s ease-out';
                setTimeout(() => {
                    this.cartCount.style.animation = '';
                }, 300);
            }
        }

        if (this.cartTotal) {
            this.cartTotal.textContent = totalPrice.toFixed(2);
        }

        // Enable/disable checkout button
        const checkoutBtn = document.querySelector('.cart-checkout');
        if (checkoutBtn) {
            checkoutBtn.disabled = totalItems === 0;
        }
    }

    renderCartItems() {
        if (!this.cartItems) return;

        if (this.items.length === 0) {
            this.cartItems.innerHTML = `
                <div class="empty-cart">
                    <div style="text-align: center; padding: 40px 20px; color: #666;">
                        <div style="font-size: 3rem; margin-bottom: 20px;">🛒</div>
                        <h3>Your cart is empty</h3>
                        <p>Add some delicious fruits to get started!</p>
                    </div>
                </div>
            `;
            return;
        }

        const itemsHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">${item.price}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn minus" data-id="${item.id}" aria-label="Decrease quantity">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
                    <button class="remove-btn" data-id="${item.id}" aria-label="Remove from cart">🗑️</button>
                </div>
            </div>
        `).join('');

        this.cartItems.innerHTML = itemsHTML;

        // Add event listeners for cart item controls
        this.cartItems.addEventListener('click', (event) => {
            const itemId = event.target.dataset.id;
            
            if (event.target.classList.contains('minus')) {
                const item = this.items.find(item => item.id === itemId);
                if (item) {
                    this.updateQuantity(itemId, item.quantity - 1);
                }
            } else if (event.target.classList.contains('plus')) {
                const item = this.items.find(item => item.id === itemId);
                if (item) {
                    this.updateQuantity(itemId, item.quantity + 1);
                }
            } else if (event.target.classList.contains('remove-btn')) {
                this.removeFromCart(itemId);
            }
        });
    }

    showAddToCartAnimation(fruit) {
        // Create flying fruit animation
        const fruitIcon = document.createElement('div');
        fruitIcon.textContent = this.getFruitEmoji(fruit.name);
        fruitIcon.style.cssText = `
            position: fixed;
            font-size: 2rem;
            z-index: 10000;
            pointer-events: none;
            animation: flyToCart 1s ease-out forwards;
        `;

        document.body.appendChild(fruitIcon);

        setTimeout(() => {
            fruitIcon.remove();
        }, 1000);
    }

    getFruitEmoji(fruitName) {
        const emojiMap = {
            'mango': '🥭',
            'pineapple': '🍍',
            'coconut': '🥥',
            'orange': '🍊',
            'lemon': '🍋',
            'strawberry': '🍓',
            'blueberry': '🫐',
            'apple': '🍎'
        };
        
        const key = Object.keys(emojiMap).find(key => 
            fruitName.toLowerCase().includes(key)
        );
        
        return emojiMap[key] || '🍎';
    }

    toggleCart() {
        if (this.sidebar) {
            this.sidebar.classList.toggle('active');
            this.sidebar.setAttribute('aria-hidden', 
                !this.sidebar.classList.contains('active'));
            
            // Prevent body scrolling when cart is open
            document.body.style.overflow = 
                this.sidebar.classList.contains('active') ? 'hidden' : '';
        }
    }

    closeCart() {
        if (this.sidebar) {
            this.sidebar.classList.remove('active');
            this.sidebar.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    updateSidebarWidth() {
        if (this.sidebar && window.innerWidth <= 479) {
            this.sidebar.style.width = '100vw';
        } else if (this.sidebar) {
            this.sidebar.style.width = '400px';
        }
    }

    proceedToCheckout() {
        if (this.items.length === 0) return;

        // Simulate checkout process
        const checkoutBtn = document.querySelector('.cart-checkout');
        const originalText = checkoutBtn.textContent;
        
        checkoutBtn.textContent = 'Processing...';
        checkoutBtn.disabled = true;

        setTimeout(() => {
            window.fruitWebsite.showNotification(
                'Checkout successful! Your fresh fruits are on the way! 🚚', 
                'success'
            );
            
            // Clear cart
            this.items = [];
            this.saveCart();
            this.updateCartDisplay();
            this.renderCartItems();
            this.closeCart();
            
            checkoutBtn.textContent = originalText;
            checkoutBtn.disabled = false;
        }, 2000);
    }

    generateId(name) {
        return name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    }

    saveCart() {
        localStorage.setItem('fruitCart', JSON.stringify(this.items));
    }
}

// ================================
// FORM MANAGER
// ================================

class FormManager {
    constructor() {
        this.forms = [];
    }

    init() {
        this.setupContactForm();
        this.setupNewsletterForm();
        this.setupRealTimeValidation();
    }

    setupContactForm() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleContactFormSubmission(contactForm);
        });

        this.forms.push(contactForm);
    }

    setupNewsletterForm() {
        const newsletterForms = document.querySelectorAll('.newsletter-form');
        newsletterForms.forEach(form => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                this.handleNewsletterSubmission(form);
            });
            this.forms.push(form);
        });
    }

    setupRealTimeValidation() {
        this.forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.required && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(field)} is required.`;
        }
        
        // Email validation
        else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
        
        // Name validation
        else if (fieldName === 'name' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long.';
        }
        
        // Message validation
        else if (fieldName === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long.';
        }

        this.displayFieldError(field, errorElement, isValid, errorMessage);
        return isValid;
    }

    displayFieldError(field, errorElement, isValid, errorMessage) {
        if (errorElement) {
            errorElement.textContent = isValid ? '' : errorMessage;
        }
        
        field.classList.toggle('error', !isValid);
        field.setAttribute('aria-invalid', !isValid);
    }

    clearFieldError(field) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
    }

    getFieldLabel(field) {
        const label = document.querySelector(`label[for="${field.id}"]`);
        return label ? label.textContent.replace('*', '').trim() : field.name;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    handleContactFormSubmission(form) {
        if (!this.validateForm(form)) {
            window.fruitWebsite.showNotification(
                'Please correct the errors in the form.', 
                'error'
            );
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            window.fruitWebsite.showNotification(
                'Thank you for your message! We\'ll get back to you soon.', 
                'success'
            );
            
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Clear any error states
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => this.clearFieldError(input));
        }, 2000);
    }

    handleNewsletterSubmission(form) {
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!this.isValidEmail(email)) {
            window.fruitWebsite.showNotification(
                'Please enter a valid email address.', 
                'error'
            );
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '✓';
        submitBtn.disabled = true;

        setTimeout(() => {
            window.fruitWebsite.showNotification(
                'Successfully subscribed to our newsletter!', 
                'success'
            );
            
            emailInput.value = '';
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }, 1000);
    }
}

// ================================
// ANIMATION MANAGER
// ================================

class AnimationManager {
    constructor() {
        this.observers = new Map();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupLoadingAnimations();
    }

    setupScrollAnimations() {
        // Animate elements on scroll with stagger effect
        const animatableElements = document.querySelectorAll(
            '.fruit-card, .feature-item, .nutrition-card, .contact-method'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                        entry.target.style.animationDelay = '0s';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatableElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            observer.observe(element);
        });

        this.observers.set('scroll', observer);
    }

    setupHoverEffects() {
        // Enhanced hover effects for interactive elements
        const interactiveElements = document.querySelectorAll(
            '.btn, .fruit-card, .feature-item, .nutrition-card'
        );

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (!element.classList.contains('hovering')) {
                    element.classList.add('hovering');
                    this.createRippleEffect(element);
                }
            });

            element.addEventListener('mouseleave', () => {
                element.classList.remove('hovering');
            });
        });
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            width: 100px;
            height: 100px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupLoadingAnimations() {
        // Stagger animation for fruit cards
        const fruitCards = document.querySelectorAll('.fruit-card');
        fruitCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Animate hero statistics
        this.animateCounters();
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current).toLocaleString();
            }, 16);
        };

        // Trigger animation when counters are visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }
}

// ================================
// PERFORMANCE MANAGER
// ================================

class PerformanceManager {
    constructor() {
        this.imageObserver = null;
        this.performanceData = {};
    }

    init() {
        this.setupImageLazyLoading();
        this.setupPrefetching();
        this.monitorMemoryUsage();
        this.optimizeAnimations();
    }

    setupImageLazyLoading() {
        // Lazy load background images and other resources
        const lazyElements = document.querySelectorAll('[data-src]');
        
        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const src = element.dataset.src;
                    
                    if (src) {
                        element.style.backgroundImage = `url(${src})`;
                        element.removeAttribute('data-src');
                    }
                    
                    this.imageObserver.unobserve(element);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        lazyElements.forEach(element => {
            this.imageObserver.observe(element);
        });
    }

    setupPrefetching() {
        // Prefetch critical resources
        const criticalResources = [
            'css/style.css',
            'js/script.js'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = resource;
            document.head.appendChild(link);
        });

        // Prefetch on hover for better UX
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    // Preload any images in the target section
                    this.preloadSectionImages(targetSection);
                }
            });
        });
    }

    preloadSectionImages(section) {
        const images = section.querySelectorAll('img[data-src]');
        images.forEach(img => {
            const src = img.dataset.src;
            if (src) {
                const preloadImg = new Image();
                preloadImg.src = src;
            }
        });
    }

    monitorMemoryUsage() {
        if ('memory' in performance) {
            setInterval(() => {
                const memInfo = performance.memory;
                this.performanceData.memory = {
                    used: memInfo.usedJSHeapSize,
                    total: memInfo.totalJSHeapSize,
                    limit: memInfo.jsHeapSizeLimit
                };

                // Log warning if memory usage is high
                const memoryUsage = memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit;
                if (memoryUsage > 0.8) {
                    console.warn('High memory usage detected:', memoryUsage * 100 + '%');
                }
            }, 30000); // Check every 30 seconds
        }
    }

    optimizeAnimations() {
        // Use will-change for better animation performance
        const animatedElements = document.querySelectorAll(
            '.floating-fruit, .rotating-fruits, .fruit-card, .btn'
        );

        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });

        // Remove will-change after animation completes
        document.addEventListener('animationend', (event) => {
            event.target.style.willChange = 'auto';
        });

        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            const animations = document.querySelectorAll('*');
            animations.forEach(element => {
                if (document.hidden) {
                    element.style.animationPlayState = 'paused';
                } else {
                    element.style.animationPlayState = 'running';
                }
            });
        });
    }

    measurePerformance() {
        // Measure page load performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                this.performanceData.pageLoad = {
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                    firstPaint: this.getFirstPaint(),
                    firstContentfulPaint: this.getFirstContentfulPaint()
                };

                console.log('Performance Data:', this.performanceData);
            }, 0);
        });
    }

    getFirstPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
        return firstPaint ? firstPaint.startTime : null;
    }

    getFirstContentfulPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        return fcp ? fcp.startTime : null;
    }
}

// ================================
// ACCESSIBILITY MANAGER
// ================================

class AccessibilityManager {
    constructor() {
        this.announcer = null;
    }

    init() {
        this.setupScreenReaderSupport();
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupColorContrastChecking();
        this.setupMotionPreferences();
    }

    setupScreenReaderSupport() {
        // Create live region announcer
        this.announcer = document.createElement('div');
        this.announcer.setAttribute('aria-live', 'polite');
        this.announcer.setAttribute('aria-atomic', 'true');
        this.announcer.className = 'visually-hidden';
        document.body.appendChild(this.announcer);

        // Enhance existing ARIA labels
        this.enhanceAriaLabels();
    }

    enhanceAriaLabels() {
        // Add descriptive labels to interactive elements
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            const text = button.textContent.trim();
            if (text) {
                button.setAttribute('aria-label', text);
            }
        });

        // Add role descriptions where helpful
        const fruitCards = document.querySelectorAll('.fruit-card');
        fruitCards.forEach(card => {
            card.setAttribute('role', 'article');
            const fruitName = card.querySelector('.fruit-name')?.textContent;
            if (fruitName) {
                card.setAttribute('aria-label', `${fruitName} product card`);
            }
        });
    }

    setupKeyboardNavigation() {
        // Ensure all interactive elements are keyboard accessible
        const interactiveElements = document.querySelectorAll(
            '.filter-btn, .add-to-cart-btn, .quick-add-btn, .fruit-card'
        );

        interactiveElements.forEach(element => {
            if (!element.tabIndex) {
                element.tabIndex = 0;
            }

            element.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    element.click();
                }
            });
        });

        // Trap focus in modals/sidebars
        this.setupFocusTrap();
    }

    setupFocusTrap() {
        const cartSidebar = document.getElementById('cart-sidebar');
        if (!cartSidebar) return;

        cartSidebar.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
                const focusableElements = cartSidebar.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }

    setupFocusManagement() {
        // Manage focus for better UX
        let lastFocusedElement = null;

        // Store focus before opening modals
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('cart-btn')) {
                lastFocusedElement = document.activeElement;
            }
        });

        // Restore focus when closing modals
        const cartClose = document.querySelector('.cart-close');
        if (cartClose) {
            cartClose.addEventListener('click', () => {
                if (lastFocusedElement) {
                    lastFocusedElement.focus();
                    lastFocusedElement = null;
                }
            });
        }

        // Focus management for dynamic content
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    const addedElements = Array.from(mutation.addedNodes);
                    addedElements.forEach(element => {
                        if (element.nodeType === Node.ELEMENT_NODE) {
                            this.enhanceAccessibility(element);
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    enhanceAccessibility(element) {
        // Add ARIA labels to new elements
        if (element.tagName === 'BUTTON' && !element.getAttribute('aria-label')) {
            const text = element.textContent.trim();
            if (text) {
                element.setAttribute('aria-label', text);
            }
        }

        // Ensure form elements have proper labels
        if (element.tagName === 'INPUT' && !element.getAttribute('aria-label')) {
            const label = document.querySelector(`label[for="${element.id}"]`);
            if (label) {
                element.setAttribute('aria-labelledby', label.id || element.id + '-label');
            }
        }
    }

    setupColorContrastChecking() {
        // Check color contrast ratios (development helper)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            this.checkColorContrast();
        }
    }

    checkColorContrast() {
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button');
        
        textElements.forEach(element => {
            const styles = getComputedStyle(element);
            const textColor = styles.color;
            const backgroundColor = styles.backgroundColor;
            
            // Simple contrast check (would need more sophisticated implementation for production)
            if (textColor && backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
                const contrast = this.calculateContrast(textColor, backgroundColor);
                if (contrast < 4.5) {
                    console.warn('Low contrast detected:', element, 'Contrast:', contrast);
                }
            }
        });
    }

    calculateContrast(color1, color2) {
        // Simplified contrast calculation - would need full implementation
        // This is just a placeholder for demonstration
        return 7; // Assume good contrast for now
    }

    setupMotionPreferences() {
        // Respect user's motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            document.documentElement.classList.add('reduce-motion');
            
            // Disable or reduce animations
            const style = document.createElement('style');
            style.textContent = `
                .reduce-motion *,
                .reduce-motion *::before,
                .reduce-motion *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    announceFilterChange(filter) {
        const message = filter === 'all' 
            ? 'Showing all fruits' 
            : `Showing ${filter} fruits`;
        this.announce(message);
    }

    announce(message) {
        if (this.announcer) {
            this.announcer.textContent = message;
            
            // Clear the message after announcement
            setTimeout(() => {
                this.announcer.textContent = '';
            }, 1000);
        }
    }
}

// ================================
// CSS ANIMATIONS (Added via JavaScript)
// ================================

const additionalCSS = `
@keyframes flyToCart {
    0% {
        transform: scale(1) translate(0, 0);
        opacity: 1;
    }
    50% {
        transform: scale(1.2) translate(50px, -50px);
        opacity: 0.8;
    }
    100% {
        transform: scale(0.8) translate(100px, -100px);
        opacity: 0;
    }
}

@keyframes ripple {
    to {
        transform: translate(-50%, -50%) scale(4);
        opacity: 0;
    }
}

@keyframes slideOutRight {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(100%);
    }
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #eee;
    animation: fadeInUp 0.3s ease-out;
}

.cart-item-info h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    font-weight: 600;
}

.cart-item-price {
    color: #ff6b35;
    font-weight: 600;
    margin: 0;
}

.cart-item-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.quantity-btn:hover {
    background: #ff6b35;
    color: white;
    border-color: #ff6b35;
}

.quantity {
    min-width: 30px;
    text-align: center;
    font-weight: 600;
}

.remove-btn {
    background: #f44336;
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.remove-btn:hover {
    background: #d32f2f;
    transform: scale(1.1);
}

.notification-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.notification-close {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s ease;
}

.notification-close:hover {
    opacity: 1;
}

.empty-cart {
    text-align: center;
    padding: 2rem 1rem;
}

.empty-cart h3 {
    margin: 0 0 0.5rem 0;
    color: #666;
}

.empty-cart p {
    margin: 0;
    color: #999;
}
`;

// Add additional CSS to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// ================================
// IMAGE HANDLING SYSTEM
// ================================

class ImageManager {
    constructor() {
        this.imageCache = new Map();
        this.loadingImages = new Set();
        this.fallbackEmojis = {
            'mango': '🥭',
            'pineapple': '🍍',
            'coconut': '🥥',
            'orange': '🍊',
            'lemon': '🍋',
            'strawberry': '🍓',
            'blueberry': '🫐',
            'apple': '🍎',
            'banana': '🍌',
            'grapes': '🍇',
            'kiwi': '🥝',
            'default': '🍎'
        };
        this.init();
    }

    init() {
        this.enhanceFruitCards();
        this.setupLazyLoading();
    }

    enhanceFruitCards() {
        const fruitCards = document.querySelectorAll('.fruit-card');
        fruitCards.forEach(card => this.enhanceCard(card));
    }

    enhanceCard(card) {
        const emojiElement = card.querySelector('.fruit-emoji');
        if (!emojiElement) return;

        // Keep emojis as they work better than missing images
        // Just add enhanced hover effects and accessibility
        emojiElement.setAttribute('role', 'img');
        emojiElement.setAttribute('aria-label', this.extractFruitType(card) + ' fruit icon');
    }

    extractFruitType(card) {
        // Try to get fruit type from data attribute
        const dataFruit = card.querySelector('[data-fruit]');
        if (dataFruit) {
            return dataFruit.dataset.fruit;
        }
        
        // Try to get from card category
        const category = card.dataset.category;
        if (category) {
            return category;
        }
        
        // Try to extract from emoji
        const emoji = card.querySelector('.fruit-emoji');
        if (emoji) {
            const emojiText = emoji.textContent.trim();
            for (const [fruit, emojiChar] of Object.entries(this.fallbackEmojis)) {
                if (emojiChar === emojiText) {
                    return fruit;
                }
            }
        }
        
        return 'default';
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('.fruit-image[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    async loadImage(img) {
        const src = img.src;
        if (this.loadingImages.has(src)) return;
        
        this.loadingImages.add(src);
        
        try {
            await this.preloadImage(src);
            img.classList.add('loaded');
        } catch (error) {
            console.warn(`Failed to load image: ${src}`, error);
            this.showFallback(img);
        } finally {
            this.loadingImages.delete(src);
        }
    }

    preloadImage(src) {
        return new Promise((resolve, reject) => {
            if (this.imageCache.has(src)) {
                resolve(this.imageCache.get(src));
                return;
            }

            const img = new Image();
            img.onload = () => {
                this.imageCache.set(src, img);
                resolve(img);
            };
            img.onerror = reject;
            img.src = src;
        });
    }

    showFallback(img) {
        const container = img.closest('.fruit-image-container');
        if (container) {
            const fallback = container.querySelector('.fruit-emoji-fallback');
            if (fallback) {
                img.style.display = 'none';
                fallback.style.display = 'block';
            }
        }
    }

    // Method to dynamically update fruit images
    updateFruitImage(fruitType, imageSrc) {
        const cards = document.querySelectorAll(`[data-fruit="${fruitType}"]`);
        cards.forEach(card => {
            const img = card.querySelector('.fruit-image');
            if (img) {
                img.src = imageSrc;
                img.style.display = 'block';
                const fallback = card.querySelector('.fruit-emoji-fallback');
                if (fallback) {
                    fallback.style.display = 'none';
                }
            }
        });
    }
}

// ================================
// THEME MANAGER
// ================================

class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themeToggle = null;
        this.themeIcon = null;
    }

    init() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggle?.querySelector('.theme-icon');
        
        // Load saved theme or use system preference
        this.loadThemePreference();
        
        // Setup theme toggle button
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Listen for system theme changes
        this.watchSystemTheme();
    }

    loadThemePreference() {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.currentTheme = prefersDark ? 'dark' : 'light';
        }
        
        this.applyTheme(this.currentTheme);
    }

    applyTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme toggle icon
        if (this.themeIcon) {
            this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
        
        // Update meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.content = theme === 'dark' ? '#121212' : '#ffffff';
        } else {
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            meta.content = theme === 'dark' ? '#121212' : '#ffffff';
            document.head.appendChild(meta);
        }
        
        // Save preference
        localStorage.setItem('theme', theme);
        
        // Announce theme change for screen readers
        this.announceThemeChange(theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        
        // Add animation to button
        if (this.themeToggle) {
            this.themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.themeToggle.style.transform = '';
            }, 300);
        }
    }

    watchSystemTheme() {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        darkModeQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    announceThemeChange(theme) {
        const message = `Theme changed to ${theme} mode`;
        
        // Use the accessibility manager's announcer if available
        if (window.fruitWebsite?.accessibility?.announce) {
            window.fruitWebsite.accessibility.announce(message);
        }
    }
}

// ================================
// INITIALIZE APPLICATION
// ================================

// Initialize the website when DOM is ready
window.fruitWebsite = new FruitWebsite();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FruitWebsite;
}