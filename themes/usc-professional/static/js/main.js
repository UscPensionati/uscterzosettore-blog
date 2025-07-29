// USC Professional Theme JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-navigation');
    let isMenuOpen = false;

    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', function () {
            isMenuOpen = !isMenuOpen;

            if (isMenuOpen) {
                mobileNav.classList.add('active');
                mobileNav.style.display = 'block';
            } else {
                mobileNav.classList.remove('active');
                mobileNav.style.display = 'none';
            }

            // Animate hamburger
            const spans = mobileToggle.querySelectorAll('span');
            if (isMenuOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Mobile Dropdown Toggle
    const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
    const mobileDropdownMenu = document.querySelector('.mobile-dropdown-menu');

    if (mobileDropdownToggle && mobileDropdownMenu) {
        mobileDropdownToggle.addEventListener('click', function () {
            const isOpen = mobileDropdownMenu.style.display === 'block';
            mobileDropdownMenu.style.display = isOpen ? 'none' : 'block';
        });
    }

    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-nav-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (mobileNav) {
                mobileNav.style.display = 'none';
                mobileNav.classList.remove('active');
                isMenuOpen = false;

                // Reset hamburger
                if (mobileToggle) {
                    const spans = mobileToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });
});


/**
 * ==========================================================================
 * GDPR Cookie Consent Management
 * ==========================================================================
 */
document.addEventListener('DOMContentLoaded', function () {
    initCookieConsent();
});

function initCookieConsent() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptAllBtn = document.getElementById('cookie-accept-all');
    const acceptEssentialBtn = document.getElementById('cookie-accept-essential');
    const cookieSettingsBtn = document.getElementById('cookie-settings');

    if (!cookieBanner) return;

    // Check existing consent
    const cookieConsent = getCookie('cookie-consent');

    if (!cookieConsent) {
        // Show banner after 1.5 seconds
        setTimeout(() => {
            if (cookieBanner) {
                cookieBanner.style.display = 'block';
            }
        }, 1500);
    } else {
        // Load services based on previous consent
        if (cookieConsent === 'all') {
            loadAnalyticsServices();
        }
        // Show settings button
        if (cookieSettingsBtn) {
            cookieSettingsBtn.style.display = 'block';
        }
    }

    // Event Listeners
    if (acceptAllBtn) {
        acceptAllBtn.addEventListener('click', function () {
            setCookie('cookie-consent', 'all', 365);
            hideCookieBanner();
            loadAnalyticsServices();
            showCookieToast('✅ Cookie accettati. Analytics attivati.');
        });
    }

    if (acceptEssentialBtn) {
        acceptEssentialBtn.addEventListener('click', function () {
            setCookie('cookie-consent', 'essential', 365);
            hideCookieBanner();
            showCookieToast('✅ Solo cookie essenziali accettati.');
        });
    }

    if (cookieSettingsBtn) {
        cookieSettingsBtn.addEventListener('click', function () {
            if (cookieBanner) {
                cookieBanner.style.display = 'block';
            }
        });
    }
}

function hideCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieSettingsBtn = document.getElementById('cookie-settings');

    if (cookieBanner) {
        cookieBanner.style.animation = 'slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            cookieBanner.style.display = 'none';
            if (cookieSettingsBtn) {
                cookieSettingsBtn.style.display = 'block';
            }
        }, 400);
    }
}

function loadAnalyticsServices() {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'ad_storage': 'denied' // Manteniamo solo analytics, no ads
        });
        console.log('📊 Analytics caricati con consenso utente');
    }

    // Altri servizi analytics possono essere aggiunti qui
    // Ad esempio: Cloudflare Analytics, Plausible, etc.
}

function showCookieToast(message) {
    const toast = document.createElement('div');
    toast.className = 'cookie-toast';
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast && toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

// Cookie Utility Functions
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    const sameSite = 'Lax';
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=${sameSite}${secure}`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}