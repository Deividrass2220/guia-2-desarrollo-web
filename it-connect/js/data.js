// 2.6.3 JavaScript Implementation - Data Module

// Mock user data
const users = [
    {
        id: 1,
        name: 'Ana García',
        title: 'Frontend Developer',
        specialty: 'frontend',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js'],
        experience: [
            {
                company: 'Tech Solutions',
                position: 'Frontend Developer',
                period: '2023 - Present'
            }
        ],
        icon: 'user-frontend'
    },
    {
        id: 2,
        name: 'Carlos Rodríguez',
        title: 'Backend Developer',
        specialty: 'backend',
        skills: ['Node.js', 'Python', 'Java', 'SQL', 'MongoDB'],
        experience: [
            {
                company: 'Data Systems',
                position: 'Backend Developer',
                period: '2022 - Present'
            }
        ],
        icon: 'user-backend'
    },
    // Add more mock users here
];

// 2.6.4 JavaScript Implementation - Data management functions
const dataModule = {
    // Get all users
    getAllUsers: () => users,

    // Get user by ID
    getUserById: (id) => users.find(user => user.id === id),

    // Filter users by specialty
    filterUsersBySpecialty: (specialty) => {
        return users.filter(user => user.specialty === specialty);
    },

    // Search users by name or skills
    searchUsers: (query) => {
        const searchTerm = query.toLowerCase();
        return users.filter(user => 
            user.name.toLowerCase().includes(searchTerm) ||
            user.skills.some(skill => skill.toLowerCase().includes(searchTerm))
        );
    }
};

// Export the module
window.dataModule = dataModule;