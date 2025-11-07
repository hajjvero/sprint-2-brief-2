import {resumeObjet} from "./resume-helper.js";

// Inputs
export const inputJobTitle = document.getElementById('jobTitle');
export const inputProfileSummary = document.getElementById('profileSummary');

// function to set professional info to resume objet
export const updateProfessionalInfoResume = () => {
    resumeObjet.professional = {
        jobTitle: inputJobTitle.value.trim(),
        profileSummary: inputProfileSummary.value.trim()
    };
}