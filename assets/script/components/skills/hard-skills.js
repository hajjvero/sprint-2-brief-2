import {displayError, removeError ,isEmpty} from "../../utils/validation.js";
import {resumeObjet} from "../../helper/resume-helper.js";

// Variables
const hardSkillsContainer = document.getElementById('hard-skills-container');
const inputHardSkills = document.getElementById('hard-skills-input');
const buttonHardSkillsSave = document.getElementById("hard-skills-save-button");
const buttonHardSkillsClear = document.getElementById("hard-skills-clear-button");

export default function initHardSkills() {
    // save button
    buttonHardSkillsSave.addEventListener('click', () => {
        removeError(inputHardSkills);
        if (isEmpty(inputHardSkills.value.trim())) {
            displayError(inputHardSkills, "Ce champ est requis.");
            return;
        }

        // edit
        if (inputHardSkills.hasAttribute("data-skills-id")) {
            const index = +inputHardSkills.getAttribute("data-skills-id");
            resumeObjet.skills.hard[index] = inputHardSkills.value.trim();
            renderHardSkills();
        }
        // add
        else {
            addSkills(inputHardSkills.value.trim());
        }

        clearInput();
    });

    // clear button
    buttonHardSkillsClear.addEventListener('click', () => {
        removeError(inputHardSkills);

        clearInput();
    });
}

export const renderHardSkills = () => {
    hardSkillsContainer.innerHTML = "";
    hardSkillsContainer.append(...resumeObjet.skills.hard.map(showSkills));
}

const addSkills = (skills) => {
    resumeObjet.skills.hard.push(skills);

    renderHardSkills();
}

const removeSkills = (index) => {
    if (confirm("Voulez-vous vraiment supprimer cette compétence ?")) {
        resumeObjet.skills.hard.splice(index, 1);
        renderHardSkills();
    }
}

const updateSkills = (index) => {
    inputHardSkills.setAttribute("data-skills-id", index);
    inputHardSkills.value = resumeObjet.skills.hard[index];

    buttonHardSkillsSave.firstElementChild.classList.add('hidden');
    buttonHardSkillsSave.lastElementChild.classList.remove('hidden');
}

const showSkills = (skills, index) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'inline-flex items-center p-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-sm dark:bg-gray-700 dark:text-gray-300');

    const buttonDelete = document.createElement('button');
    buttonDelete.setAttribute('type', 'button');
    buttonDelete.setAttribute('aria-label', "Remove");
    buttonDelete.setAttribute('class', 'inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-xs hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300');
    buttonDelete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fill-rule="evenodd" d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z" clip-rule="evenodd"/></svg>';
    buttonDelete.addEventListener('click', () => {
        removeSkills(index);
    });

    const buttonEdit = document.createElement('button');
    buttonEdit.setAttribute('type', 'button');
    buttonEdit.setAttribute('aria-label', "Edit");
    buttonEdit.setAttribute('class', 'inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-xs hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300');
    buttonEdit.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M12.92 2.873a2.975 2.975 0 0 1 4.207 4.207l-.669.669l-4.207-4.207zM11.544 4.25l-7.999 7.999a2.44 2.44 0 0 0-.655 1.194l-.878 3.95a.5.5 0 0 0 .597.597l3.926-.873a2.5 2.5 0 0 0 1.234-.678l7.982-7.982z"/></svg>';
    buttonEdit.addEventListener('click', () => {
        updateSkills(index);
    });

    const span = document.createElement('span');
    span.textContent = skills;

    li.append(span, buttonEdit, buttonDelete);

    return li;
}

const clearInput = () => {
    inputHardSkills.value = "";
    inputHardSkills.removeAttribute("data-skills-id");
    buttonHardSkillsSave.firstElementChild.classList.remove('hidden');
    buttonHardSkillsSave.lastElementChild.classList.add('hidden');
    inputHardSkills.focus();
}