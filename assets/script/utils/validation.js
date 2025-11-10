import {
    inputAddress,
    inputEmail,
    inputFullName, inputGithub,
    inputLastName, inputLinkedin,
    inputPhone, inputPhoto,
    inputPortfolio
} from "../helper/personal-info-helper.js";
import {
    inputJobTitle,
    inputProfileSummary
} from "../helper/professional-info-helper.js";

// list of errors objects  {element: htmlElement, message: "error message"}
export let errors = [];

// ===========================================
//         Validate function
// ===========================================

export function validate(order) {
    // clear errors
    errors.map((item) => removeError(item.element));
    errors= [];

    // remplire les erreurs
    switch (order) {
        case 0:
            // Step 1: Personal Information
            if (isEmpty(inputFullName.value.trim())) {
                errors.push({
                    element: inputFullName,
                    message: "Ce champ est requis."
                });
            }

            if (isEmpty(inputLastName.value.trim())) {
                errors.push({
                    element: inputLastName,
                    message: "Ce champ est requis."
                });
            }

            if (!isEmail(inputEmail.value.trim())) {
                errors.push({
                    element: inputEmail,
                    message: "Veuillez entrer une adresse e-mail valide. Exemple : 'exemple@mail.com'"
                });
            }

            if (!isPhone(inputPhone.value.trim())) {
                errors.push({
                    element: inputPhone,
                    message: "Veuillez entrer un numéro de téléphone valide. Exemple : '+212 6 12 34 56 78'"
                });
            }

            if (!isEmpty(inputAddress.value.trim()) && !isRange(inputAddress.value.trim().length, 5, 200)) {
                errors.push({
                    element: inputAddress,
                    message: "Veuillez entrer une adresse valide de 5 à 200 caractères. Exemple : '123 Rue de Casablanca, Maroc'"
                });
            }

            if (!isEmpty(inputPortfolio.value.trim()) && !isURL(inputPortfolio.value.trim())) {
                errors.push({
                    element: inputPortfolio,
                    message: "Veuillez entrer une URL de portfolio valide. Exemple : 'https://monportfolio.com'"
                });
            }

            if (!isEmpty(inputGithub.value.trim()) && !isURLWithPrefix(inputGithub.value.trim(), "github\\.com\/")) {
                errors.push({
                    element: inputGithub,
                    message: "Veuillez entrer une URL GitHub valide. Exemple : 'https://github.com/monusername'"
                });
            }

            if (!isEmpty(inputLinkedin.value.trim()) && !isURLWithPrefix(inputLinkedin.value.trim(), "linkedin\\.com\/in\/")) {
                errors.push({
                    element: inputLinkedin,
                    message: "Veuillez entrer une URL LinkedIn valide. Exemple : 'https://linkedin.com/in/monprofil'"
                });
            }

            // validation of photo
            const file = inputPhoto.files[0];
            if (file && !isInArray(file.type, inputPhoto.accept.split(',').map((type) => `image/${type.slice(1)}`))) {
                errors.push({
                    element: inputPhoto,
                    message: "Type de fichier invalide. Formats autorisés : SVG, JPG, JPEG, PNG."
                });
            }

            const MAX_SIZE_PHOTO = 5 * 1024 * 1024 // convert MB to BYTES
            if (file && file.size > MAX_SIZE_PHOTO) {
                errors.push({
                    element: inputPhoto,
                    message: "Le fichier est trop volumineux ! La taille maximale autorisée est de 5MB."
                });
            }
            break;
        case 1:
            // Step 2: Professional Details
            if (isEmpty(inputJobTitle.value.trim())) {
                errors.push({
                    element: inputJobTitle,
                    message: "Ce champ est requis."
                });
            }

            if (isEmpty(inputProfileSummary.value.trim()) || !isRange(inputProfileSummary.value.trim().length, 40, 1000)) {
                errors.push({
                    element: inputProfileSummary,
                    message: "Ce champ est requis et doit contenir entre 40 et 1000 caractères. Exemple : 'Développeur web avec 5 ans d'expérience dans la création d'applications front-end et back-end."
                });
            }
            break;
        case 2:
            // Step 3: Skills
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

    // Afficher les erreurs
    errors.map((item) => displayError(item.element, item.message))
}

// ===========================================
//         Error functions
// ===========================================

export function displayError(target ,error) {
    const messageElement = document.createElement("p");
    messageElement.setAttribute("class", "message-error");
    messageElement.textContent = error;

    // Supprimer toutes les classes d'état normal
    target.classList.remove("bg-gray-50", "border-gray-300", "text-gray-900", "focus:ring-blue-500", "focus:border-blue-500");

    // Ajouter les classes d'état d'erreur
    target.classList.add("bg-red-50", "border-red-500", "text-red-900", "focus:ring-red-500", "focus:border-red-500");

    target.parentElement?.append(messageElement);
}

export function removeError(target) {
    target.nextElementSibling?.remove();

    // Supprimer les classes d'état d'erreur
    target.classList.remove("bg-red-50", "border-red-500", "text-red-900", "focus:ring-red-500", "focus:border-red-500");

    // Ajouter toutes les classes d'état normal
    target.classList.add("bg-gray-50", "border-gray-300", "text-gray-900", "focus:ring-blue-500", "focus:border-blue-500");
}

// ===========================================
//         Validation utility functions
// ===========================================

export function isEmpty(value) {
    return value === null || value === undefined || value.toString().trim() === '';
}

export function isEmail(email) {
    if (isEmpty(email)) return false;
    const emailRegex = /^[^\s@#%&?]+@[^\s@]+\.[^\s@]+$/g;
    return emailRegex.test(email);
}

export function isURL(url) {
    if (isEmpty(url)) return false;
    const urlRegex = /^(https|http):\/\/([\w-]+)\.([\w]{2,6})([\/\w\.-]*)\/?$/;
    return urlRegex.test(url);
}

export function isURLWithPrefix(url, prefix) {
    if (isEmpty(url) || isEmpty(prefix)) return false;

    const urlRegex = new RegExp(`^(https|http):\/\/(${prefix})([\\w\\.-]*)\/?$`);

    return urlRegex.test(url);
}

export function isPhone(phone) {
    if (isEmpty(phone)) return false;
    const phoneRegex = /^(\+212|0)[\s-]?(6|7)([\s-]\d{2}){4}/;
    return phoneRegex.test(phone);
}

export function isRange(value, min, max) {
    if (isEmpty(value)) return false;
    const numValue = Number(value);
    if (isNaN(numValue)) return false;
    return numValue >= min && numValue <= max;
}

export function isMin(value, min) {
    if (isEmpty(value)) return false;
    const numValue = Number(value);
    if (isNaN(numValue)) return false;
    return numValue >= min;
}

export function isMax(value, max) {
    if (isEmpty(value)) return false;
    const numValue = Number(value);
    if (isNaN(numValue)) return false;
    return numValue <= max;
}

export function isNumber(value) {
    if (isEmpty(value)) return false;
    return !isNaN(Number(value)) && !isNaN(value - 0);
}

export function isInArray(value, array) {
    if (isEmpty(value)) return false;
    return array.includes(value);
}