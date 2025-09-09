const scriptURL = 'https://script.google.com/macros/s/AKfycbxVZjn0-9qnSbT-1q6nwUHU_9vUoN6DtKQaq0_SX0FprS8VhmyN6WfIV5Fyelg_hsdo/exec';
const form = document.querySelector('.contact-form');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(form);

        fetch(scriptURL, { method: 'POST', body: formData })
        .then(res => res.json())
        .then(data => {
            if (data.result === 'success') {
                alert("Thank you! Your form is submitted successfully.");
                form.reset();
            } else {
                throw new Error(data.message || 'Form submission failed.');
            }
        })
        .catch(err => {
            console.error('Error!', err.message);
            alert('Error submitting form. Please try again.');
        });
    });
}
