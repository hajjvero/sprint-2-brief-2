import {resumeObjet, loadResume, saveResume} from "./helper/resume-helper.js";
import {errors, validate} from "./utils/validation.js";
import {
    inputAddress,
    inputEmail,
    inputFullName, inputGithub,
    inputLastName, inputLinkedin, inputNationality,
    inputPhone,
    inputPortfolio, inputStatus, updatePersonalInfoResume
} from "./helper/personal-info-helper.js";
import {
    inputJobTitle,
    inputProfileSummary,
    updateProfessionalInfoResume
} from "./helper/professional-info-helper.js";
import initHardSkills, {renderHardSkills} from "./components/skills/hard-skills.js";
import initSoftSkills, {renderSoftSkills} from "./components/skills/soft-skills.js";
import initLanguages, {renderLanguages} from "./components/language.js";
import initEducation, {renderEducation} from "./components/education.js";
import initExperience, {renderExperience} from "./components/experience.js";
import initHobbies, {renderHobbies} from "./components/hobbies.js";

// ===========================================
//                  Variables
// ===========================================

const steps = Array.from(document.getElementsByClassName("step"));
const sections = Array.from(document.getElementsByClassName("form-step"));
const cvForm = document.getElementById("cv-form");

// button next and previous
const buttonPrevious = document.getElementById("button-previous");
const buttonNext = document.getElementById("button-next");

// section current
let currentSection = 0;


// ===========================================
//            Events functions
// ===========================================

/*
* logic of button next
* */
buttonNext.addEventListener("click", (e) => {
    validate(currentSection);

    // is valid data
    if (errors.length === 0) {
        // update resume object data based section current
        switch (currentSection) {
            case 0:
                // Step 1: Update Personal Information
                updatePersonalInfoResume();
                break;
            case 1:
                // Step 2: Professional Details
                updateProfessionalInfoResume();
                break;
        }

        // logic of display previous button
        buttonPrevious.classList.remove("hidden");

        e.target.classList.remove("hidden");
        showSection(++currentSection);
        showStep(currentSection);

        // logic of end section
        if (currentSection === sections.length - 1) {
            e.target.classList.add("hidden");
        }

        // save information of section
        saveResume();

        // save current section
        saveCurrentSection();
    }
});

/*
* logic of button previous
* */
buttonPrevious.addEventListener("click", (e) => {
    e.target.classList.remove("hidden");
    showSection(--currentSection);
    showStep(currentSection);

    // display next button
    if (currentSection !== sections.length - 1) {
        buttonNext.classList.remove("hidden");
    }

    if (currentSection === 0) {
        e.target.classList.add("hidden");
    }

    // save current section
    saveCurrentSection();
})

/*
 * Event of submit form
 */
cvForm.addEventListener('submit', (e) => {
    e.preventDefault();
})

// ===========================================
//            Progress bar functions
// ===========================================

const showStep = (order) => {
    steps.map((step, index) => {
        step.classList.remove("completed", "current", "upcoming");

        if (order === index) {
            step.classList.add("current");
        } else if (order > index) {
            step.classList.add("completed");
        } else {
            step.classList.add("upcoming");
        }
    });
}

// ===========================================
//Sections functions
// ===========================================

const loadCurrentSection = () => {
    let c = localStorage.getItem("currentSection");
    if (c !== null) {
        currentSection = parseInt(c);
    }
}

const saveCurrentSection = () => {
    localStorage.setItem("currentSection", currentSection);
}

const showSection = (order) => {
    sections.map((section, index) => section.style.display = index === order ? "block" : "none");
}

// ===========================================
//            Resume functions
// ===========================================

const renderResume = () => {
    // Personal Information
    inputFullName.value = resumeObjet.personal.fullName;
    inputLastName.value = resumeObjet.personal.lastName;
    inputEmail.value = resumeObjet.personal.email;
    inputPhone.value = resumeObjet.personal.phone;
    inputAddress.value = resumeObjet.personal.address;
    inputNationality.value = resumeObjet.personal.nationality;
    inputStatus.value = resumeObjet.personal.status;
    inputPortfolio.value = resumeObjet.personal.portfolio;
    inputGithub.value = resumeObjet.personal.github;
    inputLinkedin.value = resumeObjet.personal.linkedin;

    // Professional Details
    inputJobTitle.value = resumeObjet.professional.jobTitle;
    inputProfileSummary.value = resumeObjet.professional.profileSummary;

    // Skills
    renderHardSkills();
    renderSoftSkills();

    // Languages
    renderLanguages();

    // Education
    renderEducation();

    // Experience
    renderExperience();
    
    // Hobbies
    renderHobbies();
};

// ===========================================
//             Initiale app
// ===========================================

function run() {
    loadCurrentSection();

    loadResume();

    renderResume();

    showSection(currentSection);

    showStep(currentSection);

    initHardSkills();
    initSoftSkills();

    initLanguages();

    initEducation();
    initExperience();
    
    initHobbies();

    // display next button and on start app
    if (currentSection === sections.length - 1) {
        buttonNext.classList.add("hidden");
    }

    if (currentSection !== 0) {
        buttonPrevious.classList.remove("hidden");
    }
}

run();