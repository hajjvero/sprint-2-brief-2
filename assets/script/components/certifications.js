import {displayError, removeError, isEmpty, isURL} from "../utils/validation.js";
import {resumeObjet} from "../helper/resume-helper.js";

// Variables
const certificationsContainer = document.getElementById('certifications-container');
const certificationsFormLike = document.getElementById('certifications-form-like');

const inputCertificationName = document.getElementById('certification-name');
const inputCertificationOrganization = document.getElementById('certification-organization');
const inputCertificationDate = document.getElementById('certification-date');
const inputCertificationLink = document.getElementById('certification-link');

const buttonCertificationSave = document.getElementById("certification-save-button");
const buttonCertificationClear = document.getElementById("certification-clear-button");

export default function initCertifications() {
    // save button
    buttonCertificationSave.addEventListener('click', () => {
        if (isValidateCertification()) {
            // edit
            if (certificationsFormLike.hasAttribute("data-certification-id")) {
                const index = +certificationsFormLike.getAttribute("data-certification-id");
                updateCertification(index);
            }
            // add
            else {
                addCertification();
            }

            clearInput();
        }
    });

    // clear button
    buttonCertificationClear.addEventListener('click', () => {
        clearErrors();
        clearInput();
    });
}

export const renderCertifications = () => {
    certificationsContainer.innerHTML = "";
    certificationsContainer.append(...resumeObjet.certifications.map(showCertification));
}

const addCertification = () => {
    resumeObjet.certifications.push({
        name: inputCertificationName.value.trim(),
        organization: inputCertificationOrganization.value.trim(),
        date: inputCertificationDate.value,
        link: inputCertificationLink.value.trim() || null
    });
    renderCertifications();
}

const editCertification = (index) => {
    certificationsFormLike.setAttribute("data-certification-id", index);

    inputCertificationName.value = resumeObjet.certifications[index].name;
    inputCertificationOrganization.value = resumeObjet.certifications[index].organization;
    inputCertificationDate.value = resumeObjet.certifications[index].date;
    inputCertificationLink.value = resumeObjet.certifications[index].link || "";

    buttonCertificationSave.firstElementChild.classList.add('hidden');
    buttonCertificationSave.lastElementChild.classList.remove('hidden');
}

const removeCertification = (index) => {
    if (confirm("Voulez-vous vraiment supprimer cette certification ?")) {
        resumeObjet.certifications.splice(index, 1);
        renderCertifications();
    }
}

const updateCertification = (index) => {
    resumeObjet.certifications[index] = {
        name: inputCertificationName.value.trim(),
        organization: inputCertificationOrganization.value.trim(),
        date: inputCertificationDate.value,
        link: inputCertificationLink.value.trim() || null
    };
    renderCertifications();
}

const showCertification = (certification, index) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors');

    // Content container
    const contentDiv = document.createElement('div');
    contentDiv.setAttribute('class', 'flex-1');

    // Title and organization row
    const titleRow = document.createElement('div');
    titleRow.setAttribute('class', 'flex flex-col sm:flex-row sm:items-center gap-2 mb-1');

    const nameTitle = document.createElement('h3');
    nameTitle.setAttribute('class', 'font-semibold text-gray-900');
    nameTitle.textContent = certification.name;

    const organizationSpan = document.createElement('span');
    organizationSpan.setAttribute('class', 'text-sm text-gray-500');
    organizationSpan.textContent = `• ${certification.organization}`;

    titleRow.append(nameTitle, organizationSpan);

    // Details row (date)
    const detailsRow = document.createElement('div');
    detailsRow.setAttribute('class', 'flex flex-wrap items-center gap-2 text-sm text-gray-600');

    // Date with icon
    const dateSpan = document.createElement('span');
    dateSpan.setAttribute('class', 'flex items-center gap-1');
    dateSpan.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        ${certification.date}
    `;

    detailsRow.append(dateSpan);
    contentDiv.append(titleRow, detailsRow);

    // Link
    if (certification.link) {
        const linkP = document.createElement('p');
        linkP.setAttribute('class', 'mt-2 text-sm');

        const linkA = document.createElement('a');
        linkA.setAttribute('href', certification.link);
        linkA.setAttribute('target', '_blank');
        linkA.setAttribute('class', 'text-blue-600 hover:text-blue-800 hover:underline');
        linkA.textContent = 'Voir la certification';

        linkP.append(linkA);
        contentDiv.append(linkP);
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
        editCertification(index);
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
        removeCertification(index);
    });

    buttonsDiv.append(buttonEdit, buttonDelete);
    li.append(contentDiv, buttonsDiv);

    return li;
}

const clearInput = () => {
    inputCertificationName.value = "";
    inputCertificationOrganization.value = "";
    inputCertificationDate.value = "";
    inputCertificationLink.value = "";
    certificationsFormLike.removeAttribute("data-certification-id");
    buttonCertificationSave.firstElementChild.classList.remove('hidden');
    buttonCertificationSave.lastElementChild.classList.add('hidden');
    inputCertificationName.focus();
}

const isValidateCertification = () => {
    let isValid = true;
    clearErrors();

    if (isEmpty(inputCertificationName.value.trim())) {
        isValid = false;
        displayError(inputCertificationName, "Ce champ est requis.");
    }

    if (isEmpty(inputCertificationOrganization.value.trim())) {
        isValid = false;
        displayError(inputCertificationOrganization, "Ce champ est requis.");
    }

    if (isEmpty(inputCertificationDate.value)) {
        isValid = false;
        displayError(inputCertificationDate, "Ce champ est requis.");
    }

    if (!isEmpty(inputCertificationLink.value.trim()) && !isURL(inputCertificationLink.value.trim())) {
        isValid = false;
        displayError(inputCertificationLink, "Veuillez entrer une URL valide. Exemple : 'https://example.com'");
    }

    return isValid;
}

const clearErrors = () => {
    removeError(inputCertificationName);
    removeError(inputCertificationOrganization);
    removeError(inputCertificationDate);
    removeError(inputCertificationLink);
}