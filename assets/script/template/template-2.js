import {loadResume, resumeObjet} from "../helper/resume-helper.js";
import {renderPDF} from "../../lib/pdf.js";

function fillHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    const fullName = resumeObjet.personal.fullName || '';
    const lastName = resumeObjet.personal.lastName || '';
    const jobTitle = resumeObjet.professional.jobTitle || '';
    const profilePhoto = document.getElementById("profilePhoto");

    // Update name
    const nameElement = header.querySelector('.full-name');
    if (nameElement && (fullName || lastName)) {
        nameElement.textContent = `${fullName} ${lastName}`.trim().toUpperCase();
    }

    // Update job title
    const taglineElement = document.querySelector('.job-title-global');
    if (taglineElement && jobTitle) {
        taglineElement.textContent = jobTitle.toUpperCase();
    }

    // Handle photo display
    if (resumeObjet.personal.photo) {
        profilePhoto.src = resumeObjet.personal.photo;
    } else {
        // If no photo, hide the photo
        profilePhoto.parentElement.style.display = "none";
    }

    // Update contact info
    const contactInfoElement = header.querySelector('.contact-info');
    if (contactInfoElement) {
        const contactItems = [];

        if (resumeObjet.personal.email) {
            contactItems.push(`@ <a href="mailto:${resumeObjet.personal.email}" target="_blank">${resumeObjet.personal.email}</a>`);
        }

        if (resumeObjet.personal.phone) {
            contactItems.push(`📞 <a href="tel:${resumeObjet.personal.phone}" target="_blank">${resumeObjet.personal.phone}</a>`);
        }

        if (resumeObjet.personal.address) {
            contactItems.push(`📍 ${resumeObjet.personal.address}`);
        }

        if (resumeObjet.personal.portfolio) {
            contactItems.push(`🔗 <a href="${resumeObjet.personal.portfolio}">Portfolio</a>`);
        }

        if (resumeObjet.personal.linkedin) {
            contactItems.push(`💼 <a href="${resumeObjet.personal.linkedin}">LinkedIn</a>`);
        }

        if (resumeObjet.personal.github) {
            contactItems.push(`💻 <a href="${resumeObjet.personal.github}">GitHub</a>`);
        }

        if (contactItems.length > 0) {
            contactInfoElement.innerHTML = contactItems.join('<br>');
        }
    }
}

function fillSummary() {
    const summarySection = document.querySelector('.summary');
    if (!summarySection) return;

    let educationHTML = '<h2 class="main-title">Summary</h2>';

    educationHTML += `
                <div>${resumeObjet.professional.profileSummary}</div>
            `;

    summarySection.innerHTML = educationHTML;
}

function fillExperience() {
    const experienceSection = document.querySelector('.experience');
    if (!experienceSection) return;

    if (resumeObjet.experience && resumeObjet.experience.length > 0) {
        let experienceHTML = '<h2 class="main-title">Experience</h2>';

        resumeObjet.experience.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)).forEach(exp => {
            const position = exp.position || '';
            const company = exp.company || '';
            const startDate = exp.startDate ? formatDate(exp.startDate) : '';
            const endDate = exp.endDate ? formatDate(exp.endDate) : 'Present';
            const dateRange = startDate && endDate ? `${startDate} – ${endDate}` : (startDate || endDate);
            const description = exp.description || '';

            experienceHTML += `
                <div class="job">
                    <div class="job-header">
                        <div class="job-title-company">
                            <div class="job-title">${position}</div>
                            <div class="company">${company}</div>
                        </div>
                        <div class="job-date-location">
                            ${dateRange ? `📅 ${dateRange}<br>` : ''}
                        </div>
                    </div>
                    ${description ? `<div class="job-description">${description}</div>` : ''}
                </div>
            `;
        });

        experienceSection.innerHTML = experienceHTML;
    }
}

