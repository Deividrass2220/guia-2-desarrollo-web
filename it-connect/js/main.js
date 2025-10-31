// 2.6.4 JavaScript Implementation - Main Application Logic

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Check login status and update navigation
    utils.updateNavigation();

    // Redirect if trying to access protected pages while not logged in
    const currentPage = window.location.pathname;
    if ((currentPage.includes('profile.html') || currentPage.includes('contacts.html')) && !utils.isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    // Redirect if trying to access login while logged in
    if (currentPage.includes('login.html') && utils.isLoggedIn()) {
        window.location.href = 'profile.html';
        return;
    }

    // Logout button handling
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => utils.logout());
    }

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Profile page handling
    const profilePage = document.getElementById('userName');
    if (profilePage) {
        loadProfileData();
    }

    // Contacts page handling
    const contactsList = document.getElementById('contactsList');
    if (contactsList) {
        initializeContactsPage();
    }
});

// 2.6.4 Login form handler
const handleLogin = (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const validation = utils.validateLoginForm(email, password);
    if (validation.isValid) {
        // Simulate login - in a real app, this would verify credentials with a server
        utils.setLoggedIn('1'); // Using '1' as a dummy user ID
        window.location.href = 'profile.html';
    } else {
        // Show errors
        Object.keys(validation.errors).forEach(key => {
            const input = document.getElementById(key);
            input.classList.add('error');
            const errorMsg = utils.createElement('span', 'error-message', validation.errors[key]);
            input.parentNode.appendChild(errorMsg);
        });
    }
};

// 2.6.4 Profile page handler
const loadProfileData = () => {
    // Simulate loading user data
    const userData = dataModule.getUserById(1);
    
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userTitle').textContent = userData.title;
    document.getElementById('profileIcon').className = `user-icon ${userData.icon}`;

    // Load skills
    const skillsList = document.getElementById('skillsList');
    userData.skills.forEach(skill => {
        const skillElement = utils.createElement('span', 'skill-tag', skill);
        skillsList.appendChild(skillElement);
    });

    // Load experience
    const experienceList = document.getElementById('experienceList');
    userData.experience.forEach(exp => {
        const expElement = utils.createElement('div', 'experience-item');
        expElement.innerHTML = `
            <h5>${exp.position}</h5>
            <p>${exp.company}</p>
            <span>${exp.period}</span>
        `;
        experienceList.appendChild(expElement);
    });
};

// 2.6.4 Contacts page handler
const initializeContactsPage = () => {
    const searchInput = document.getElementById('searchContacts');
    const specialtyFilter = document.getElementById('filterSpecialty');
    const contactsList = document.getElementById('contactsList');

    // Initialize with all contacts
    renderContacts(dataModule.getAllUsers());

    // Add search functionality with debounce
    searchInput.addEventListener('input', utils.debounce((e) => {
        const query = e.target.value;
        const specialty = specialtyFilter.value;
        filterAndRenderContacts(query, specialty);
    }, 300));

    // Add filter functionality
    specialtyFilter.addEventListener('change', (e) => {
        const specialty = e.target.value;
        const query = searchInput.value;
        filterAndRenderContacts(query, specialty);
    });
};

// 2.6.4 Filter and render contacts
const filterAndRenderContacts = (query, specialty) => {
    let filteredUsers = dataModule.getAllUsers();

    // Apply search filter
    if (query) {
        filteredUsers = dataModule.searchUsers(query);
    }

    // Apply specialty filter
    if (specialty) {
        filteredUsers = filteredUsers.filter(user => user.specialty === specialty);
    }

    renderContacts(filteredUsers);
};

// 2.6.4 Render contacts
const renderContacts = (users) => {
    const contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = '';

    users.forEach(user => {
        const contactCard = utils.createElement('article', 'contact-card');
        contactCard.innerHTML = `
            <i class="user-icon ${user.icon}"></i>
            <h3>${user.name}</h3>
            <p>${user.title}</p>
            <div class="skills-tags">
                ${user.skills.slice(0, 3).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;
        contactsList.appendChild(contactCard);
    });
};