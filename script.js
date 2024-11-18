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
const headerColor = document.getElementById('headerColor');
const textColor = document.getElementById('textColor');
const fontFamily = document.getElementById('fontFamily');
const headerSize = document.getElementById('headerSize');
const textSize = document.getElementById('textSize');
const sectionSpacing = document.getElementById('sectionSpacing');
const headerColorPreview = document.getElementById('headerColorPreview');
const textColorPreview = document.getElementById('textColorPreview');
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
[headerColor, textColor, fontFamily, headerSize, textSize, sectionSpacing].forEach(control => {
    control.addEventListener('input', updatePreview);
    control.addEventListener('change', updatePreview);
});
headerColor.addEventListener('input', () => {
    headerColorPreview.style.backgroundColor = headerColor.value;
});

textColor.addEventListener('input', () => {
    textColorPreview.style.backgroundColor = textColor.value;
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

function deleteWorkExperience(index) {
    workExperiences.splice(index, 1);
    updatePreview();
}

function deleteEducation(index) {
    educations.splice(index, 1);
    updatePreview();
}

function updatePreview() {
    const fullName = fullNameInput.value;
    const email = emailInput.value;
    const phone = CountryCode.value + phoneInput.value;
    const gender_ = gender.value;
    workExperienceHTML = '';
    educationHTML = '';

    // Apply custom styles to the preview content
    resumePreview.style.fontFamily = fontFamily.value;
    resumePreview.style.color = textColor.value;
    resumePreview.style.fontSize = `${textSize.value}px`;

    workExperiences.forEach((experience, index) => {
        workExperienceHTML += `
            <div class="experience-item" style="margin-bottom: ${sectionSpacing.value}px">
                ${experience}
                <button class="delete-btn" onclick="deleteWorkExperience(${index})">×</button>
            </div>`;
    });

    educations.forEach((education, index) => {
        educationHTML += `
            <div class="education-item" style="margin-bottom: ${sectionSpacing.value}px">
                ${education}
                <button class="delete-btn" onclick="deleteEducation(${index})">×</button>
            </div>`;
    });

    const previewHTML = `
        <h3 style="color: ${headerColor.value}; font-size: ${headerSize.value}px">${fullName}</h3>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Gender: ${gender_}</p>
        <p>Birthday: ${birthday.value}</p>
        <h4 style="color: ${headerColor.value}; font-size: ${Math.max(headerSize.value - 4, textSize.value)}px">Work Experience</h4>
        ${workExperienceHTML}
        <h4 style="color: ${headerColor.value}; font-size: ${Math.max(headerSize.value - 4, textSize.value)}px">Education</h4>
        ${educationHTML}
    `;

    resumePreview.innerHTML = previewHTML;
}

let downloadButton = document.getElementById('download-pdf');
// Enhanced PDF generation
downloadButton.addEventListener('click', () => {
    const pdf = new jsPDF();
    
    // Set font styles based on customization
    const fontMap = {
        'Arial, sans-serif': 'helvetica',
        "'Times New Roman', serif": 'times',
        "'Courier New', monospace": 'courier',
        'Georgia, serif': 'times',
        "'Trebuchet MS', sans-serif": 'helvetica'
    };
    
    const pdfFont = fontMap[fontFamily.value] || 'helvetica';
    pdf.setFont(pdfFont);
    
    // Convert hex color to RGB for PDF
    const headerColorRGB = hexToRGB(headerColor.value);
    const textColorRGB = hexToRGB(textColor.value);
    
    // Header
    pdf.setFontSize(headerSize.value);
    pdf.setTextColor(headerColorRGB.r, headerColorRGB.g, headerColorRGB.b);
    pdf.text(fullNameInput.value, 105, 20, { align: "center" });
    
    // Contact Information
    pdf.setFontSize(textSize.value);
    pdf.setTextColor(textColorRGB.r, textColorRGB.g, textColorRGB.b);
    let yPos = 40;
    const contactInfo = [
        `Email: ${emailInput.value}`,
        `Phone: ${CountryCode.value + phoneInput.value}`,
        `Gender: ${gender.value}`,
        `Birthday: ${birthday.value}`
    ];
    
    contactInfo.forEach(info => {
        pdf.text(info, 20, yPos);
        yPos += 10;
    });
    
    // Work Experience
    yPos += 10;
    pdf.setFontSize(headerSize.value);
    pdf.setTextColor(headerColorRGB.r, headerColorRGB.g, headerColorRGB.b);
    pdf.text("Work Experience", 20, yPos);
    
    pdf.setFontSize(textSize.value);
    pdf.setTextColor(textColorRGB.r, textColorRGB.g, textColorRGB.b);
    yPos += 10;
    
    workExperiences.forEach(experience => {
        const lines = pdf.splitTextToSize(experience, 170);
        pdf.text(lines, 20, yPos);
        yPos += (10 * lines.length) + 5; // Added extra spacing between entries
    });
    
    // Education
    yPos += 10;
    pdf.setFontSize(headerSize.value);
    pdf.setTextColor(headerColorRGB.r, headerColorRGB.g, headerColorRGB.b);
    pdf.text("Education", 20, yPos);
    
    pdf.setFontSize(textSize.value);
    pdf.setTextColor(textColorRGB.r, textColorRGB.g, textColorRGB.b);
    yPos += 10;
    
    educations.forEach(education => {
        const lines = pdf.splitTextToSize(education, 170);
        // Check if we need a new page
        if (yPos + (10 * lines.length) > 280) {
            pdf.addPage();
            yPos = 20;
        }
        pdf.text(lines, 20, yPos);
        yPos += (10 * lines.length) + 5; // Added extra spacing between entries
    });
    
    pdf.save('professional-resume.pdf');
});

// Helper function to convert hex color to RGB
function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}
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

  