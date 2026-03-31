/**
 * Myriad Roofing - Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Update Copyright Year automatically
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            const isMenuOpen = mobileMenu.classList.contains('open');
            if (isMenuOpen) {
                mobileMenu.classList.remove('open');
                mobileToggle.innerHTML = '<i class="ph ph-list"></i>';
                document.body.style.overflow = 'auto'; // restore scroll
            } else {
                mobileMenu.classList.add('open');
                mobileToggle.innerHTML = '<i class="ph ph-x"></i>';
                document.body.style.overflow = 'hidden'; // prevent scroll
            }
        });

        // Close mobile menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                mobileToggle.innerHTML = '<i class="ph ph-list"></i>';
                document.body.style.overflow = 'auto'; // restore scroll
            });
        });
    }

    // 4. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target); // Stop observing once it appears
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // 5. Form Handling (Stubbed for now, as no backend is required)
    const quoteForm = document.getElementById('quote-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual submission

            // Basic validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;

            if (!name || !email || !phone || !service) {
                showMessage('error', 'Please fill out all required fields.');
                return;
            }

            // Simulate form submission process
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span> <i class="ph-bold ph-spinner ph-spin"></i>';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Show success message
                showMessage('success', 'Thank you! Your request has been received. We will contact you shortly.');
                
                // Reset form
                quoteForm.reset();
                
                // Restore button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    formMessage.className = 'form-message';
                }, 5000);
            }, 1500);
        });
    }

    function showMessage(type, text) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
    }
});
