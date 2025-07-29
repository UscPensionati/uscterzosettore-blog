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
    // Google Analytics 4 Consent Update
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'functionality_storage': 'granted',
            'personalization_storage': 'granted'
        });

        // Track page view after consent
        gtag('event', 'page_view', {
            'event_category': 'engagement',
            'event_label': 'consent_granted',
            'page_title': document.title,
            'page_location': window.location.href
        });

        console.log('📊 Google Analytics 4 attivato con consenso utente');
    }

    // Altri servizi analytics possono essere aggiunti qui
    // Ad esempio: Plausible, Cloudflare Analytics, etc.

    // Track analytics activation
    if (typeof gtag !== 'undefined') {
        gtag('event', 'analytics_enabled', {
            'event_category': 'privacy',
            'event_label': 'user_consent',
            'value': 1
        });
    }
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

/**
 * ==========================================================================
 * Google Analytics 4 - Custom Events for Blog
 * ==========================================================================
 */

// Track Newsletter Signup (aggiorna quello esistente)
function trackNewsletterSignup(provider = 'buttondown') {
    if (typeof gtag !== 'undefined' && getCookie('cookie-consent') === 'all') {
        gtag('event', 'newsletter_signup', {
            'event_category': 'engagement',
            'event_label': provider,
            'value': 1,
            'custom_parameter_1': 'blog_footer'
        });
        console.log('📊 Newsletter signup tracked');
    }
}

// Track Article Reading Progress
function trackReadingProgress() {
    if (typeof gtag === 'undefined' || getCookie('cookie-consent') !== 'all') return;
    
    let tracked25 = false, tracked50 = false, tracked75 = false, tracked100 = false;
    
    window.addEventListener('scroll', function() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        
        if (scrollPercent >= 25 && !tracked25) {
            gtag('event', 'scroll', {
                'event_category': 'engagement',
                'event_label': '25_percent',
                'value': 25
            });
            tracked25 = true;
        }
        
        if (scrollPercent >= 50 && !tracked50) {
            gtag('event', 'scroll', {
                'event_category': 'engagement', 
                'event_label': '50_percent',
                'value': 50
            });
            tracked50 = true;
        }
        
        if (scrollPercent >= 75 && !tracked75) {
            gtag('event', 'scroll', {
                'event_category': 'engagement',
                'event_label': '75_percent', 
                'value': 75
            });
            tracked75 = true;
        }
        
        if (scrollPercent >= 90 && !tracked100) {
            gtag('event', 'scroll', {
                'event_category': 'engagement',
                'event_label': '100_percent',
                'value': 100
            });
            tracked100 = true;
        }
    });
}

// Track Outbound Links
function trackOutboundLinks() {
    if (typeof gtag === 'undefined' || getCookie('cookie-consent') !== 'all') return;
    
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        if (href && (href.startsWith('http') && !href.includes(window.location.hostname))) {
            gtag('event', 'click', {
                'event_category': 'outbound',
                'event_label': href,
                'transport_type': 'beacon'
            });
        }
    });
}

// Track File Downloads
function trackDownloads() {
    if (typeof gtag === 'undefined' || getCookie('cookie-consent') !== 'all') return;
    
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        const downloadExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip', '.rar'];
        
        if (href && downloadExtensions.some(ext => href.toLowerCase().includes(ext))) {
            gtag('event', 'file_download', {
                'event_category': 'engagement',
                'event_label': href,
                'file_extension': href.split('.').pop(),
                'file_name': href.split('/').pop()
            });
        }
    });
}

// Track Search (if you add search functionality)
function trackSiteSearch(query, results = 0) {
    if (typeof gtag !== 'undefined' && getCookie('cookie-consent') === 'all') {
        gtag('event', 'search', {
            'event_category': 'engagement',
            'search_term': query,
            'search_results': results
        });
    }
}

// Track Time on Page
function trackTimeOnPage() {
    if (typeof gtag === 'undefined' || getCookie('cookie-consent') !== 'all') return;
    
    const startTime = Date.now();
    let tracked15 = false, tracked30 = false, tracked60 = false;
    
    setInterval(function() {
        const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
        
        if (timeOnPage >= 15 && !tracked15) {
            gtag('event', 'timing_complete', {
                'event_category': 'engagement',
                'event_label': '15_seconds',
                'value': 15
            });
            tracked15 = true;
        }
        
        if (timeOnPage >= 30 && !tracked30) {
            gtag('event', 'timing_complete', {
                'event_category': 'engagement',
                'event_label': '30_seconds', 
                'value': 30
            });
            tracked30 = true;
        }
        
        if (timeOnPage >= 60 && !tracked60) {
            gtag('event', 'timing_complete', {
                'event_category': 'engagement',
                'event_label': '60_seconds',
                'value': 60
            });
            tracked60 = true;
        }
    }, 5000); // Check every 5 seconds
}

// Initialize all tracking on page load
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if consent is given
    if (getCookie('cookie-consent') === 'all') {
        trackReadingProgress();
        trackOutboundLinks();
        trackDownloads();
        trackTimeOnPage();
    }
});