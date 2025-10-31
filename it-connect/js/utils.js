// 2.6.3 JavaScript - Funciones utilitarias

const utils = {
    // Gestión de sesión
    isLoggedIn: () => {
        return localStorage.getItem('isLoggedIn') === 'true';
    },

    setLoggedIn: (userId) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', userId);
        utils.updateNavigation();
    },

    logout: () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId');
        window.location.href = 'index.html';
    },

    updateNavigation: () => {
        const isLoggedIn = utils.isLoggedIn();
        const loginBtn = document.querySelector('a[href="login.html"]');
        const logoutBtn = document.getElementById('logoutBtn');
        const profileLink = document.querySelector('a[href="profile.html"]');
        const contactsLink = document.querySelector('a[href="contacts.html"]');

        if (loginBtn) loginBtn.style.display = isLoggedIn ? 'none' : 'block';
        if (logoutBtn) logoutBtn.style.display = isLoggedIn ? 'block' : 'none';
        if (profileLink) profileLink.style.display = isLoggedIn ? 'block' : 'none';
        if (contactsLink) contactsLink.style.display = isLoggedIn ? 'block' : 'none';
    },

    // Validación de formularios
    validateLoginForm: (email, password) => {
        const errors = {};
        
        if (!email) {
            errors.email = 'El correo electrónico es requerido';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'El correo electrónico no es válido';
        }

        if (!password) {
            errors.password = 'La contraseña es requerida';
        } else if (password.length < 6) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    },

    // Create DOM elements
    createElement: (tag, className, content) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.textContent = content;
        return element;
    },

    // Format date
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Debounce function for search
    debounce: (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
        };
    }
};

// Export the module
window.utils = utils;