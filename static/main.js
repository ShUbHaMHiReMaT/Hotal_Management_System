// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    const tabItems = document.querySelectorAll('.tabs li');
    const formSections = document.querySelectorAll('.form-section');
    const forms = document.querySelectorAll('form');
    const successModal = document.getElementById('successModal');
    const closeBtn = document.querySelector('.close');
    const successMessage = document.getElementById('successMessage');

    // Food type select element styling
    const foodTypeSelect = document.getElementById('foodType');
    if (foodTypeSelect) {
        foodTypeSelect.addEventListener('change', updateFoodTypeIndicator);
    }

    // Tab click event
    tabItems.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and sections
            tabItems.forEach(item => item.classList.remove('active'));
            formSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding section
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');

            // Save active tab to localStorage
            localStorage.setItem('activeTab', tabId);
        });
    });

    // Restore last active tab from localStorage
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
        tabItems.forEach(item => item.classList.remove('active'));
        formSections.forEach(section => section.classList.remove('active'));

        const activeTab = document.querySelector(`[data-tab="${savedTab}"]`);
        const activeSection = document.getElementById(savedTab);

        if (activeTab && activeSection) {
            activeTab.classList.add('active');
            activeSection.classList.add('active');
        }
    }

    // Form submission
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            // Form validation
            if (!validateForm(this)) {
                event.preventDefault(); // Stop submit if validation fails
            }
            // else normal submit happens (POST and redirect by Flask)
        });
    });

    // Close modal when clicking the X (modal currently not needed but keeping)
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeModal();
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === successModal) {
            closeModal();
        }
    });

    // Validation Function
    function validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('invalid-input');
                field.style.animation = 'shake 0.5s';
                
                setTimeout(() => {
                    field.style.animation = '';
                }, 500);
            } else {
                field.classList.remove('invalid-input');
            }
        });

        return isValid;
    }

    // Close Modal
    function closeModal() {
        successModal.style.opacity = '0';
        setTimeout(() => {
            successModal.classList.remove('show');
        }, 300);
    }

    // Food type change color
    function updateFoodTypeIndicator() {
        const selectedOption = foodTypeSelect.value;
        const selectIndicator = document.querySelector('.select-indicator');

        if (selectedOption === 'Veg') {
            selectIndicator.style.borderTopColor = 'var(--veg-color)';
        } else if (selectedOption === 'Non-Veg') {
            selectIndicator.style.borderTopColor = 'var(--non-veg-color)';
        } else {
            selectIndicator.style.borderTopColor = 'var(--text-light)';
        }
    }

    // Add keyframes for shake animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        
        .invalid-input {
            border-color: #f44336 !important;
        }
    `;
    document.head.appendChild(style);
});
