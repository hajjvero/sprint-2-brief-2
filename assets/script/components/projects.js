import {displayError, removeError, isEmpty, isURL} from "../utils/validation.js";
import {resumeObjet} from "../helper/resume-helper.js";
import {initQuillEditor} from "../../lib/quill.js";

// Variables
const projectsContainer = document.getElementById('projects-container');
const projectsFormLike = document.getElementById('projects-form-like');

const inputProjectName = document.getElementById('project-name');
const inputProjectCompany = document.getElementById('project-company');
const inputProjectDate = document.getElementById('project-date');
const inputProjectLink = document.getElementById('project-link');
const editorProjectDescription = initQuillEditor("#project-description");

const buttonProjectSave = document.getElementById("project-save-button");
const buttonProjectClear = document.getElementById("project-clear-button");

export default function initProjects() {
    // save button
    buttonProjectSave.addEventListener('click', () => {
        if (isValidateProject()) {
            // edit
            if (projectsFormLike.hasAttribute("data-project-id")) {
                const index = +projectsFormLike.getAttribute("data-project-id");
                updateProject(index);
            }
            // add
            else {
                addProject();
            }

            clearInput();
        }
    });

    // clear button
    buttonProjectClear.addEventListener('click', () => {
        clearErrors();
        clearInput();
    });
}

export const renderProjects = () => {
    projectsContainer.innerHTML = "";
    projectsContainer.append(...resumeObjet.projects.sort((a, b) => new Date(b.date) - new Date(a.date)).map(showProject));
}

const addProject = () => {
    resumeObjet.projects.push({
        name: inputProjectName.value.trim(),
        company: inputProjectCompany.value.trim(),
        date: inputProjectDate.value,
        link: inputProjectLink.value.trim() || null,
        description: editorProjectDescription.getSemanticHTML() || null
    });
    renderProjects();
}

const editProject = (index) => {
    projectsFormLike.setAttribute("data-project-id", index);

    inputProjectName.value = resumeObjet.projects[index].name;
    inputProjectCompany.value = resumeObjet.projects[index].company;
    inputProjectDate.value = resumeObjet.projects[index].date;
    inputProjectLink.value = resumeObjet.projects[index].link || "";
    editorProjectDescription.clipboard.dangerouslyPasteHTML(resumeObjet.projects[index].description || "");

    buttonProjectSave.firstElementChild.classList.add('hidden');
    buttonProjectSave.lastElementChild.classList.remove('hidden');
}

const removeProject = (index) => {
    if (confirm("Voulez-vous vraiment supprimer ce projet ?")) {
        resumeObjet.projects.splice(index, 1);
        renderProjects();
    }
}

const updateProject = (index) => {
    resumeObjet.projects[index] = {
        name: inputProjectName.value.trim(),
        company: inputProjectCompany.value.trim(),
        date: inputProjectDate.value,
        link: inputProjectLink.value.trim() || null,
        description: editorProjectDescription.getSemanticHTML() || null
    };
    renderProjects();
}

const showProject = (project, index) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors');

    // Content container
    const contentDiv = document.createElement('div');
    contentDiv.setAttribute('class', 'flex-1');

    // Title and company row
    const titleRow = document.createElement('div');
    titleRow.setAttribute('class', 'flex flex-col sm:flex-row sm:items-center gap-2 mb-1');

    const nameTitle = document.createElement('h3');
    nameTitle.setAttribute('class', 'font-semibold text-gray-900');
    nameTitle.textContent = project.name;

    const companySpan = document.createElement('span');
    companySpan.setAttribute('class', 'text-sm text-gray-500');
    companySpan.textContent = `• ${project.company}`;

    titleRow.append(nameTitle, companySpan);

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
        ${project.date}
    `;

    detailsRow.append(dateSpan);
    contentDiv.append(titleRow, detailsRow);

    // Description
    if (project.description) {
        const descriptionP = document.createElement('p');
        descriptionP.setAttribute('class', 'mt-2 text-sm text-gray-700');
        descriptionP.innerHTML = project.description;
        contentDiv.append(descriptionP);
    }

    // Link
    if (project.link) {
        const linkP = document.createElement('p');
        linkP.setAttribute('class', 'mt-2 text-sm');

        const linkA = document.createElement('a');
        linkA.setAttribute('href', project.link);
        linkA.setAttribute('target', '_blank');
        linkA.setAttribute('class', 'text-blue-600 hover:text-blue-800 hover:underline');
        linkA.textContent = 'Voir le projet';

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
        editProject(index);
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
        removeProject(index);
    });

    buttonsDiv.append(buttonEdit, buttonDelete);
    li.append(contentDiv, buttonsDiv);

    return li;
}

const clearInput = () => {
    inputProjectName.value = "";
    inputProjectCompany.value = "";
    inputProjectDate.value = "";
    inputProjectLink.value = "";
    editorProjectDescription.setText("");
    projectsFormLike.removeAttribute("data-project-id");
    buttonProjectSave.firstElementChild.classList.remove('hidden');
    buttonProjectSave.lastElementChild.classList.add('hidden');
    inputProjectName.focus();
}

const isValidateProject = () => {
    let isValid = true;
    clearErrors();

    if (isEmpty(inputProjectName.value.trim())) {
        isValid = false;
        displayError(inputProjectName, "Ce champ est requis.");
    }

    if (isEmpty(inputProjectCompany.value.trim())) {
        isValid = false;
        displayError(inputProjectCompany, "Ce champ est requis.");
    }

    if (isEmpty(inputProjectDate.value)) {
        isValid = false;
        displayError(inputProjectDate, "Ce champ est requis.");
    }

    if (!isEmpty(inputProjectLink.value.trim()) && !isURL(inputProjectLink.value.trim())) {
        isValid = false;
        displayError(inputProjectLink, "Veuillez entrer une URL valide. Exemple : 'https://example.com'");
    }

    return isValid;
}

const clearErrors = () => {
    removeError(inputProjectName);
    removeError(inputProjectCompany);
    removeError(inputProjectDate);
    removeError(inputProjectLink);
    removeError(editorProjectDescription.container);
}