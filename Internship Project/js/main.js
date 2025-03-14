// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Auth Tabs Functionality
const authTabs = document.querySelectorAll('.auth-tab');

if (authTabs.length > 0) {
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Get the parent auth-tabs element
            const tabsContainer = tab.parentElement;
            // Get all tabs in this container
            const tabs = tabsContainer.querySelectorAll('.auth-tab');
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Get the form ID from data-tab attribute
            const formId = tab.getAttribute('data-tab');
            // Get the auth-content container (parent's next sibling)
            const authContent = tabsContainer.nextElementSibling;
            // Get all forms in this auth-content
            const forms = authContent.querySelectorAll('.auth-form');
            // Hide all forms
            forms.forEach(form => form.classList.remove('active'));
            // Show the selected form
            document.getElementById(formId).classList.add('active');
        });
    });
}

// Modal Functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// Declare auth and showNotification (assuming they are globally available or imported elsewhere)
// You might need to adjust the declaration/import based on your project setup
// Assuming firebase is available globally.  If not, you'll need to import it.
// For example: import * as firebase from 'firebase/app';
// Or, if using CDN:
// const firebase = window.firebase;
const firebase = window.firebase;
const auth = firebase.auth();
function showNotification(message, type) {
    // Implement your notification logic here.  This is a placeholder.
    alert(message); // Example: Use an alert for demonstration
}

// Logout functionality
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        auth.signOut()
            .then(() => {
                window.location.href = '../index.html';
            })
            .catch(error => {
                console.error("Logout error:", error);
                showNotification('Logout failed: ' + error.message, 'error');
            });
    });
}