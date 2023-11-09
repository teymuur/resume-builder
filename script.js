const fullNameInput = document.querySelector('input[placeholder="Full Name"]');
const emailInput = document.querySelector('input[placeholder="Email"]');
const phoneInput = document.querySelector('input[placeholder="Phone Number"]');
const workExperienceTextarea = document.querySelector('textarea[placeholder="Enter your work experience here..."]');
const educationTextarea = document.querySelector('textarea[placeholder="Enter your education details here..."]');
const resumePreview = document.querySelector('.preview-content');
const CountryCode = document.querySelector('#countryCode'); // Corrected variable name

// Listen for input events on form elements
fullNameInput.addEventListener('input', updatePreview);
emailInput.addEventListener('input', updatePreview);
phoneInput.addEventListener('input', updatePreview);
CountryCode.addEventListener('input', updatePreview); // Corrected variable name

// Function to update the resume preview
const addWorkExperienceButton = document.getElementById('add-work-exp');
const removeWorkExperienceButton = document.getElementById('remove-work-exp');
const educationType = document.getElementById('educationType');

let workExperiences = [];
let educations = [];
let workExperienceHTML = '';
let educationHTML = '';

addWorkExperienceButton.addEventListener('click', () => {
    workExperiences.push(workExperienceTextarea.value);
    updatePreview();
    workExperienceTextarea.value = "";
});

removeWorkExperienceButton.addEventListener('click', () => {
    workExperiences.pop();
    updatePreview();
});

// Add and Remove Education
const addEducationButton = document.getElementById('add-education');
const removeEducationButton = document.getElementById('remove-education');

addEducationButton.addEventListener('click', () => {
    educations.push(educationType.value + ": " + educationTextarea.value);
    updatePreview();
    educationTextarea.value = "";
});

removeEducationButton.addEventListener('click', () => {
    educations.pop();
    updatePreview();
});

// Function to update the resume preview
function updatePreview() {
    const fullName = fullNameInput.value;
    const email = emailInput.value;
    const phone = CountryCode.value + phoneInput.value;

    workExperienceHTML = ''; // Reset the content
    educationHTML = ''; // Reset the content

    workExperiences.forEach((experience) => {
        workExperienceHTML += `${experience}<br>`;
    });

    educations.forEach((education) => {
        educationHTML += `${education}<br>`;
    });

    const previewHTML = `
        <h3>${fullName}</h3>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <h4>Work Experience</h4>
        ${workExperienceHTML}
        <h4>Education</h4>
        ${educationHTML}
    `;

    resumePreview.innerHTML = previewHTML;
}

// Assuming you have jsPDF imported and available

const pdf = new jsPDF();
const downloadButton = document.getElementById('download-pdf');

downloadButton.addEventListener('click', () => {
    const content = `
        Resume
        Full Name: ${fullNameInput.value}
        Email: ${emailInput.value}
        Phone: ${CountryCode.value + phoneInput.value}
        
        Work Experience:
        ${workExperienceHTML.split("<br>").join("\n        ")}
        
        Education:
        ${educationHTML.split("<br>").join("\n        ")}
    `;

    pdf.text(content, 10, 10);
    pdf.save('resume.pdf');
});
