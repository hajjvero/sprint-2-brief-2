import {resumeObjet} from "./resume-helper.js";

// Photo upload
export const previewPhoto = document.getElementById("preview-photo");
export const uploadPhotoContainer = document.getElementById("upload-photo-container");
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

// event to save image
inputPhoto.addEventListener('change', (e) => {
    const file = e.target.files[0]; // get first file selected
    if (file) {
        uploadPhotoContainer.classList.add("hidden");
        previewPhoto.classList.remove("hidden");

        const photoURL = URL.createObjectURL(file);
        previewPhoto.src = photoURL;

        resumeObjet.personal.phone = photoURL;
    }
});

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