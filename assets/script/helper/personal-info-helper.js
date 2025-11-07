import {resumeObjet} from "./resume-helper.js";

// Inputs
export const inputPhoto = document.getElementById('photo');
export const inputFullName = document.getElementById('fullName');
export const inputLastName = document.getElementById('lastName');
export const inputEmail = document.getElementById('email');
export const inputPhone = document.getElementById('phone');
export const inputAddress = document.getElementById('address');
export const inputNationality = document.getElementById('nationality');
export const inputStatus = document.getElementById('status');
export const inputPortfolio = document.getElementById('portfolio');
export const inputGithub = document.getElementById('github');
export const inputLinkedin = document.getElementById('linkedin');

// function to set personal info to resume objet
export const updatePersonalInfoResume = () => {
    resumeObjet.personal = {
        fullName: inputFullName.value.trim(),
        lastName: inputLastName.value.trim(),
        email: inputEmail.value.trim(),
        phone: inputPhone.value.trim(),
        address: inputAddress.value.trim(),
        nationality: inputNationality.value.trim(),
        status: inputStatus.value.trim(),
        portfolio: inputPortfolio.value.trim(),
        github: inputGithub.value.trim(),
        linkedin: inputLinkedin.value.trim(),
    };
}