const fullNameInput = document.querySelector('input[placeholder="Full Name"]');
const emailInput = document.querySelector('input[placeholder="Email"]');
const phoneInput = document.querySelector('input[placeholder="Phone Number"]');
const workExperienceTextarea = document.querySelector('textarea[placeholder="Enter your work experience here..."]');
const educationTextarea = document.querySelector('textarea[placeholder="Enter your education details here..."]');
const resumePreview = document.querySelector('.preview-content');
const CounrtyCode = document.querySelector('#countryCode')
// Listen for input events on form elements
fullNameInput.addEventListener('input', updatePreview);
emailInput.addEventListener('input', updatePreview);
phoneInput.addEventListener('input', updatePreview);
workExperienceTextarea.addEventListener('input', updatePreview);
educationTextarea.addEventListener('input', updatePreview);
CounrtyCode.addEventListener('input',updatePreview);
// Function to update the resume preview
const addWorkExperienceButton = document.getElementById('add-work-exp');
const removeWorkExperienceButton = document.getElementById('remove-work-exp');
const educationType = document.getElementById('educationType')

let workExperiences = [];

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

let educations = [];

addEducationButton.addEventListener('click', () => {
    educations.push(educationType.value+": "+educationTextarea.value);
    updatePreview();
    educationTextarea.value ="";
});

removeEducationButton.addEventListener('click', () => {
    educations.pop();
    updatePreview();
});

// Function to update the resume preview
function updatePreview() {
    const fullName = fullNameInput.value;
    const email = emailInput.value;
    const phone = CounrtyCode.value + phoneInput.value;


    let workExperienceHTML = '<h4>Work Experience</h4>';
    let educationHTML = '<h4>Education</h4>';

    workExperiences.forEach((experience) => {
        workExperienceHTML += `<p>${experience}</p>`;
    });

    educations.forEach((education) => {
        educationHTML += `<p>${education}</p>`;
    });

    // Displaying education type along with the details in the preview


    const previewHTML = `
        <h3>${fullName}</h3>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        ${workExperienceHTML}
        ${educationHTML}
    `;

    resumePreview.innerHTML = previewHTML;
}

const pdf = new jsPDF();
const downloadButton = document.getElementById('download-pdf');


downloadButton.addEventListener('click', () => {

// Define the content for the PDF

const content = `
    Resume
    Full Name: ${fullNameInput.value}
    Email: ${emailInput.value}
    Phone: ${CounrtyCode.value+phoneInput.value}
    
    Work Experience:
    ${window.workExpHTML.split("<br>").join("\n    ")}
    
    Education:
    ${window.educationHTML.split("<br>").join("\n    ")}
`;

// Add the content to the PDF
pdf.text(content, 10, 10);

// Save the PDF with a name (e.g., "resume.pdf")
pdf.save('resume.pdf');
});