function fillEducation() {
    const educationSection = document.querySelector('.education');
    if (!educationSection) return;

    if (resumeObjet.education && resumeObjet.education.length > 0) {
        let educationHTML = '<h2 class="main-title">Education</h2>';

        resumeObjet.education.sort((a, b) => new Date(a.endYear) - new Date(b.endYear)).forEach(edu => {
            const degree = edu.degree || '';
            const institution = edu.institution || '';
            const startYear = edu.startYear || '';
            const endYear = edu.endYear || '';
            const dateRange = startYear && endYear ? `${startYear} – ${endYear}` : (startYear || endYear || '');

            educationHTML += `
                <div class="education-item">
                    <div class="degree">${degree}</div>
                    <div class="university">${institution}</div>
                    ${dateRange ? `<div class="edu-date">📅 ${dateRange}</div>` : ''}
                </div>
            `;
        });

        educationSection.innerHTML = educationHTML;
    }
}

function fillSkills() {
    const hardSection = document.querySelector('.skills-hard');
    const softSection = document.querySelector('.skills-soft');

    hardSection.innerHTML = resumeObjet.skills.hard.map(skill =>
        `<span class="strength-tag">${skill}</span>`
    ).join('');

    softSection.innerHTML = resumeObjet.skills.soft.map(skill =>
        `<span class="strength-tag">${skill}</span>`
    ).join('');
}

function fillLanguages() {
    const languagesSection = document.querySelector('.languages');
    if (!languagesSection) return;

    if (resumeObjet.languages && resumeObjet.languages.length > 0) {
        const languagesHTML = resumeObjet.languages.map(lang => {
            const name = lang.name || '';
            const level = lang.level || '';

            return `
                <div class="language-item">
                    <span>${name}</span>
                    <div class="language-dots">
                        ${level}
                    </div>
                </div>
            `;
        }).join('');

        languagesSection.innerHTML = languagesHTML;
    }
}

function fillPublications() {
    const publicationsSection = document.querySelector('.publications');
    if (!publicationsSection) return;

    if (resumeObjet.certifications && resumeObjet.certifications.length > 0) {
        let publicationsHTML = '<h2 class="main-title">Certifications</h2>';

        resumeObjet.certifications.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(cert => {
            const name = cert.name || '';
            const organization = cert.organization || '';
            const date = cert.date ? formatDate(cert.date) : '';

            publicationsHTML += `
                <div class="pub-item">
                    <strong>${name}</strong> - ${organization}${date ? ` (${date})` : ''}
                </div>
            `;
        });

        publicationsSection.innerHTML = publicationsHTML;
    }
}

function fillProjects() {
    const projectsSection = document.querySelector('.projects');
    if (resumeObjet.projects && resumeObjet.projects.length > 0) {
        let projectsHTML = '<h2 class="main-title">Projects</h2>';

        resumeObjet.projects.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(project => {
            projectsHTML += `
                <div class="job">
                    <div class="job-header">
                        <div class="job-title-company">
                            <div class="job-title">${project.name}</div>
                            <div class="company">📅 ${project.date ? `<p><strong>${formatDate(project.date)}</strong></p>` : ''}</div>
                        </div>
                        <div class="job-date-location">
                            ${project.link ? `<span class="project-link"><a href="${project.link}" target="_blank">Link to Demo</a></span>` : ''}
                        </div>
                    </div>
                    ${project.description ? `<div class="job-description">${project.description}</div>` : ''}
                </div>
            `;
        });

        projectsSection.innerHTML = projectsHTML;
    }
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('fr', {
        year: 'numeric',
        month: 'short'
    });
}

function initCV() {
    loadResume();

    fillHeader();
    fillSummary();
    fillExperience();
    fillEducation();
    fillSkills();
    fillLanguages();
    fillPublications();
    fillProjects();

    // click to dowload
    const downloadPdf = document.getElementById("downloadPdf");

    downloadPdf.addEventListener("click",  () => {
        const element = document.getElementsByClassName('container')[0];

        renderPDF(element);
    });
}

initCV();