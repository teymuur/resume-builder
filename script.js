const fullNameInput = document.querySelector('input[placeholder="Full Name"]');
const emailInput = document.querySelector('input[placeholder="Email"]');
const phoneInput = document.querySelector('input[placeholder="Phone Number"]');
const workExperienceTextarea = document.querySelector('textarea.workplace');
const workExperienceStart = document.getElementById('startDate')
const workExperienceEnd = document.getElementById('endDate')
const gender = document.getElementById('gender');
const educationTextarea = document.querySelector('textarea.education');
const eduStart = document.getElementById('eduStartDate')
const eduEnd = document.getElementById('eduEndDate')
const resumePreview = document.querySelector('.preview-content');
const CountryCode = document.querySelector('#countryCode'); // Corrected variable name
const birthday = document.getElementById('birthday')
// Listen for input events on form elements
fullNameInput.addEventListener('input', updatePreview);
emailInput.addEventListener('input', updatePreview);
phoneInput.addEventListener('input', updatePreview);
CountryCode.addEventListener('input', updatePreview); // Corrected variable name
gender.addEventListener('input',updatePreview)
birthday.addEventListener('input',updatePreview)
// Function to update the resume preview
const addWorkExperienceButton = document.getElementById('add-work-exp');
const removeWorkExperienceButton = document.getElementById('remove-work-exp');
const educationType = document.getElementById('educationType');

let workExperiences = [];
let educations = [];
let workExperienceHTML = '';
let educationHTML = '';

addWorkExperienceButton.addEventListener('click', () => {
    if(workExperienceStart.value==""){
        alert("Please enter a start day for your work")
    }else if (workExperienceEnd.value==""){
        workExperiences.push(workExperienceTextarea.value+" started "+workExperienceStart.value+ " Still hustling");
        updatePreview();
    }else{
    workExperiences.push(workExperienceTextarea.value+" started "+workExperienceStart.value+ " until "+workExperienceEnd.value);
    updatePreview();
    }
});

removeWorkExperienceButton.addEventListener('click', () => {
    workExperiences.pop();
    updatePreview();
});

// Add and Remove Education
const addEducationButton = document.getElementById('add-education');
const removeEducationButton = document.getElementById('remove-education');

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
   dd = '0' + dd;
}

if (mm < 10) {
   mm = '0' + mm;
} 
today = yyyy + '-' + mm + '-' + dd;
    birthday.setAttribute("max",today);
    birthday.setAttribute('min',`1900-01-01`)
    eduStart.setAttribute('max',today)
    workExperienceStart.setAttribute('max',today)
addEducationButton.addEventListener('click', () => {
    if(eduStart.value==""){
        alert("Please enter a start day for your ")
    }
    else if(eduEnd.value == ""){
        educations.push(educationType.value + ": " + educationTextarea.value+" started "+eduStart.value+ " (Not graduated yet)");
        updatePreview();
    }else{
    educations.push(educationType.value + ": " + educationTextarea.value+" started "+eduStart.value+ " Graduated "+eduEnd.value);
    updatePreview();
    }
  

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
    const gender_ = gender.value
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
        <p>Gender: ${gender_}</p>
        <p>Birthday: ${birthday.value}</p>
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
        Gender: ${gender.value}
        Birtday: ${birthday.value}
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

// Prevent XSS atacks
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the form elements
    var formElements = [
      fullNameInput,
      emailInput,
      phoneInput,
      workExperienceTextarea,
      educationTextarea,
      
    ];

    // Add event listeners to form elements
    formElements.forEach(function (e) {
      e.addEventListener('input', restrictCharacters);
    });

    // Function to restrict characters
    function restrictCharacters(event) {
      // Get the input value
      var inputValue = event.target.value;

      // Check if the forbidden characters are present
      if (inputValue.includes('<') || inputValue.includes('>')) {
        // If forbidden characters are found, prevent the default behavior
        event.preventDefault();
        event.target.value = ""
        // Optionally, you can alert the user or handle the error in another way
        alert('Invalid input! Please do not use < or > characters.');
      }
    }
  });

  