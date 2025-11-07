import {displayError, removeError, isEmpty, isRange} from "../utils/validation.js";
import {resumeObjet} from "../helper/resume-helper.js";

// Variables
const educationContainer = document.getElementById('education-container');
const educationFormLike = document.getElementById('education-form-like');

const inputEducationInstitution = document.getElementById('education-institution');
const inputEducationDegree = document.getElementById('education-degree');
const inputEducationCity = document.getElementById('education-city');
const inputEducationStartYear = document.getElementById('education-start-year');
const inputEducationEndYear = document.getElementById('education-end-year');

const buttonEducationSave = document.getElementById("education-save-button");
const buttonEducationClear = document.getElementById("education-clear-button");

export default function initEducation() {
    // save button
    buttonEducationSave.addEventListener('click', () => {
        if (isValidateEducation()) {
            // edit
            if (educationFormLike.hasAttribute("data-education-id")) {
                const index = +educationFormLike.getAttribute("data-education-id");
                updateEducation(index);
            }
            // add
            else {
                addEducation();
            }

            clearInput();
        }
    });

    // clear button
    buttonEducationClear.addEventListener('click', () => {
        clearErrors();
        clearInput();
    });
}

export const renderEducation = () => {
    educationContainer.innerHTML = "";
    educationContainer.append(...resumeObjet.education.map(showEducation));
}

const addEducation = () => {
    resumeObjet.education.push({
        degree: inputEducationDegree.value.trim(),
        institution: inputEducationInstitution.value.trim(),
        city: inputEducationCity.value.trim(),
        startYear: inputEducationStartYear.value.trim(),
        endYear: inputEducationEndYear.value.trim() || null
    });
    renderEducation();
}

const editEducation = (index) => {
    educationFormLike.setAttribute("data-education-id", index);

    inputEducationInstitution.value = resumeObjet.education[index].institution;
    inputEducationDegree.value = resumeObjet.education[index].degree;
    inputEducationCity.value = resumeObjet.education[index].city;
    inputEducationStartYear.value = resumeObjet.education[index].startYear;
    inputEducationEndYear.value = resumeObjet.education[index].endYear;

    buttonEducationSave.firstElementChild.classList.add('hidden');
    buttonEducationSave.lastElementChild.classList.remove('hidden');
}

const removeEducation = (index) => {
    if (confirm("Voulez-vous vraiment supprimer cette formation ?")) {
        resumeObjet.education.splice(index, 1);
        renderEducation();
    }
}

const updateEducation = (index) => {
    resumeObjet.education[index] = {
        degree: inputEducationDegree.value.trim(),
        institution: inputEducationInstitution.value.trim(),
        city: inputEducationCity.value.trim(),
        startYear: inputEducationStartYear.value.trim(),
        endYear: inputEducationEndYear.value.trim() || null
    };
    renderEducation();
}

const showEducation = (education, index) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors');

    // Content container
    const contentDiv = document.createElement('div');
    contentDiv.setAttribute('class', 'flex-1');

    // Title and institution row
    const titleRow = document.createElement('div');
    titleRow.setAttribute('class', 'flex flex-col sm:flex-row sm:items-center gap-2 mb-1');

    const degreeTitle = document.createElement('h3');
    degreeTitle.setAttribute('class', 'font-semibold text-gray-900');
    degreeTitle.textContent = education.degree;

    const institutionSpan = document.createElement('span');
    institutionSpan.setAttribute('class', 'text-sm text-gray-500');
    institutionSpan.textContent = `• ${education.institution}`;

    titleRow.append(degreeTitle, institutionSpan);

    // Details row (city and dates)
    const detailsRow = document.createElement('div');
    detailsRow.setAttribute('class', 'flex flex-wrap items-center gap-2 text-sm text-gray-600');

    // City with icon
    const citySpan = document.createElement('span');
    citySpan.setAttribute('class', 'flex items-center gap-1');
    citySpan.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
        </svg>
        ${education.city || 'Non spécifié'}
    `;

    const separator = document.createElement('span');
    separator.textContent = '•';

    // Date with icon
    const dateSpan = document.createElement('span');
    dateSpan.setAttribute('class', 'flex items-center gap-1');
    const dateText = education.endYear
        ? `${education.startYear} - ${education.endYear}`
        : education.startYear;
    dateSpan.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        ${dateText}
    `;

    detailsRow.append(citySpan, separator, dateSpan);
    contentDiv.append(titleRow, detailsRow);

    // Buttons container
    const buttonsDiv = document.createElement('div');
    buttonsDiv.setAttribute('class', 'flex gap-2 self-end sm:self-center');

    // Edit button
    const buttonEdit = document.createElement('button');
    buttonEdit.setAttribute('type', 'button');
    buttonEdit.setAttribute('aria-label', 'Modifier');
    buttonEdit.setAttribute('class', 'p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors');
    buttonEdit.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
    `;
    buttonEdit.addEventListener('click', () => {
        editEducation(index);
    });

    // Delete button
    const buttonDelete = document.createElement('button');
    buttonDelete.setAttribute('type', 'button');
    buttonDelete.setAttribute('aria-label', 'Supprimer');
    buttonDelete.setAttribute('class', 'p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors');
    buttonDelete.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            <line x1="10" y1="11" x2="10" y2="17"/>
            <line x1="14" y1="11" x2="14" y2="17"/>
        </svg>
    `;
    buttonDelete.addEventListener('click', () => {
        removeEducation(index);
    });

    buttonsDiv.append(buttonEdit, buttonDelete);
    li.append(contentDiv, buttonsDiv);

    return li;
}

const clearInput = () => {
    inputEducationInstitution.value = "";
    inputEducationDegree.value = "";
    inputEducationCity.value = "";
    inputEducationStartYear.value = "";
    inputEducationEndYear.value = "";
    educationFormLike.removeAttribute("data-education-id");
    buttonEducationSave.firstElementChild.classList.remove('hidden');
    buttonEducationSave.lastElementChild.classList.add('hidden');
    inputEducationInstitution.focus();
}

const isValidateEducation = () => {
    let isValid = true;
    clearErrors();

    if (isEmpty(inputEducationInstitution.value.trim())) {
        isValid = false;
        displayError(inputEducationInstitution, "Ce champ est requis.");
    }

    if (isEmpty(inputEducationDegree.value.trim())) {
        isValid = false;
        displayError(inputEducationDegree, "Ce champ est requis.");
    }

    if (isEmpty(inputEducationCity.value.trim())) {
        isValid = false;
        displayError(inputEducationCity, "Ce champ est requis.");
    }

    if (isEmpty(inputEducationStartYear.value.trim())) {
        isValid = false;
        displayError(inputEducationStartYear, "Ce champ est requis.");
    } else if (!isRange(inputEducationStartYear.value.trim(), 1950, new Date().getFullYear())) {
        isValid = false;
        displayError(inputEducationStartYear, "L'année doit être comprise entre 1950 et l'année en cours.");
    }

    if (!isEmpty(inputEducationEndYear.value.trim()) && !isRange(inputEducationEndYear.value.trim(), 1950, new Date().getFullYear())) {
        isValid = false;
        displayError(inputEducationEndYear, "L'année doit être comprise entre 1950 et l'année en cours.");
    }
    return isValid;
}

const clearErrors = () => {
    removeError(inputEducationInstitution);
    removeError(inputEducationDegree);
    removeError(inputEducationCity);
    removeError(inputEducationStartYear);
    removeError(inputEducationEndYear);
}