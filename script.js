const fullNameInput = document.querySelector('input[placeholder="Full Name"]');
const emailInput = document.querySelector('input[placeholder="Email"]');
const phoneInput = document.querySelector('input[placeholder="Phone Number"]');
const workExperienceTextarea = document.querySelector('textarea[placeholder="Enter your work experience here..."]');
const educationTextarea = document.querySelector('textarea[placeholder="Enter your education details here..."]');
const resumePreview = document.querySelector('.preview-content');

// Listen for input events on form elements
fullNameInput.addEventListener('input', updatePreview);
emailInput.addEventListener('input', updatePreview);
phoneInput.addEventListener('input', updatePreview);
workExperienceTextarea.addEventListener('input', updatePreview);
educationTextarea.addEventListener('input', updatePreview);

// Function to update the resume preview
function updatePreview() {
    const fullName = fullNameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;
    const workExperience = workExperienceTextarea.value;
    const education = educationTextarea.value;

    const previewHTML = `
        <h3>${fullName}</h3>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <h4>Work Experience</h4>
        <p>${workExperience}</p>
        <h4>Education</h4>
        <p>${education}</p>
    `;

    resumePreview.innerHTML = previewHTML;
}

