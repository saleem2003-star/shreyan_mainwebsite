
document.addEventListener('DOMContentLoaded', () => {
    const enquiryForm = document.getElementById('enquiryForm');
    const successMsg = document.getElementById('formSuccessMsg');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form processing & display success state
            const submitBtn = enquiryForm.querySelector('.btn-submit-form');
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.querySelector('span').textContent = 'Sending...';

            setTimeout(() => {
                submitBtn.style.display = 'none';
                successMsg.style.display = 'block';
                enquiryForm.reset();
            }, 1000);
        });
    }
});


