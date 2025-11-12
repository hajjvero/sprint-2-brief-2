import {displayError, removeError, isEmpty} from "../utils/validation.js";
import {resumeObjet} from "../helper/resume-helper.js";
import {initQuillEditor} from "../../lib/quill.js";

// Variables
const experienceContainer = document.getElementById('experience-container');
const experienceFormLike = document.getElementById('experience-form-like');

const inputExperiencePosition = document.getElementById('experience-position');
const inputExperienceCompany = document.getElementById('experience-company');
const inputExperienceStartDate = document.getElementById('experience-start-date');
const inputExperienceEndDate = document.getElementById('experience-end-date');
const editExperienceDescription = initQuillEditor("#experience-description");

const buttonExperienceSave = document.getElementById("experience-save-button");
const buttonExperienceClear = document.getElementById("experience-clear-button");

export default function initExperience() {
    // save button
    buttonExperienceSave.addEventListener('click', () => {
        if (isValidateExperience()) {
            // edit
            if (experienceFormLike.hasAttribute("data-experience-id")) {
                const index = +experienceFormLike.getAttribute("data-experience-id");
                updateExperience(index);
            }
            // add
            else {
                addExperience();
            }

            clearInput();
        }
    });

    // clear button
    buttonExperienceClear.addEventListener('click', () => {
        clearErrors();
        clearInput();
    });
}

export const renderExperience = () => {
    experienceContainer.innerHTML = "";
    experienceContainer.append(...resumeObjet.experience.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)).map(showExperience));
}

const addExperience = () => {
    resumeObjet.experience.push({
        position: inputExperiencePosition.value.trim(),
        company: inputExperienceCompany.value.trim(),
        startDate: inputExperienceStartDate.value,
        endDate: inputExperienceEndDate.value || null,
        description: editExperienceDescription.getSemanticHTML()
    });
    renderExperience();
}

const editExperience = (index) => {
    experienceFormLike.setAttribute("data-experience-id", index);

    inputExperiencePosition.value = resumeObjet.experience[index].position;
    inputExperienceCompany.value = resumeObjet.experience[index].company;
    inputExperienceStartDate.value = resumeObjet.experience[index].startDate;
    inputExperienceEndDate.value = resumeObjet.experience[index].endDate;
    editExperienceDescription.clipboard.dangerouslyPasteHTML(resumeObjet.experience[index].description);

    buttonExperienceSave.firstElementChild.classList.add('hidden');
    buttonExperienceSave.lastElementChild.classList.remove('hidden');
}

const removeExperience = (index) => {
    if (confirm("Voulez-vous vraiment supprimer cette expérience ?")) {
        resumeObjet.experience.splice(index, 1);
        renderExperience();
    }
}

const updateExperience = (index) => {
    resumeObjet.experience[index] = {
        position: inputExperiencePosition.value.trim(),
        company: inputExperienceCompany.value.trim(),
        startDate: inputExperienceStartDate.value,
        endDate: inputExperienceEndDate.value || null,
        description: editExperienceDescription.getSemanticHTML()
    };
    renderExperience();
}

const showExperience = (experience, index) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors');

    // Content container
    const contentDiv = document.createElement('div');
    contentDiv.setAttribute('class', 'flex-1');

    // Title and company row
    const titleRow = document.createElement('div');
    titleRow.setAttribute('class', 'flex flex-col sm:flex-row sm:items-center gap-2 mb-1');

    const positionTitle = document.createElement('h3');
    positionTitle.setAttribute('class', 'font-semibold text-gray-900');
    positionTitle.textContent = experience.position;

    const companySpan = document.createElement('span');
    companySpan.setAttribute('class', 'text-sm text-gray-500');
    companySpan.textContent = `• ${experience.company}`;

    titleRow.append(positionTitle, companySpan);

    // Details row (dates)
    const detailsRow = document.createElement('div');
    detailsRow.setAttribute('class', 'flex flex-wrap items-center gap-2 text-sm text-gray-600');

    // Date with icon
    const dateSpan = document.createElement('span');
    dateSpan.setAttribute('class', 'flex items-center gap-1');
    const dateText = experience.endDate
        ? `${experience.startDate} - ${experience.endDate}`
        : `${experience.startDate} - Présent`;
    dateSpan.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        ${dateText}
    `;

    detailsRow.append(dateSpan);
    contentDiv.append(titleRow, detailsRow);

    // Description
    if (experience.description) {
        const descriptionP = document.createElement('p');
        descriptionP.setAttribute('class', 'mt-2 text-sm text-gray-700');
        descriptionP.innerHTML = experience.description;
        contentDiv.append(descriptionP);
    }

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
        editExperience(index);
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
        removeExperience(index);
    });

    buttonsDiv.append(buttonEdit, buttonDelete);
    li.append(contentDiv, buttonsDiv);

    return li;
}

const clearInput = () => {
    inputExperiencePosition.value = "";
    inputExperienceCompany.value = "";
    inputExperienceStartDate.value = "";
    inputExperienceEndDate.value = "";
    editExperienceDescription.setText("");
    experienceFormLike.removeAttribute("data-experience-id");
    buttonExperienceSave.firstElementChild.classList.remove('hidden');
    buttonExperienceSave.lastElementChild.classList.add('hidden');
    inputExperiencePosition.focus();
}

const isValidateExperience = () => {
    let isValid = true;
    clearErrors();

    if (isEmpty(inputExperiencePosition.value.trim())) {
        isValid = false;
        displayError(inputExperiencePosition, "Ce champ est requis.");
    }

    if (isEmpty(inputExperienceCompany.value.trim())) {
        isValid = false;
        displayError(inputExperienceCompany, "Ce champ est requis.");
    }

    if (isEmpty(inputExperienceStartDate.value)) {
        isValid = false;
        displayError(inputExperienceStartDate, "Ce champ est requis.");
    }

    return isValid;
}

const clearErrors = () => {
    removeError(inputExperiencePosition);
    removeError(inputExperienceCompany);
    removeError(inputExperienceStartDate);
    removeError(inputExperienceEndDate);
    removeError(editExperienceDescription.container);
}