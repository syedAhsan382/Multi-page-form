document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 4;
    
    const form = document.getElementById('multiStepForm');
    const steps = document.querySelectorAll('.form-step');
    const indicators = document.querySelectorAll('.step-indicator');
    const progressLine = document.getElementById('progress-line');
    
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');

    // Navigation Logic
    nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            currentStep++;
            updateUI();
        }
    });

    prevBtn.addEventListener('click', () => {
        currentStep--;
        updateUI();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submitted successfully! (Check console for data)');
        console.log('Form Data:', {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            username: document.getElementById('username').value
        });
        // Reset form or redirect here
    });

    function updateUI() {
        // Update Steps
        steps.forEach(step => step.classList.remove('active'));
        document.getElementById(`step-${currentStep}`).classList.add('active');

        // Update Indicators & Progress Line
        indicators.forEach((ind, index) => {
            ind.classList.remove('active', 'completed');
            if (index + 1 < currentStep) {
                ind.classList.add('completed');
                ind.innerHTML = '✓';
            } else if (index + 1 === currentStep) {
                ind.classList.add('active');
                ind.innerHTML = index + 1;
            } else {
                ind.innerHTML = index + 1;
            }
        });
        
        // Update progress line width
        const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressLine.style.width = `${progressPercent}%`;

        // Toggle Buttons
        prevBtn.classList.toggle('hidden', currentStep === 1);
        nextBtn.classList.toggle('hidden', currentStep === totalSteps);
        submitBtn.classList.toggle('hidden', currentStep !== totalSteps);

        // Generate Summary if on last step
        if (currentStep === totalSteps) {
            generateSummary();
        }
    }

    function generateSummary() {
        const data = [
            { label: 'First Name', value: document.getElementById('firstName').value },
            { label: 'Last Name', value: document.getElementById('lastName').value },
            { label: 'Email', value: document.getElementById('email').value },
            { label: 'Phone', value: document.getElementById('phone').value },
            { label: 'Username', value: document.getElementById('username').value },
            { label: 'Password', value: '••••••••' } // Hide password for security
        ];

        const summaryHTML = data.map(item => `
            <div class="summary-row">
                <span class="summary-label">${item.label}:</span>
                <span class="summary-value">${item.value}</span>
            </div>
        `).join('');

        document.getElementById('summary-content').innerHTML = summaryHTML;
    }

    // Validation Logic
    function validateStep(step) {
        let isValid = true;
        
        if (step === 1) {
            isValid = validateField('firstName', val => val.trim() !== '') && 
                        validateField('lastName', val => val.trim() !== '');
        } 
        else if (step === 2) {
            isValid = validateField('email', val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) && 
                        validateField('phone', val => /^\+?[0-9]{7,15}$/.test(val.replace(/\s/g, '')));
        } 
        else if (step === 3) {
            isValid = validateField('username', val => val.length >= 4) && 
                        validateField('password', val => val.length >= 6);
        }
        
        return isValid;
    }

    function validateField(id, validationFn) {
        const input = document.getElementById(id);
        const errorMsg = input.nextElementSibling;
        
        if (!validationFn(input.value)) {
            input.classList.add('invalid');
            errorMsg.style.display = 'block';
            return false;
        } else {
            input.classList.remove('invalid');
            errorMsg.style.display = 'none';
            return true;
        }
    }
});