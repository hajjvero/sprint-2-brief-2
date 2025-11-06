import {isEmail, isEmpty, isPhone, isRange, isURL, isURLWithPrefix} from "./utils/validation.js";

// ===========================================
//                  Variables
// ===========================================

// list of errors objects  {id: "input-id", message: "error message"}
let errors = [];
const steps = Array.from(document.getElementsByClassName("step"));
const cvForm = document.getElementById("cv-form");
const sections = Array.from(document.getElementsByClassName("form-step"));

// variables of inputs
const inputPhoto = document.getElementById('photo');
const inputFullName = document.getElementById('fullName');
const inputLastName = document.getElementById('lastName');
const inputEmail = document.getElementById('email');
const inputPhone = document.getElementById('phone');
const inputAddress = document.getElementById('address');
const inputNationality = document.getElementById('nationality');
const inputStatus = document.getElementById('status');
const inputPortfolio = document.getElementById('portfolio');
const inputGithub = document.getElementById('github');
const inputLinkedin = document.getElementById('linkedin');
const inputJobTitle = document.getElementById('jobTitle');
const inputProfileSummary = document.getElementById('profileSummary');

const buttonPrevious = document.getElementById("button-previous");
const buttonNext = document.getElementById("button-next");
let currentSection = 0;


// ===========================================
//            Events functions
// ===========================================

/*
* logic of button next
* */
buttonNext.addEventListener("click", (e) => {
    validate(currentSection);

    if (errors.length === 0) {
        // logic of display previous button
        buttonPrevious.classList.remove("hidden");

        e.target.classList.remove("hidden");
        showSection(++currentSection);
        showStep(currentSection);

        // logic of end section
        if (currentSection === sections.length - 1) {
            e.target.classList.add("hidden");
        }
    }
});

/*
* logic of button previous
* */
buttonPrevious.addEventListener("click", (e) => {
    // display next button
    if (currentSection !== sections.length - 1) {
        buttonNext.classList.remove("hidden");
    }

    e.target.classList.remove("hidden");
    showSection(--currentSection);
    showStep(currentSection);

    if (currentSection === 0) {
        e.target.classList.add("hidden");
    }
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
//            Sections functions
// ===========================================

const showSection = (order) => {
    sections.map((section, index) => section.style.display = index === order ? "block" : "none");
}

// ===========================================
//            Validation functions
// ===========================================

const clearErrorsMessages = () => {
    errors.map((item) => {
        item.input.nextElementSibling.remove();

        // Supprimer les classes d'état d'erreur
        item.input.classList.remove("bg-red-50", "border-red-500", "text-red-900", "focus:ring-red-500", "focus:border-red-500");

        // Ajouter toutes les classes d'état normal
        item.input.classList.add("bg-gray-50", "border-gray-300", "text-gray-900", "focus:ring-blue-500", "focus:border-blue-500");
    })

    errors = [];
}

const displayErrorsMessages = () => {
    errors.map((item) => {
        const messageElement = document.createElement("p");
        messageElement.setAttribute("class", "message-error");
        messageElement.textContent = item.message;

        // Supprimer toutes les classes d'état normal
        item.input.classList.remove("bg-gray-50", "border-gray-300", "text-gray-900", "focus:ring-blue-500", "focus:border-blue-500");

        // Ajouter les classes d'état d'erreur
        item.input.classList.add("bg-red-50", "border-red-500", "text-red-900", "focus:ring-red-500", "focus:border-red-500");

        item.input.parentElement.append(messageElement);
    })
}

const validate = (order) => {
    clearErrorsMessages();

    switch (order) {
        case 0:
            // Step 1: Personal Information
            if (isEmpty(inputFullName.value.trim())) {
                errors.push({
                    input: inputFullName, message: "Ce champ est requis."
                });
            }

            if (isEmpty(inputLastName.value.trim())) {
                errors.push({
                    input: inputLastName, message: "Ce champ est requis."
                });
            }

            if (!isEmail(inputEmail.value.trim())) {
                errors.push({
                    input: inputEmail,
                    message: "Veuillez entrer une adresse e-mail valide. Exemple : 'exemple@mail.com'"
                });
            }

            if (!isPhone(inputPhone.value.trim())) {
                errors.push({
                    input: inputPhone,
                    message: "Veuillez entrer un numéro de téléphone valide. Exemple : '+212 6 12 34 56 78'"
                });
            }

            if (!isEmpty(inputAddress.value.trim()) && !isRange(inputAddress.value.trim().length, 5, 200)) {
                errors.push({
                    input: inputAddress,
                    message: "Veuillez entrer une adresse valide de 5 à 200 caractères. Exemple : '123 Rue de Casablanca, Maroc'"
                });
            }

            if (!isEmpty(inputPortfolio.value.trim()) && !isURL(inputPortfolio.value.trim())) {
                errors.push({
                    input: inputPortfolio,
                    message: "Veuillez entrer une URL de portfolio valide. Exemple : 'https://monportfolio.com'"
                });
            }

            if (!isEmpty(inputGithub.value.trim()) && !isURLWithPrefix(inputGithub.value.trim(), "github\\.com\/")) {
                errors.push({
                    input: inputGithub,
                    message: "Veuillez entrer une URL GitHub valide. Exemple : 'https://github.com/monusername'"
                });
            }

            if (!isEmpty(inputLinkedin.value.trim()) && !isURLWithPrefix(inputLinkedin.value.trim(), "linkedin\\.com\/in\/")) {
                errors.push({
                    input: inputLinkedin,
                    message: "Veuillez entrer une URL LinkedIn valide. Exemple : 'https://linkedin.com/in/monprofil'"
                });
            }
            break;
        case 1:
            // Step 2: Professional Details
            if (isEmpty(inputJobTitle.value.trim())) {
                errors.push({
                    input: inputJobTitle, message: "Ce champ est requis."
                });
            }

            if (isEmpty(inputProfileSummary.value.trim()) || !isRange(inputProfileSummary.value.trim().length, 40, 1000)) {
                errors.push({
                    input: inputProfileSummary, message: "Ce champ est requis et doit contenir entre 40 et 1000 caractères. Exemple : 'Développeur web avec 5 ans d'expérience dans la création d'applications front-end et back-end."
                });
            }
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            break;
        case 8:
            break;
        case 9:
            break;
    }

    displayErrorsMessages();
}

// ===========================================
//             Initiale app
// ===========================================

showSection(currentSection);