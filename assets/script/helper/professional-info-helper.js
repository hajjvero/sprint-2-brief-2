import {resumeObjet} from "./resume-helper.js";
import {initQuillEditor} from "../../lib/quill.js";

export const editorProfileSummary = initQuillEditor("#profileSummary", resumeObjet.professional.profileSummary);

// Inputs
export const inputJobTitle = document.getElementById('jobTitle');

// function to set professional info to resume objet
export const updateProfessionalInfoResume = () => {
    resumeObjet.professional = {
        jobTitle: inputJobTitle.value.trim(),
        profileSummary: editorProfileSummary.getSemanticHTML(),
    };
}