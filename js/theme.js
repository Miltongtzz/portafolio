// Theme System with 4 Color Schemes
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const themeIcon = document.getElementById('theme-icon');
const themeIconMobile = document.getElementById('theme-icon-mobile');

// Color schemes array (4 palettes)
const colorSchemes = ['blue', 'green', 'purple', 'amber'];

// Initialize theme from localStorage or system preference
function initializeTheme() {
    // Theme mode (dark/light)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        updateThemeIcons(true);
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeIcons(false);
    }
    
    // Color scheme
    const savedColorScheme = localStorage.getItem('color-scheme') || 'blue';
    applyColorScheme(savedColorScheme);
    
    // Update color options UI
    updateColorOptions();
}

// Toggle dark/light mode
function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateThemeIcons(isDarkMode);
    updateColorOptions();
}

// Update theme icons
function updateThemeIcons(isDark) {
    if (isDark) {
        themeIcon?.classList.replace('fa-moon', 'fa-sun');
        themeIconMobile?.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon?.classList.replace('fa-sun', 'fa-moon');
        themeIconMobile?.classList.replace('fa-sun', 'fa-moon');
    }
}

// Apply color scheme
function applyColorScheme(scheme) {
    // Validate scheme
    if (!colorSchemes.includes(scheme)) {
        scheme = 'blue';
    }
    
    // Remove all color scheme classes
    colorSchemes.forEach(s => {
        document.body.classList.remove(`color-scheme-${s}`);
    });
    
    // Add the selected scheme
    document.body.classList.add(`color-scheme-${scheme}`);
    
    // Update active state in UI
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-scheme') === scheme) {
            option.classList.add('active');
        }
    });
    
    // Save to localStorage
    localStorage.setItem('color-scheme', scheme);
    
    // Dispatch custom event for other components
    document.dispatchEvent(new CustomEvent('colorschemechange', { 
        detail: { scheme } 
    }));
}

// Update color options based on current theme
function updateColorOptions() {
    const colorOptions = document.querySelectorAll('.color-option');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    colorOptions.forEach(option => {
        const scheme = option.getAttribute('data-scheme');
        if (option.classList.contains('active')) {
            option.style.borderColor = isDarkMode ? '#e2e8f0' : '#1e293b';
        }
        
        // Update option colors based on scheme
        switch(scheme) {
            case 'blue':
                option.style.backgroundColor = '#4f46e5';
                break;
            case 'green':
                option.style.backgroundColor = '#059669';
                break;
            case 'purple':
                option.style.backgroundColor = '#7c3aed';
                break;
            case 'amber':
                option.style.backgroundColor = '#d97706';
                break;
        }
    });
}

// Color Scheme Changer
function setupColorSchemeButtons() {
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const scheme = this.getAttribute('data-scheme');
            if (colorSchemes.includes(scheme)) {
                applyColorScheme(scheme);
            }
        });
        
        // Add tooltip
        const scheme = option.getAttribute('data-scheme');
        option.setAttribute('title', scheme.charAt(0).toUpperCase() + scheme.slice(1));
    });
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        initializeTheme();
    }
});

// Initialize everything
function initThemeSystem() {
    initializeTheme();
    setupColorSchemeButtons();
    
    // Event listeners for theme toggles
    themeToggle?.addEventListener('click', toggleTheme);
    themeToggleMobile?.addEventListener('click', toggleTheme);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initThemeSystem,
        toggleTheme,
        applyColorScheme,
        colorSchemes
    };
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSystem);
} else {
    initThemeSystem();
}
